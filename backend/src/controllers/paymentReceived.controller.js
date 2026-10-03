const mongoose = require("mongoose");
const PaymentReceived = require("../models/paymentReceived.model");
const Customerledger = require("../models/customerLedger.model");
const CreditCustomer = require("../models/creditCustomer.model");

// =============================
// CREATE PAYMENT RECEIVED
// POST /api/payment-received
// =============================
const createPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      customerId,
      customerName,
      paymentMode,
      transactionRef,
      amount,
      date,
      linkedInvoices,
    } = req.body;

    console.log(
      req.body,
      "================createPayment=============="
    );

    // =========================
    // Normalize
    // =========================

    const invoices = Array.isArray(linkedInvoices)
      ? linkedInvoices
      : [];

    const paymentAmount = Number(amount);

    const paymentDate = date
      ? new Date(date)
      : new Date();

    // YYYY-MM-DD
    const paymentDateString = paymentDate
      .toISOString()
      .split("T")[0];

    // =========================
    // Validation
    // =========================

    if (!customerId) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer is required",
      });
    }

    if (!customerName || !customerName.trim()) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer name is required",
      });
    }

    if (!amount || paymentAmount <= 0) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Amount must be greater than 0",
      });
    }

    if (!paymentMode) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Payment mode is required",
      });
    }

    // =========================
    // Validate linked invoices
    // =========================

    for (const invoice of invoices) {
      if (!invoice.invoiceId) {
        await session.abortTransaction();
        session.endSession();

        return res.json({
          success: false,
          statusCode: 400,
          message: "Invoice ID is required",
        });
      }

      if (!invoice.invoiceNumber) {
        await session.abortTransaction();
        session.endSession();

        return res.json({
          success: false,
          statusCode: 400,
          message: "Invoice number is required",
        });
      }

      if (
        invoice.linkedAmount === undefined ||
        invoice.linkedAmount === null ||
        Number(invoice.linkedAmount) <= 0
      ) {
        await session.abortTransaction();
        session.endSession();

        return res.json({
          success: false,
          statusCode: 400,
          message: `Invalid linked amount for invoice ${invoice.invoiceNumber}`,
        });
      }
    }

    // =========================
    // Payment classification
    // =========================

    let todayPayment = 0;
    let previousPayment = 0;

    // =====================================================
    // CASE A:
    // linkedInvoices manually selected
    // =====================================================

    if (invoices.length > 0) {
      for (const invoice of invoices) {
        let invoiceDate = invoice.invoiceDate;

        // Agar frontend ne invoiceDate nahi bheji
        // to database se lekar aao
        if (!invoiceDate) {
          const creditInvoice = await CreditCustomer.findById(
            invoice.invoiceId
          ).session(session);

          if (creditInvoice) {
            invoiceDate = creditInvoice.date;
          }
        }

        const linkedAmount = Number(
          invoice.linkedAmount || 0
        );

        if (invoiceDate) {
          const invoiceDateString = new Date(invoiceDate)
            .toISOString()
            .split("T")[0];

          if (invoiceDateString === paymentDateString) {
            todayPayment += linkedAmount;
          } else if (
            invoiceDateString < paymentDateString
          ) {
            previousPayment += linkedAmount;
          }
        }
      }
    }

    // =====================================================
    // CASE B:
    // linkedInvoices empty
    // FIFO auto-distribute
    // =====================================================

    else {
      let remainingToDistribute = paymentAmount;

      const pendingInvoices = await CreditCustomer.find({
        customerId,
        paymentStatus: { $ne: "done" },
        remaingAmount: { $gt: 0 },
      })
        .sort({
          date: 1,
          createdAt: 1,
        })
        .session(session);

      for (const inv of pendingInvoices) {
        if (remainingToDistribute <= 0) {
          break;
        }

        const currentRemaining = Number(
          inv.remaingAmount || 0
        );

        const deductAmount = Math.min(
          remainingToDistribute,
          currentRemaining
        );

        const newRemaining =
          currentRemaining - deductAmount;

        // =========================
        // Payment date classification
        // =========================

        const invoiceDateString = new Date(inv.date)
          .toISOString()
          .split("T")[0];

        if (invoiceDateString === paymentDateString) {
          todayPayment += deductAmount;
        } else if (
          invoiceDateString < paymentDateString
        ) {
          previousPayment += deductAmount;
        }

        // =========================
        // Update invoice
        // =========================

        inv.remaingAmount = newRemaining;

        if (newRemaining === 0) {
          inv.paymentStatus = "done";
        } else if (
          newRemaining < Number(inv.amount || 0)
        ) {
          inv.paymentStatus = "partial";
        } else {
          inv.paymentStatus = "remaining";
        }

        await inv.save({ session });

        remainingToDistribute -= deductAmount;
      }

      // Advance payment
      if (remainingToDistribute > 0) {
        console.warn(
          `Extra amount ${remainingToDistribute} credited as advance for customer ${customerId}`
        );

        // Agar koi invoice nahi mila ya payment extra hai,
        // ise current payment maana ja sakta hai.
        todayPayment += remainingToDistribute;
      }
    }

    // =========================
    // Create Payment
    // =========================

    const payment = await PaymentReceived.create(
      [
        {
          customerName: customerName.trim(),

          customerId,

          paymentMode,

          amount: paymentAmount,

          date: paymentDate,

          todayPayment,

          previousPayment,

          linkedInvoices: invoices.map((invoice) => ({
            invoiceId: invoice.invoiceId,

            invoiceNumber: invoice.invoiceNumber,

            linkedAmount: Number(
              invoice.linkedAmount
            ),
          })),

          remark: transactionRef?.trim() || "-",
        },
      ],
      { session }
    );

    // =========================
    // Update Customer Ledger
    // =========================

    let ledger = await Customerledger.findOne({
      customerId,
    }).session(session);

    if (!ledger) {
      const credits = await CreditCustomer.find({
        customerId,
      }).session(session);

      const totalSellAmount = credits.reduce(
        (sum, c) =>
          sum + Number(c.amount || 0),
        0
      );

      ledger = await Customerledger.create(
        [
          {
            customerId,

            customerName: customerName.trim(),

            totalSellAmount,

            totalRecievedAmount: paymentAmount,

            balance:
              totalSellAmount -
              paymentAmount,

            numberOfEntries: 1,
          },
        ],
        { session }
      );

      ledger = ledger[0];
    } else {
      ledger.totalRecievedAmount =
        Number(
          ledger.totalRecievedAmount || 0
        ) + paymentAmount;

      ledger.balance =
        Number(
          ledger.totalSellAmount || 0
        ) -
        Number(
          ledger.totalRecievedAmount || 0
        );

      ledger.numberOfEntries =
        Number(
          ledger.numberOfEntries || 0
        ) + 1;

      ledger.customerName =
        customerName.trim();

      await ledger.save({ session });
    }

    // =========================
    // Update manually linked invoices
    // =========================

    if (invoices.length > 0) {
      for (const invoice of invoices) {
        const creditInvoice =
          await CreditCustomer.findById(
            invoice.invoiceId
          ).session(session);

        if (!creditInvoice) {
          console.warn(
            `Credit invoice not found: ${invoice.invoiceId}`
          );

          continue;
        }

        const linkedAmt = Number(
          invoice.linkedAmount
        );

        const currentRemaining =
          Number(
            creditInvoice.remaingAmount || 0
          );

        const newRemaining = Math.max(
          0,
          currentRemaining - linkedAmt
        );

        creditInvoice.remaingAmount =
          newRemaining;

        if (newRemaining === 0) {
          creditInvoice.paymentStatus =
            "done";
        } else if (
          newRemaining <
          Number(creditInvoice.amount || 0)
        ) {
          creditInvoice.paymentStatus =
            "partial";
        } else {
          creditInvoice.paymentStatus =
            "remaining";
        }

        await creditInvoice.save({
          session,
        });
      }
    }

    // =========================
    // Commit
    // =========================

    await session.commitTransaction();
    session.endSession();

    // =========================
    // Fetch created payment
    // =========================

    const populated =
      await PaymentReceived.findById(
        payment[0]._id
      );

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,

      statusCode: 201,

      message:
        invoices.length > 0
          ? "Payment received logged & invoices updated"
          : "Payment received logged & applied to pending invoices (FIFO)",

      data: populated,

      ledger: {
        totalSellAmount:
          ledger.totalSellAmount,

        totalRecievedAmount:
          ledger.totalRecievedAmount,

        balance:
          ledger.balance,

        numberOfEntries:
          ledger.numberOfEntries,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Create Payment Error:",
      error
    );

    if (
      error.name === "ValidationError"
    ) {
      const messages = Object.values(
        error.errors
      ).map((err) => err.message);

      return res.json({
        success: false,
        statusCode: 400,
        message: "Validation Error",
        errors: messages,
      });
    }

    return res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};



// =============================
// GET ALL PAYMENTS (with pagination & filters)
// GET /api/payment-received?page=1&limit=25&from=&to=&paymentMode=&search=
// =============================
const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, paymentMode, search } = req.query;

    let filter = {};

    // Date range
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        filter.date.$lte = toDate;
      }
    }

    // Payment mode
    if (paymentMode) {
      filter.paymentMode = paymentMode;
    }

    
    // Search
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { customerName: { $regex: searchRegex } },
        { transactionRef: { $regex: searchRegex } },
      ];
    }

    const payments = await PaymentReceived.find(filter)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await PaymentReceived.countDocuments(filter);

    // Sum of amounts
    const totalAggregation = await PaymentReceived.aggregate([
      { $match: filter },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const grandTotal = totalAggregation[0]?.sum || 0;

    res.json({
      success: true,
      statusCode: 200,
      count: payments.length,
      total,
      grandTotal,
      page,
      limit,
      pages: Math.ceil(total / limit),
      data: payments,
    });
  } catch (error) {
    console.error("Get All Payments Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET PAYMENT BY ID
// GET /api/payment-received/:id
// =============================
const getPaymentById = async (req, res) => {
  try {
    const payment = await PaymentReceived.findById(req.params.id).populate(
      "customerId",
      "companyName displayName phone email"
    );

    if (!payment) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Payment entry not found",
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: payment,
    });
  } catch (error) {
    console.error("Get Payment By ID Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid payment ID",
      });
    }

    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET PAYMENTS BY CUSTOMER
// GET /api/payment-received/customer/:customerId
// =============================
const getPaymentsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const payments = await PaymentReceived.find({ customerId })
      .populate("customerId", "companyName displayName phone email")
      .sort({ createdAt: -1 });

    const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      success: true,
      statusCode: 200,
      count: payments.length,
      totalReceived,
      data: payments,
    });
  } catch (error) {
    console.error("Get Payments By Customer Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid customer ID",
      });
    }

    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// UPDATE PAYMENT
// PUT /api/payment-received/:id
// =============================
const updatePayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      customerId,
      customerName,
      paymentMode,
      transactionRef,
      amount,
      date,
      linkedInvoices,
    } = req.body;

    // =========================
    // Find Old Payment
    // =========================

    const oldPayment = await PaymentReceived.findById(
      req.params.id
    ).session(session);

    if (!oldPayment) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 404,
        message: "Payment entry not found",
      });
    }

    // =========================
    // Validation
    // =========================

    if (
      amount !== undefined &&
      Number(amount) <= 0
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Amount must be greater than 0",
      });
    }

    if (
      customerName !== undefined &&
      !customerName.trim()
    ) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer name is required",
      });
    }

    // =========================
    // Old Values
    // =========================

    const oldCustomerId =
      oldPayment.customerId?.toString();

    const oldAmount =
      Number(oldPayment.amount || 0);

    const oldLinkedInvoices =
      Array.isArray(oldPayment.linkedInvoices)
        ? oldPayment.linkedInvoices
        : [];

    // =========================
    // New Values
    // =========================

    const newCustomerId =
      customerId !== undefined
        ? customerId.toString()
        : oldCustomerId;

    const newAmount =
      amount !== undefined
        ? Number(amount)
        : oldAmount;

    const newLinkedInvoices =
      linkedInvoices !== undefined
        ? (
            Array.isArray(linkedInvoices)
              ? linkedInvoices
              : []
          )
        : oldLinkedInvoices;

    const newCustomerName =
      customerName !== undefined
        ? customerName.trim()
        : oldPayment.customerName;

    // =========================
    // STEP 1
    // Restore Old Linked Invoices
    // =========================

    for (const invoice of oldLinkedInvoices) {
      if (!invoice.invoiceId) continue;

      const creditInvoice =
        await CreditCustomer.findById(
          invoice.invoiceId
        ).session(session);

      if (!creditInvoice) continue;

      const linkedAmount =
        Number(invoice.linkedAmount || 0);

      // Restore previous remaining amount
      const restoredAmount =
        Number(
          creditInvoice.remaingAmount || 0
        ) + linkedAmount;

      creditInvoice.remaingAmount =
        Math.min(
          restoredAmount,
          Number(creditInvoice.amount || 0)
        );

      // Restore payment status
      if (
        creditInvoice.remaingAmount ===
        Number(creditInvoice.amount || 0)
      ) {
        creditInvoice.paymentStatus =
          "remaining";
      } else if (
        creditInvoice.remaingAmount > 0
      ) {
        creditInvoice.paymentStatus =
          "partial";
      } else {
        creditInvoice.paymentStatus =
          "done";
      }

      await creditInvoice.save({
        session,
      });
    }

    // =========================
    // STEP 2
    // Remove Old Payment From Ledger
    // =========================

    const oldLedger =
      await Customerledger.findOne({
        customerId: oldCustomerId,
      }).session(session);

    if (oldLedger) {
      oldLedger.totalRecievedAmount =
        Math.max(
          0,
          Number(
            oldLedger.totalRecievedAmount || 0
          ) - oldAmount
        );

      oldLedger.balance =
        Number(
          oldLedger.totalSellAmount || 0
        ) -
        Number(
          oldLedger.totalRecievedAmount || 0
        );

      oldLedger.numberOfEntries =
        Math.max(
          0,
          Number(
            oldLedger.numberOfEntries || 0
          ) - 1
        );

      await oldLedger.save({
        session,
      });
    }

    // =========================
    // STEP 3
    // Apply New Payment To Ledger
    // =========================

    let newLedger =
      await Customerledger.findOne({
        customerId: newCustomerId,
      }).session(session);

    if (!newLedger) {
      const credits =
        await CreditCustomer.find({
          customerId: newCustomerId,
        }).session(session);

      const totalSellAmount =
        credits.reduce(
          (sum, credit) =>
            sum +
            Number(credit.amount || 0),
          0
        );

      newLedger =
        await Customerledger.create(
          [
            {
              customerId: newCustomerId,
              customerName: newCustomerName,
              totalSellAmount,
              totalRecievedAmount:
                newAmount,
              balance:
                totalSellAmount -
                newAmount,
              numberOfEntries: 1,
            },
          ],
          { session }
        );

      newLedger = newLedger[0];
    } else {
      // If customer changed, old payment was
      // already removed from old ledger.
      // If customer same, old amount was
      // also removed above.

      newLedger.totalRecievedAmount =
        Number(
          newLedger.totalRecievedAmount || 0
        ) + newAmount;

      newLedger.balance =
        Number(
          newLedger.totalSellAmount || 0
        ) -
        Number(
          newLedger.totalRecievedAmount || 0
        );

      // If same customer, old entry was removed,
      // so add it again.
      newLedger.numberOfEntries =
        Number(
          newLedger.numberOfEntries || 0
        ) + 1;

      newLedger.customerName =
        newCustomerName;

      await newLedger.save({
        session,
      });
    }

    // =========================
    // STEP 4
    // Calculate New Payment Classification
    // =========================

    let todayPayment = 0;
    let previousPayment = 0;

    const paymentDate =
      date
        ? new Date(date)
        : oldPayment.date || new Date();

    const paymentDateString =
      paymentDate
        .toISOString()
        .split("T")[0];

    // =========================
    // STEP 5
    // Apply New Linked Invoices
    // =========================

    for (const invoice of newLinkedInvoices) {
      if (!invoice.invoiceId) continue;

      const creditInvoice =
        await CreditCustomer.findById(
          invoice.invoiceId
        ).session(session);

      if (!creditInvoice) continue;

      const linkedAmount =
        Number(invoice.linkedAmount || 0);

      if (linkedAmount <= 0) continue;

      const invoiceDateString =
        new Date(creditInvoice.date)
          .toISOString()
          .split("T")[0];

      if (
        invoiceDateString ===
        paymentDateString
      ) {
        todayPayment += linkedAmount;
      } else if (
        invoiceDateString <
        paymentDateString
      ) {
        previousPayment += linkedAmount;
      }

      // Deduct from invoice
      const currentRemaining =
        Number(
          creditInvoice.remaingAmount || 0
        );

      const newRemaining =
        Math.max(
          0,
          currentRemaining -
            linkedAmount
        );

      creditInvoice.remaingAmount =
        newRemaining;

      if (newRemaining === 0) {
        creditInvoice.paymentStatus =
          "done";
      } else if (
        newRemaining <
        Number(creditInvoice.amount || 0)
      ) {
        creditInvoice.paymentStatus =
          "partial";
      } else {
        creditInvoice.paymentStatus =
          "remaining";
      }

      await creditInvoice.save({
        session,
      });
    }

    // =========================
    // STEP 6
    // Update Payment Entry
    // =========================

    const updateData = {};

    if (customerId !== undefined) {
      updateData.customerId =
        customerId;
    }

    if (customerName !== undefined) {
      updateData.customerName =
        customerName.trim();
    }

    if (paymentMode !== undefined) {
      updateData.paymentMode =
        paymentMode;
    }

    if (transactionRef !== undefined) {
      updateData.remark =
        transactionRef.trim() || "-";
    }

    if (amount !== undefined) {
      updateData.amount =
        newAmount;
    }

    if (date) {
      updateData.date =
        new Date(date);
    }

    if (linkedInvoices !== undefined) {
      updateData.linkedInvoices =
        newLinkedInvoices.map(
          (invoice) => ({
            invoiceId:
              invoice.invoiceId,
            invoiceNumber:
              invoice.invoiceNumber,
            linkedAmount:
              Number(
                invoice.linkedAmount || 0
              ),
          })
        );
    }

    updateData.todayPayment =
      todayPayment;

    updateData.previousPayment =
      previousPayment;

    const updatedPayment =
      await PaymentReceived.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
          session,
        }
      ).populate(
        "customerId",
        "companyName displayName phone email"
      );

    // =========================
    // Commit
    // =========================

    await session.commitTransaction();
    session.endSession();

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message:
        "Payment entry updated successfully",
      data: updatedPayment,
      ledger: {
        totalSellAmount:
          newLedger.totalSellAmount,
        totalRecievedAmount:
          newLedger.totalRecievedAmount,
        balance:
          newLedger.balance,
        numberOfEntries:
          newLedger.numberOfEntries,
      },
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Update Payment Error:",
      error
    );

    if (
      error.name ===
      "ValidationError"
    ) {
      const messages =
        Object.values(
          error.errors
        ).map(
          (err) => err.message
        );

      return res.json({
        success: false,
        statusCode: 400,
        message: "Validation Error",
        errors: messages,
      });
    }

    if (
      error.kind === "ObjectId"
    ) {
      return res.json({
        success: false,
        statusCode: 400,
        message:
          "Invalid payment ID",
      });
    }

    return res.json({
      success: false,
      statusCode: 500,
      message:
        "Internal server error",
      error: error.message,
    });
  }
};


// =============================
// DELETE PAYMENT
// DELETE /api/payment-received/:id
// =============================
const deletePayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // =========================
    // Find Payment
    // =========================

    const payment =
      await PaymentReceived.findById(
        req.params.id
      ).session(session);

    if (!payment) {
      await session.abortTransaction();
      session.endSession();

      return res.json({
        success: false,
        statusCode: 404,
        message:
          "Payment entry not found",
      });
    }

    const customerId =
      payment.customerId;

    const paymentAmount =
      Number(payment.amount || 0);

    // =========================
    // Restore Linked Invoices
    // =========================

    const linkedInvoices =
      Array.isArray(
        payment.linkedInvoices
      )
        ? payment.linkedInvoices
        : [];

    for (const invoice of linkedInvoices) {
      if (!invoice.invoiceId)
        continue;

      const creditInvoice =
        await CreditCustomer.findById(
          invoice.invoiceId
        ).session(session);

      if (!creditInvoice)
        continue;

      const linkedAmount =
        Number(
          invoice.linkedAmount || 0
        );

      const restoredAmount =
        Number(
          creditInvoice.remaingAmount || 0
        ) + linkedAmount;

      creditInvoice.remaingAmount =
        Math.min(
          restoredAmount,
          Number(
            creditInvoice.amount || 0
          )
        );

      // Restore payment status
      if (
        creditInvoice.remaingAmount ===
        Number(
          creditInvoice.amount || 0
        )
      ) {
        creditInvoice.paymentStatus =
          "remaining";
      } else if (
        creditInvoice.remaingAmount > 0
      ) {
        creditInvoice.paymentStatus =
          "partial";
      } else {
        creditInvoice.paymentStatus =
          "done";
      }

      await creditInvoice.save({
        session,
      });
    }

    // =========================
    // Find Customer Ledger
    // =========================

    const ledger =
      await Customerledger.findOne({
        customerId,
      }).session(session);

    // =========================
    // Reverse Payment
    // =========================

    if (ledger) {
      ledger.totalRecievedAmount =
        Math.max(
          0,
          Number(
            ledger.totalRecievedAmount || 0
          ) - paymentAmount
        );

      ledger.balance =
        Number(
          ledger.totalSellAmount || 0
        ) -
        Number(
          ledger.totalRecievedAmount || 0
        );

      ledger.numberOfEntries =
        Math.max(
          0,
          Number(
            ledger.numberOfEntries || 0
          ) - 1
        );

      await ledger.save({
        session,
      });
    }

    // =========================
    // Delete Payment
    // =========================

    await payment.deleteOne({
      session,
    });

    // =========================
    // Commit
    // =========================

    await session.commitTransaction();
    session.endSession();

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message:
        "Payment entry deleted and customer ledger updated successfully",
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Delete Payment Error:",
      error
    );

    if (
      error.kind === "ObjectId"
    ) {
      return res.json({
        success: false,
        statusCode: 400,
        message:
          "Invalid payment ID",
      });
    }

    return res.json({
      success: false,
      statusCode: 500,
      message:
        "Internal server error",
      error: error.message,
    });
  }
};


// =============================
// DELETE ALL PAYMENTS
// DELETE /api/payment-received/delete-all
// =============================
const deleteAllPayments = async (
  req,
  res
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // =========================
    // Get All Payments
    // =========================

    const payments =
      await PaymentReceived.find(
        {}
      ).session(session);

    // =========================
    // No Payments
    // =========================

    if (payments.length === 0) {
      await session.commitTransaction();
      session.endSession();

      return res.json({
        success: true,
        statusCode: 200,
        message:
          "No payment entries found",
        deletedCount: 0,
      });
    }

    // =========================
    // Customer-wise Payment Data
    // =========================

    const customerPayments = {};

    for (const payment of payments) {
      const customerId =
        payment.customerId?.toString();

      if (!customerId)
        continue;

      const amount =
        Number(
          payment.amount || 0
        );

      if (
        !customerPayments[
          customerId
        ]
      ) {
        customerPayments[
          customerId
        ] = {
          amount: 0,
          entries: 0,
        };
      }

      customerPayments[
        customerId
      ].amount += amount;

      customerPayments[
        customerId
      ].entries += 1;
    }

    // =========================
    // Restore All Linked Invoices
    // =========================

    for (const payment of payments) {
      const linkedInvoices =
        Array.isArray(
          payment.linkedInvoices
        )
          ? payment.linkedInvoices
          : [];

      for (const invoice of linkedInvoices) {
        if (!invoice.invoiceId)
          continue;

        const creditInvoice =
          await CreditCustomer.findById(
            invoice.invoiceId
          ).session(session);

        if (!creditInvoice)
          continue;

        const linkedAmount =
          Number(
            invoice.linkedAmount || 0
          );

        const restoredAmount =
          Number(
            creditInvoice.remaingAmount ||
              0
          ) + linkedAmount;

        creditInvoice.remaingAmount =
          Math.min(
            restoredAmount,
            Number(
              creditInvoice.amount || 0
            )
          );

        // Restore status
        if (
          creditInvoice.remaingAmount ===
          Number(
            creditInvoice.amount || 0
          )
        ) {
          creditInvoice.paymentStatus =
            "remaining";
        } else if (
          creditInvoice.remaingAmount >
          0
        ) {
          creditInvoice.paymentStatus =
            "partial";
        } else {
          creditInvoice.paymentStatus =
            "done";
        }

        await creditInvoice.save({
          session,
        });
      }
    }

    // =========================
    // Update Customer Ledgers
    // =========================

    for (
      const customerId of Object.keys(
        customerPayments
      )
    ) {
      const {
        amount,
        entries,
      } =
        customerPayments[
          customerId
        ];

      const ledger =
        await Customerledger.findOne({
          customerId,
        }).session(session);

      if (!ledger)
        continue;

      // Remove all received payments
      ledger.totalRecievedAmount =
        Math.max(
          0,
          Number(
            ledger.totalRecievedAmount || 0
          ) - amount
        );

      // Recalculate balance
      ledger.balance =
        Number(
          ledger.totalSellAmount || 0
        ) -
        Number(
          ledger.totalRecievedAmount || 0
        );

      // Remove payment entries
      ledger.numberOfEntries =
        Math.max(
          0,
          Number(
            ledger.numberOfEntries || 0
          ) - entries
        );

      await ledger.save({
        session,
      });
    }

    // =========================
    // Delete All Payments
    // =========================

    const result =
      await PaymentReceived.deleteMany(
        {},
        { session }
      );

    // =========================
    // Commit
    // =========================

    await session.commitTransaction();
    session.endSession();

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message:
        `${result.deletedCount} payment entries deleted successfully and customer ledgers updated`,
      deletedCount:
        result.deletedCount,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(
      "Delete All Payments Error:",
      error
    );

    return res.json({
      success: false,
      statusCode: 500,
      message:
        "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByCustomer,
  updatePayment,
  deletePayment,
  deleteAllPayments,
};
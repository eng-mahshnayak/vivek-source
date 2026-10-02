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
  try {
    const { customerId, customerName, paymentMode, transactionRef, amount, date } =
      req.body;

    let payment = await PaymentReceived.findById(req.params.id);

    if (!payment) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Payment entry not found",
      });
    }

    if (amount !== undefined && Number(amount) <= 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Amount must be greater than 0",
      });
    }

    const updateData = {};
    if (customerId) updateData.customerId = customerId;
    if (customerName !== undefined) updateData.customerName = customerName.trim();
    if (paymentMode) updateData.paymentMode = paymentMode;
    if (transactionRef !== undefined)
      updateData.transactionRef = transactionRef.trim() || "-";
    if (amount !== undefined) updateData.amount = Number(amount);
    if (date) updateData.date = new Date(date);

    payment = await PaymentReceived.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("customerId", "companyName displayName phone email");

    res.json({
      success: true,
      statusCode: 200,
      message: "Payment entry updated successfully",
      data: payment,
    });
  } catch (error) {
    console.error("Update Payment Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.json({
        success: false,
        statusCode: 400,
        message: "Validation Error",
        errors: messages,
      });
    }

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
// DELETE PAYMENT
// DELETE /api/payment-received/:id
// =============================
const deletePayment = async (req, res) => {
  try {
    const payment = await PaymentReceived.findById(req.params.id);

    if (!payment) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Payment entry not found",
      });
    }

    await payment.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: "Payment entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Payment Error:", error);

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
// DELETE ALL PAYMENTS
// DELETE /api/payment-received/delete-all
// =============================
const deleteAllPayments = async (req, res) => {
  try {
    const result = await PaymentReceived.deleteMany({});

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} payment entries deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Payments Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
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
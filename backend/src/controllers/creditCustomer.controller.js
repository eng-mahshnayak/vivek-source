const CreditCustomer = require("../models/creditCustomer.model");
const Customerledger = require("../models/customerLedger.model")
// =============================
// CREATE CREDIT ENTRY
// POST /api/credit-customer
// =============================
const createCreditEntry = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      billNo,
      amount,
      remarks,
      date,
    } = req.body;

    // =========================
    // Validation
    // =========================

    if (!customerId) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer is required",
      });
    }

    if (!customerName || !customerName.trim()) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer name is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Credit amount must be greater than 0",
      });
    }

    const creditAmount = Number(amount);

    // =========================
    // Create Credit Entry
    // =========================

    const creditEntry = await CreditCustomer.create({
      customerId,
      customerName: customerName.trim(),
      billNo: billNo?.trim() || "-",
      amount: creditAmount,
      remaingAmount: creditAmount,
      remarks: remarks?.trim() || "-",
      date: date ? new Date(date) : new Date(),
    });

    // =========================
    // Find Customer Ledger
    // =========================

    let customerLedger = await Customerledger.findOne({
      customerId,
    });

    // =========================
    // Update Existing Ledger
    // =========================

    if (customerLedger) {
      customerLedger.totalSellAmount =
        Number(customerLedger.totalSellAmount || 0) + creditAmount;

      customerLedger.balance =
        Number(customerLedger.balance || 0) + creditAmount;

      customerLedger.numberOfEntries =
        Number(customerLedger.numberOfEntries || 0) + 1;

      await customerLedger.save();
    }

    // =========================
    // Create New Ledger
    // =========================

    else {
      customerLedger = await Customerledger.create({
        customerId,
        customerName: customerName.trim(),
        totalSellAmount: creditAmount,
        totalRecievedAmount: 0,
        balance: creditAmount,
        numberOfEntries: 1,
      });
    }

    // =========================
    // Populate Credit Entry
    // =========================

    const populated = await CreditCustomer.findById(
      creditEntry._id
    ).populate(
      "customerId",
      "companyName displayName phone email"
    );

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 201,
      message: "Credit entry recorded successfully",
      data: populated,
      ledger: customerLedger,
    });

  } catch (error) {
    console.error("Create Credit Entry Error:", error);

    // Mongoose Validation Error
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err) => err.message
      );

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
// GET ALL CREDIT ENTRIES (with pagination & filters)
// GET /api/credit-customer?page=1&limit=25&from=&to=&customerId=&search=
// =============================
const getAllCreditEntries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, customerId, search } = req.query;

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

    // Filter by specific customer
    if (customerId) {
      filter.customerId = customerId;
    }

    // Search by customer name / bill no / remarks
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter.$or = [
        { customerName: { $regex: searchRegex } },
        { billNo: { $regex: searchRegex } },
        { remarks: { $regex: searchRegex } },
      ];
    }

    const creditEntries = await CreditCustomer.find(filter)
      .populate("customerId", "companyName displayName phone email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await CreditCustomer.countDocuments(filter);

    // Total credit amount (across all matching, not just page)
    const totalAggregation = await CreditCustomer.aggregate([
      { $match: filter },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const grandTotal = totalAggregation[0]?.sum || 0;

    res.json({
      success: true,
      statusCode: 200,
      count: creditEntries.length,
      total,
      grandTotal,
      page,
      limit,
      pages: Math.ceil(total / limit),
      data: creditEntries,
    });
  } catch (error) {
    console.error("Get All Credit Entries Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET CREDIT ENTRY BY ID
// GET /api/credit-customer/:id
// =============================
const getCreditEntryById = async (req, res) => {
  try {
    const creditEntry = await CreditCustomer.findById(req.params.id).populate(
      "customerId",
      "companyName displayName phone email"
    );

    if (!creditEntry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Credit entry not found",
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: creditEntry,
    });
  } catch (error) {
    console.error("Get Credit Entry By ID Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid credit entry ID",
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
// GET ALL CREDITS FOR A SPECIFIC CUSTOMER
// GET /api/credit-customer/customer/:customerId
// =============================
const getCreditsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const creditEntries = await CreditCustomer.find({ customerId })
      .populate("customerId", "companyName displayName phone email")
      .sort({ createdAt: -1 });

    const totalCredit = creditEntries.reduce((sum, e) => sum + e.amount, 0);

    res.json({
      success: true,
      statusCode: 200,
      count: creditEntries.length,
      totalCredit,
      data: creditEntries,
    });
  } catch (error) {
    console.error("Get Credits By Customer Error:", error);

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
// UPDATE CREDIT ENTRY
// PUT /api/credit-customer/:id
// =============================
const updateCreditEntry = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      billNo,
      amount,
      remarks,
      date,
    } = req.body;

    // =========================
    // Find Existing Credit Entry
    // =========================

    const oldCreditEntry = await CreditCustomer.findById(req.params.id);

    if (!oldCreditEntry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Credit entry not found",
      });
    }

    // =========================
    // Validation
    // =========================

    if (amount !== undefined && Number(amount) <= 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Credit amount must be greater than 0",
      });
    }

    if (customerId === "") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer is required",
      });
    }

    if (
      customerName !== undefined &&
      !customerName.trim()
    ) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer name is required",
      });
    }

    // =========================
    // Old & New Values
    // =========================

    const oldAmount = Number(oldCreditEntry.amount || 0);

    const newAmount =
      amount !== undefined
        ? Number(amount)
        : oldAmount;

    const oldCustomerId = oldCreditEntry.customerId?.toString();

    const newCustomerId =
      customerId !== undefined
        ? customerId.toString()
        : oldCustomerId;

    // =========================
    // CASE 1
    // Customer Same
    // =========================

    if (oldCustomerId === newCustomerId) {
      const difference = newAmount - oldAmount;

      if (difference !== 0) {
        const customerLedger =
          await Customerledger.findOne({
            customerId: newCustomerId,
          });

        if (customerLedger) {
          // Update Total Sell Amount
          customerLedger.totalSellAmount = Math.max(
            0,
            Number(customerLedger.totalSellAmount || 0) +
              difference
          );

          // Update Balance
          customerLedger.balance = Math.max(
            0,
            Number(customerLedger.balance || 0) +
              difference
          );

          await customerLedger.save();
        } else {
          // Ledger doesn't exist
          await Customerledger.create({
            customerId: newCustomerId,
            customerName:
              customerName?.trim() ||
              oldCreditEntry.customerName,
            totalSellAmount: newAmount,
            totalRecievedAmount: 0,
            balance: newAmount,
            numberOfEntries: 1,
          });
        }
      }
    }

    // =========================
    // CASE 2
    // Customer Changed
    // =========================

    else {
      // -------------------------
      // Remove Old Amount
      // -------------------------

      const oldLedger =
        await Customerledger.findOne({
          customerId: oldCustomerId,
        });

      if (oldLedger) {
        oldLedger.totalSellAmount = Math.max(
          0,
          Number(oldLedger.totalSellAmount || 0) -
            oldAmount
        );

        oldLedger.balance = Math.max(
          0,
          Number(oldLedger.balance || 0) -
            oldAmount
        );

        oldLedger.numberOfEntries = Math.max(
          0,
          Number(oldLedger.numberOfEntries || 0) - 1
        );

        await oldLedger.save();
      }

      // -------------------------
      // Add New Amount
      // -------------------------

      let newLedger =
        await Customerledger.findOne({
          customerId: newCustomerId,
        });

      if (newLedger) {
        newLedger.totalSellAmount =
          Number(newLedger.totalSellAmount || 0) +
          newAmount;

        newLedger.balance =
          Number(newLedger.balance || 0) +
          newAmount;

        newLedger.numberOfEntries =
          Number(newLedger.numberOfEntries || 0) + 1;

        await newLedger.save();
      } else {
        newLedger = await Customerledger.create({
          customerId: newCustomerId,
          customerName:
            customerName?.trim() ||
            oldCreditEntry.customerName,
          totalSellAmount: newAmount,
          totalRecievedAmount: 0,
          balance: newAmount,
          numberOfEntries: 1,
        });
      }
    }

    // =========================
    // Update Credit Entry
    // =========================

    const updateData = {};

    if (customerId !== undefined) {
      updateData.customerId = customerId;
    }

    if (customerName !== undefined) {
      updateData.customerName =
        customerName.trim();
    }

    if (billNo !== undefined) {
      updateData.billNo =
        billNo.trim() || "-";
    }

    if (amount !== undefined) {
      updateData.amount = newAmount;

      // Important:
      // Remaining amount should also change
      // according to new credit amount.
      updateData.remaingAmount = newAmount;
    }

    if (remarks !== undefined) {
      updateData.remarks =
        remarks.trim() || "-";
    }

    if (date) {
      updateData.date = new Date(date);
    }

    // =========================
    // Save Updated Credit Entry
    // =========================

    const updatedCreditEntry =
      await CreditCustomer.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "customerId",
        "companyName displayName phone email"
      );

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message: "Credit entry updated successfully",
      data: updatedCreditEntry,
    });

  } catch (error) {
    console.error(
      "Update Credit Entry Error:",
      error
    );

    if (error.name === "ValidationError") {
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

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid credit entry ID",
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
// DELETE CREDIT ENTRY
// DELETE /api/credit-customer/:id
// =============================
const deleteCreditEntry = async (req, res) => {
  try {
    // =========================
    // Find Credit Entry
    // =========================

    const creditEntry =
      await CreditCustomer.findById(
        req.params.id
      );

    if (!creditEntry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Credit entry not found",
      });
    }

    // =========================
    // Get Credit Information
    // =========================

    const customerId =
      creditEntry.customerId;

    const creditAmount =
      Number(creditEntry.amount || 0);

    // =========================
    // Find Customer Ledger
    // =========================

    const customerLedger =
      await Customerledger.findOne({
        customerId,
      });

    // =========================
    // Update Customer Ledger
    // =========================

    if (customerLedger) {
      // Remove Credit Amount
      customerLedger.totalSellAmount =
        Math.max(
          0,
          Number(
            customerLedger.totalSellAmount || 0
          ) - creditAmount
        );

      // Remove Balance
      customerLedger.balance =
        Math.max(
          0,
          Number(
            customerLedger.balance || 0
          ) - creditAmount
        );

      // Remove One Entry
      customerLedger.numberOfEntries =
        Math.max(
          0,
          Number(
            customerLedger.numberOfEntries || 0
          ) - 1
        );

      await customerLedger.save();
    }

    // =========================
    // Delete Credit Entry
    // =========================

    await creditEntry.deleteOne();

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message:
        "Credit entry deleted and customer ledger updated successfully",
    });

  } catch (error) {
    console.error(
      "Delete Credit Entry Error:",
      error
    );

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid credit entry ID",
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
// DELETE ALL CREDIT ENTRIES
// DELETE /api/credit-customer/delete-all
// =============================
const deleteAllCreditEntries = async (
  req,
  res
) => {
  try {
    // =========================
    // Get All Credit Entries
    // =========================

    const creditEntries =
      await CreditCustomer.find({});

    // =========================
    // If No Entries
    // =========================

    if (creditEntries.length === 0) {
      return res.json({
        success: true,
        statusCode: 200,
        message: "No credit entries found",
        deletedCount: 0,
      });
    }

    // =========================
    // Calculate Customer-wise Amount
    // =========================

    const customerAmounts = {};

    for (const creditEntry of creditEntries) {
      const customerId =
        creditEntry.customerId?.toString();

      if (!customerId) continue;

      const amount =
        Number(creditEntry.amount || 0);

      if (!customerAmounts[customerId]) {
        customerAmounts[customerId] = {
          amount: 0,
          entries: 0,
        };
      }

      customerAmounts[customerId].amount +=
        amount;

      customerAmounts[customerId].entries +=
        1;
    }

    // =========================
    // Update Each Customer Ledger
    // =========================

    for (const customerId of Object.keys(
      customerAmounts
    )) {
      const {
        amount,
        entries,
      } = customerAmounts[customerId];

      const customerLedger =
        await Customerledger.findOne({
          customerId,
        });

      if (customerLedger) {
        // Remove Total Sell Amount
        customerLedger.totalSellAmount =
          Math.max(
            0,
            Number(
              customerLedger.totalSellAmount || 0
            ) - amount
          );

        // Remove Balance
        customerLedger.balance =
          Math.max(
            0,
            Number(
              customerLedger.balance || 0
            ) - amount
          );

        // Remove Number Of Entries
        customerLedger.numberOfEntries =
          Math.max(
            0,
            Number(
              customerLedger.numberOfEntries || 0
            ) - entries
          );

        await customerLedger.save();
      }
    }

    // =========================
    // Delete All Credit Entries
    // =========================

    const result =
      await CreditCustomer.deleteMany({});

    // =========================
    // Response
    // =========================

    return res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} credit entries deleted successfully and customer ledgers updated`,
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error(
      "Delete All Credit Entries Error:",
      error
    );

    return res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCreditEntry,
  getAllCreditEntries,
  getCreditEntryById,
  getCreditsByCustomer,
  updateCreditEntry,
  deleteCreditEntry,
  deleteAllCreditEntries,
};
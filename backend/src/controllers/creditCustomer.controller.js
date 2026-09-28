const CreditCustomer = require("../models/creditCustomer.model");

// =============================
// CREATE CREDIT ENTRY
// POST /api/credit-customer
// =============================
const createCreditEntry = async (req, res) => {
  try {
    const { customerId, customerName, billNo, amount, remarks, date } = req.body;

    // Validation
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

    const creditEntry = await CreditCustomer.create({
      customerId,
      customerName: customerName.trim(),
      billNo: billNo?.trim() || "-",
      amount: Number(amount),
      remarks: remarks?.trim() || "-",
      date: date ? new Date(date) : new Date(),
    });

    // Populate customer on response
    const populated = await CreditCustomer.findById(creditEntry._id).populate(
      "customerId",
      "companyName displayName phone email"
    );

    res.json({
      success: true,
      statusCode: 201,
      message: "Credit entry recorded successfully",
      data: populated,
    });
  } catch (error) {
    console.error("Create Credit Entry Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.json({
        success: false,
        statusCode: 400,
        message: "Validation Error",
        errors: messages,
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
    const { customerId, customerName, billNo, amount, remarks, date } = req.body;

    let creditEntry = await CreditCustomer.findById(req.params.id);

    if (!creditEntry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Credit entry not found",
      });
    }

    // Validation on amount if provided
    if (amount !== undefined && Number(amount) <= 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Credit amount must be greater than 0",
      });
    }

    const updateData = {};
    if (customerId) updateData.customerId = customerId;
    if (customerName !== undefined) updateData.customerName = customerName.trim();
    if (billNo !== undefined) updateData.billNo = billNo.trim() || "-";
    if (amount !== undefined) updateData.amount = Number(amount);
    if (remarks !== undefined) updateData.remarks = remarks.trim() || "-";
    if (date) updateData.date = new Date(date);

    creditEntry = await CreditCustomer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("customerId", "companyName displayName phone email");

    res.json({
      success: true,
      statusCode: 200,
      message: "Credit entry updated successfully",
      data: creditEntry,
    });
  } catch (error) {
    console.error("Update Credit Entry Error:", error);

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
// DELETE CREDIT ENTRY
// DELETE /api/credit-customer/:id
// =============================
const deleteCreditEntry = async (req, res) => {
  try {
    const creditEntry = await CreditCustomer.findById(req.params.id);

    if (!creditEntry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Credit entry not found",
      });
    }

    await creditEntry.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: "Credit entry deleted successfully",
    });
  } catch (error) {
    console.error("Delete Credit Entry Error:", error);

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
// DELETE ALL CREDIT ENTRIES
// DELETE /api/credit-customer/delete-all
// =============================
const deleteAllCreditEntries = async (req, res) => {
  try {
    const result = await CreditCustomer.deleteMany({});

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} credit entries deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Credit Entries Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
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
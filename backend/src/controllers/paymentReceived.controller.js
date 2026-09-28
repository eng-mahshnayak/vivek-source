const PaymentReceived = require("../models/paymentReceived.model");

// =============================
// CREATE PAYMENT RECEIVED
// POST /api/payment-received
// =============================
const createPayment = async (req, res) => {
  try {
    const { customerId, customerName, paymentMode, transactionRef, amount, date } =
      req.body;

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
        message: "Amount must be greater than 0",
      });
    }
    if (!paymentMode) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Payment mode is required",
      });
    }

    const payment = await PaymentReceived.create({
      customerId,
      customerName: customerName.trim(),
      paymentMode,
      transactionRef: transactionRef?.trim() || "-",
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
    });

    const populated = await PaymentReceived.findById(payment._id).populate(
      "customerId",
      "companyName displayName phone email"
    );

    res.json({
      success: true,
      statusCode: 201,
      message: "Payment received logged successfully",
      data: populated,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);

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
// GET ALL PAYMENTS (with pagination & filters)
// GET /api/payment-received?page=1&limit=25&from=&to=&paymentMode=&search=
// =============================
const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, paymentMode, customerId, search } = req.query;

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

    // Specific customer
    if (customerId) {
      filter.customerId = customerId;
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
      .populate("customerId", "companyName displayName phone email")
      .skip(skip)
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
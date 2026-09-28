const Expense = require("../models/expense.model");

// =============================
// CREATE EXPENSE
// POST /api/expense
// =============================
const createExpense = async (req, res) => {
  try {
    const { category, description, paidVia, amount, date } = req.body;

    // Validation
    if (!category) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Expense category is required",
      });
    }
    if (!description || !description.trim()) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Description is required",
      });
    }
    if (!paidVia) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Payment method is required",
      });
    }
    if (!amount || Number(amount) <= 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Amount must be greater than 0",
      });
    }

    const expense = await Expense.create({
      category,
      description: description.trim(),
      paidVia,
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
    });

    res.json({
      success: true,
      statusCode: 201,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Create Expense Error:", error);

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
// GET ALL EXPENSES (with pagination & filters)
// GET /api/expense?page=1&limit=25&from=&to=&category=&search=
// =============================
const getAllExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, category, search } = req.query;

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

    // Category filter
    if (category) filter.category = category;

    // Search by description
    if (search && search.trim() !== "") {
      filter.description = { $regex: new RegExp(search.trim(), "i") };
    }

    const expenses = await Expense.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Expense.countDocuments(filter);

    // Sum of amounts
    const totalAggregation = await Expense.aggregate([
      { $match: filter },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const grandTotal = totalAggregation[0]?.sum || 0;

    res.json({
      success: true,
      statusCode: 200,
      count: expenses.length,
      total,
      grandTotal,
      page,
      limit,
      pages: Math.ceil(total / limit),
      data: expenses,
    });
  } catch (error) {
    console.error("Get All Expenses Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET EXPENSE BY ID
// GET /api/expense/:id
// =============================
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: expense,
    });
  } catch (error) {
    console.error("Get Expense By ID Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid expense ID",
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
// UPDATE EXPENSE
// PUT /api/expense/:id
// =============================
const updateExpense = async (req, res) => {
  try {
    const { category, description, paidVia, amount, date } = req.body;

    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Expense not found",
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
    if (category) updateData.category = category;
    if (description !== undefined) updateData.description = description.trim();
    if (paidVia) updateData.paidVia = paidVia;
    if (amount !== undefined) updateData.amount = Number(amount);
    if (date) updateData.date = new Date(date);

    expense = await Expense.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      statusCode: 200,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    console.error("Update Expense Error:", error);

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
        message: "Invalid expense ID",
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
// DELETE EXPENSE
// DELETE /api/expense/:id
// =============================
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid expense ID",
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
// DELETE ALL EXPENSES
// DELETE /api/expense/delete-all
// =============================
const deleteAllExpenses = async (req, res) => {
  try {
    const result = await Expense.deleteMany({});

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} expenses deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Expenses Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
};
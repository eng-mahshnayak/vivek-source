const Expense = require("../models/expense.model");
const Category = require("../models/categoryForExpense.model");

// =============================
// HELPER: ensure category exists
// =============================
const ensureCategory = async (name) => {
  if (!name || !name.trim()) return;
  const trimmed = name.trim();
  const existing = await Category.findOne({
    name: { $regex: new RegExp(`^${trimmed}$`, "i") },
  });
  if (!existing) {
    await Category.create({ name: trimmed });
  }
};

// =============================
// CATEGORY: GET ALL
// GET /api/expense/categories?search=
// =============================
const getAllCategories = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search && search.trim()) {
      filter.name = { $regex: new RegExp(search.trim(), "i") };
    }
    const categories = await Category.find(filter).sort({ name: 1 });
    res.json({
      success: true,
      statusCode: 200,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// CATEGORY: CREATE
// POST /api/expense/categories
// =============================
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Category name required",
      });
    }
    const trimmed = name.trim();
    let existing = await Category.findOne({
      name: { $regex: new RegExp(`^${trimmed}$`, "i") },
    });
    if (existing) {
      return res.json({
        success: true,
        statusCode: 200,
        message: "Category already exists",
        data: existing,
      });
    }
    const category = await Category.create({ name: trimmed });
    res.json({
      success: true,
      statusCode: 201,
      message: "Category created",
      data: category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// CREATE EXPENSE (single entry)
// =============================
const createExpense = async (req, res) => {
  try {
    const { category, description, paidVia, amount, date } = req.body;

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

    // Auto-create category if not present
    await ensureCategory(category);

    const expense = await Expense.create({
      category: category.trim(),
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
// CREATE BULK (multiple entries)
// POST /api/expense/bulk
// body: { items: [{ category, description, paidVia, amount, date }] }
// =============================
const createBulkExpenses = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Items array required",
      });
    }

    const created = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      try {
        if (!it.category || !it.description || !it.paidVia || !it.amount) {
          throw new Error("Missing required fields");
        }
        await ensureCategory(it.category);
        const doc = await Expense.create({
          category: it.category.trim(),
          description: it.description.trim(),
          paidVia: it.paidVia,
          amount: Number(it.amount),
          date: it.date ? new Date(it.date) : new Date(),
        });
        created.push(doc);
      } catch (err) {
        errors.push({ index: i, message: err.message });
      }
    }

    res.json({
      success: true,
      statusCode: 201,
      message: `${created.length} entries added`,
      createdCount: created.length,
      errorCount: errors.length,
      errors,
      data: created,
    });
  } catch (error) {
    console.error("Bulk Create Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET ALL EXPENSES
// GET /api/expense?page=1&limit=25&from=&to=&category=&search=&paidVia=
// =============================
const getAllExpenses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, category, search, paidVia } = req.query;

    let filter = {};

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        filter.date.$lte = toDate;
      }
    }

    if (category && category.trim()) filter.category = category.trim();
    if (paidVia && paidVia.trim()) filter.paidVia = paidVia.trim();

    if (search && search.trim() !== "") {
      filter.description = { $regex: new RegExp(search.trim(), "i") };
    }

    const expenses = await Expense.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Expense.countDocuments(filter);

    const totalAggregation = await Expense.aggregate([
      { $match: filter },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const grandTotal = totalAggregation[0]?.sum || 0;

    // Category breakdown (based on current filter)
    const categoryBreakdown = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // PaidVia breakdown
    const paidViaBreakdown = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$paidVia",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json({
      success: true,
      statusCode: 200,
      count: expenses.length,
      total,
      grandTotal,
      categoryBreakdown,
      paidViaBreakdown,
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
// GET ONE
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
    res.json({ success: true, statusCode: 200, data: expense });
  } catch (error) {
    console.error("Get Expense Error:", error);
    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid ID",
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
// UPDATE
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
    if (category) {
      updateData.category = category.trim();
      await ensureCategory(category);
    }
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
      message: "Expense updated",
      data: expense,
    });
  } catch (error) {
    console.error("Update Error:", error);
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
// DELETE ONE
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
      message: "Expense deleted",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid ID",
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
// DELETE ALL
// =============================
const deleteAllExpenses = async (req, res) => {
  try {
    const result = await Expense.deleteMany({});
    res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} expenses deleted`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createExpense,
  createBulkExpenses,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
  getAllCategories,
  createCategory,
};
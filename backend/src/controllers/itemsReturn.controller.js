const ReturnItems = require("../models/itemsReturn.model");

// =============================
// CREATE RETURN ITEMS
// POST /api/return-items
// =============================
const createReturnItems = async (req, res) => {
  try {
    const { items, date } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required",
      });
    }

    // Validate date
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    // Validate each item
    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({
          success: false,
          message: "Each item must have productId",
        });
      }
      if (!item.itemName) {
        return res.status(400).json({
          success: false,
          message: "Each item must have itemName",
        });
      }
      if (Number(item.quantity) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Each item quantity must be greater than 0",
        });
      }
      if (Number(item.rate) < 0) {
        return res.status(400).json({
          success: false,
          message: "Rate cannot be negative",
        });
      }
    }

    // Calculate total return value
    const totalValue = items.reduce((total, item) => {
      return total + Number(item.rate || 0) * Number(item.quantity || 0);
    }, 0);

    // Create return items
    const returnItems = await ReturnItems.create({
      items,
      totalValue,
      date,
    });

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Return items created successfully",
      data: returnItems,
    });
  } catch (error) {
    console.error("Create Return Items Error:", error);
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create return items",
      error: error.message,
    });
  }
};

// =============================
// GET ALL RETURN ITEMS (with pagination & filters)
// GET /api/return-items?page=1&limit=25&from=2026-01-01&to=2026-12-31
// =============================
const getAllReturnItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * limit;

    const { from, to, search } = req.query;

    let filter = {};

    // Date range filter
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        filter.date.$lte = toDate;
      }
    }

    // Search by item name inside items array
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      filter["items.itemName"] = { $regex: searchRegex };
    }

    const returnItems = await ReturnItems.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ReturnItems.countDocuments(filter);

    res.json({
      success: true,
      statusCode: 200,
      count: returnItems.length,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      data: returnItems,
    });
  } catch (error) {
    console.error("Get All Return Items Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET RETURN ITEMS BY ID
// GET /api/return-items/:id
// =============================
const getReturnItemsById = async (req, res) => {
  try {
    const returnItems = await ReturnItems.findById(req.params.id);

    if (!returnItems) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Return items record not found",
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: returnItems,
    });
  } catch (error) {
    console.error("Get Return Items By ID Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid return items ID",
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
// UPDATE RETURN ITEMS
// PUT /api/return-items/:id
// =============================
const updateReturnItems = async (req, res) => {
  try {
    const { items, date } = req.body;

    // Find existing
    let returnItems = await ReturnItems.findById(req.params.id);

    if (!returnItems) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Return items record not found",
      });
    }

    // Validate items if provided
    if (items) {
      if (!Array.isArray(items) || items.length === 0) {
        return res.json({
          success: false,
          statusCode: 400,
          message: "Items must be a non-empty array",
        });
      }

      for (const item of items) {
        if (!item.productId || !item.itemName) {
          return res.json({
            success: false,
            statusCode: 400,
            message: "Each item must have productId and itemName",
          });
        }
        if (Number(item.quantity) <= 0) {
          return res.json({
            success: false,
            statusCode: 400,
            message: "Each item quantity must be greater than 0",
          });
        }
      }
    }

    // Recalculate totalValue if items are provided
    const updateData = {};
    if (items) {
      updateData.items = items;
      updateData.totalValue = items.reduce((total, item) => {
        return total + Number(item.rate || 0) * Number(item.quantity || 0);
      }, 0);
    }
    if (date) {
      updateData.date = date;
    }

    returnItems = await ReturnItems.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      statusCode: 200,
      message: "Return items updated successfully",
      data: returnItems,
    });
  } catch (error) {
    console.error("Update Return Items Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid return items ID",
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
// DELETE RETURN ITEMS
// DELETE /api/return-items/:id
// =============================
const deleteReturnItems = async (req, res) => {
  try {
    const returnItems = await ReturnItems.findById(req.params.id);

    if (!returnItems) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Return items record not found",
      });
    }

    await returnItems.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: "Return items deleted successfully",
    });
  } catch (error) {
    console.error("Delete Return Items Error:", error);

    if (error.kind === "ObjectId") {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid return items ID",
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
// DELETE ALL RETURN ITEMS
// DELETE /api/return-items/delete-all
// =============================
const deleteAllReturnItems = async (req, res) => {
  try {
    const result = await ReturnItems.deleteMany({});

    res.json({
      success: true,
      statusCode: 200,
      message: `${result.deletedCount} return items deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete All Return Items Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createReturnItems,
  getAllReturnItems,
  getReturnItemsById,
  updateReturnItems,
  deleteReturnItems,
  deleteAllReturnItems,
};
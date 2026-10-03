const Product = require('../models/product.model.js');
const Vehicle = require('../models/vehicle.model.js');

// =============================
// CREATE VEHICLE
// =============================
const createVehicle = async (req, res) => {
  try {
    const { items, date, route } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const totalValue = items.reduce((total, item) => {
      return total + Number(item.rate) * Number(item.quantity);
    }, 0);

    const vehicle = await Vehicle.create({
      items,
      totalValue,
      route: route ? route.trim() : "",
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Create Vehicle Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
      error: error.message,
    });
  }
};

// =============================
// GET ALL SALES (with pagination + date + route filter)
// =============================
const getAllSales = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    // ✅ Date range
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to) {
        const toDate = new Date(req.query.to);
        toDate.setDate(toDate.getDate() + 1);
        filter.date.$lt = toDate;
      }
    }

    // ✅ Route filter (case-insensitive exact match)
    if (req.query.route && req.query.route.trim()) {
      filter.route = {
        $regex: new RegExp(`^${req.query.route.trim()}$`, "i"),
      };
    }

    const sales = await Vehicle.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Vehicle.countDocuments(filter);

    // ✅ Grand total (filtered)
    const totalAgg = await Vehicle.aggregate([
      { $match: filter },
      { $group: { _id: null, sum: { $sum: "$totalValue" } } },
    ]);
    const grandTotal = totalAgg[0]?.sum || 0;

    res.json({
      success: true,
      statusCode: 200,
      count: sales.length,
      total,
      grandTotal,
      page,
      pages: Math.ceil(total / limit),
      data: sales,
    });
  } catch (error) {
    console.error('Get All Sales Error:', error);
    res.json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

// =============================
// GET SALE BY ID
// =============================
const getSaleById = async (req, res) => {
  try {
    const sale = await Vehicle.findById(req.params.id);

    if (!sale) {
      return res.json({
        success: false,
        statusCode: 404,
        message: 'Sale not found',
      });
    }

    res.json({
      success: true,
      statusCode: 200,
      data: sale,
    });
  } catch (error) {
    console.error('Get Sale By ID Error:', error);
    if (error.kind === 'ObjectId') {
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
      });
    }
    res.json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

// =============================
// UPDATE VEHICLE
// =============================
const updateSale = async (req, res) => {
  try {
    const { items, totalValue, date, route } = req.body;

    let vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Vehicle not found",
      });
    }

    let finalItems = vehicle.items;

    if (items && Array.isArray(items)) {
      finalItems = [];

      for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
          return res.json({
            success: false,
            statusCode: 404,
            message: `Product not found: ${item.itemName}`,
          });
        }

        const qty = Number(item.quantity);
        const rate = Number(item.rate);
        const mrp = Number(item.mrp);

        if (!qty || qty < 1) {
          return res.json({
            success: false,
            statusCode: 400,
            message: `Invalid quantity for ${item.itemName}`,
          });
        }

        if (rate < 0) {
          return res.json({
            success: false,
            statusCode: 400,
            message: `Invalid rate for ${item.itemName}`,
          });
        }

        finalItems.push({
          productId: product._id,
          itemName: product.itemName,
          mrp: product.mrp,
          rate,
          quantity: qty,
        });
      }
    }

    const calculatedTotalValue = finalItems.reduce((total, item) => {
      return total + Number(item.rate) * Number(item.quantity);
    }, 0);

    vehicle.items = finalItems;
    vehicle.totalValue = calculatedTotalValue;

    if (date) vehicle.date = date;

    // ✅ Update route
    if (route !== undefined) vehicle.route = route.trim();

    await vehicle.save();

    res.json({
      success: true,
      statusCode: 200,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    console.error("Update Vehicle Error:", error);

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
      error: error.message,
    });
  }
};

// =============================
// DELETE SALE
// =============================
const deleteSale = async (req, res) => {
  try {
    const sale = await Vehicle.findById(req.params.id);

    if (!sale) {
      return res.json({
        success: false,
        statusCode: 404,
        message: 'Sale not found',
      });
    }

    await sale.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Sale deleted successfully',
    });
  } catch (error) {
    console.error('Delete Sale Error:', error);
    if (error.kind === 'ObjectId') {
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
      });
    }
    res.json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

// =============================
// DELETE ALL SALES
// =============================
const deleteAllSales = async (req, res) => {
  try {
    const result = await Vehicle.deleteMany({});
    res.json({
      success: true,
      statusCode: 200,
      message: 'All sales deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Delete All Sales Error:', error);
    res.json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createVehicle,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  deleteAllSales,
};
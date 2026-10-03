const RouteDirectionSale = require("../models/RouteDirectionSale");

// =========================================================
// CREATE
// =========================================================
exports.createRouteDirectionSale = async (req, res) => {
  try {
    const { date, route, remark } = req.body;

    if (!route || !route.trim()) {
      return res.status(400).json({
        success: false,
        message: "Route is required",
      });
    }
    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const record = await RouteDirectionSale.create({
      date: new Date(date),
      route: route.trim(),
      remark: remark?.trim() || "-",
    });

    return res.status(201).json({
      success: true,
      message: "Route entry created successfully",
      data: record,
    });
  } catch (error) {
    console.error("createRouteDirectionSale error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create entry",
    });
  }
};

// =========================================================
// LIST (with pagination + date filter)
// =========================================================
exports.getRouteDirectionSales = async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const from = req.query.from; // YYYY-MM-DD
    const to = req.query.to; // YYYY-MM-DD



    if (from || to) {
      query.date = {};
      if (from) {
        const f = new Date(from);
        f.setHours(0, 0, 0, 0);
        query.date.$gte = f;
      }
      if (to) {
        const t = new Date(to);
        t.setHours(23, 59, 59, 999);
        query.date.$lte = t;
      }
    }

    const [data, totalCount] = await Promise.all([
      RouteDirectionSale.find()
        .sort({ date: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      RouteDirectionSale.countDocuments(),
    ]);

    const pages = Math.max(1, Math.ceil(totalCount / limit));

    return res.status(200).json({
      success: true,
      data,
      totalCount,
      pages,
      page,
      limit,
    });
  } catch (error) {
    console.error("getRouteDirectionSales error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load entries",
    });
  }
};

// =========================================================
// GET ONE
// =========================================================
exports.getRouteDirectionSaleById = async (req, res) => {
  try {
    const record = await RouteDirectionSale.findOne({
      _id: req.params.id,
    
    }).lean();

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("getRouteDirectionSaleById error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load entry",
    });
  }
};

// =========================================================
// UPDATE
// =========================================================
exports.updateRouteDirectionSale = async (req, res) => {
  try {
    const { date, route, remark } = req.body;

    const record = await RouteDirectionSale.findOne({
      _id: req.params.id,
    
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    if (date) record.date = new Date(date);
    if (route !== undefined) record.route = route.trim();
    if (remark !== undefined) record.remark = remark.trim() || "-";

    await record.save();

    return res.status(200).json({
      success: true,
      message: "Route entry updated successfully",
      data: record,
    });
  } catch (error) {
    console.error("updateRouteDirectionSale error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update entry",
    });
  }
};

// =========================================================
// DELETE ONE
// =========================================================
exports.deleteRouteDirectionSale = async (req, res) => {
  try {
    const deleted = await RouteDirectionSale.findOneAndDelete({
      _id: req.params.id,
     
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    console.error("deleteRouteDirectionSale error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete entry",
    });
  }
};

// =========================================================
// DELETE ALL (of logged-in user)
// =========================================================
exports.deleteAllRouteDirectionSales = async (req, res) => {
  try {
    const result = await RouteDirectionSale.deleteMany({
     
    });

    return res.status(200).json({
      success: true,
      message: `All entries deleted (${result.deletedCount})`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("deleteAllRouteDirectionSales error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete all entries",
    });
  }
};
const DailyCash = require('../models/dailyCash.model.js');

// Helper: compute cash total from denominations
const computeCashTotal = (openingCash = {}) => {
  return (
    (openingCash.note500 || 0) * 500 +
    (openingCash.note200 || 0) * 200 +
    (openingCash.note100 || 0) * 100 +
    (openingCash.note50 || 0) * 50 +
    (openingCash.note20 || 0) * 20 +
    (openingCash.note10 || 0) * 10 +
    (openingCash.coins || 0) * 1
  );
};

// Helper: sum online payments array
const computeOnlineTotal = (onlinePayments = []) => {
  if (!Array.isArray(onlinePayments)) return 0;
  return onlinePayments.reduce((s, p) => s + (Number(p?.amount) || 0), 0);
};

// =============================
// CREATE
// =============================
const createDailyCash = async (req, res) => {
  try {
    const data = req.body;

    const openingCash = data.formData || {};
    const onlinePayments = Array.isArray(data.onlinePayments)
      ? data.onlinePayments
      : [];

    const cashTotal = computeCashTotal(openingCash);
    const onlineTotal = computeOnlineTotal(onlinePayments);

    const entry = await DailyCash.create({
      date: data.date,
      openingCash,
      onlinePayments,
      totalOnline: onlineTotal,
      totalSales: cashTotal + onlineTotal,
      online: onlineTotal, // backward compat
    });

    res.json({
      success: true,
      statusCode: 201,
      message: 'Daily cash entry created successfully',
      data: entry,
    });
  } catch (error) {
    console.error('Create Daily Cash Error:', error);

    if (error.code === 11000) {
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Daily cash entry for this date already exists',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Validation Error',
        errors: messages,
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
// GET ALL (with date filter + pagination)
// =============================
const getAllDailyCash = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const filter = {};

    // Single date
    if (req.query.date) {
      const selected = new Date(req.query.date);
      const next = new Date(selected);
      next.setDate(next.getDate() + 1);
      filter.date = { $gte: selected, $lt: next };
    }

    // Date range (from / to)
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) {
        const from = new Date(req.query.from);
        from.setHours(0, 0, 0, 0);
        filter.date.$gte = from;
      }
      if (req.query.to) {
        const to = new Date(req.query.to);
        to.setHours(23, 59, 59, 999);
        filter.date.$lte = to;
      }
    }

    const entries = await DailyCash.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await DailyCash.countDocuments(filter);

    // Aggregated totals for current filter
    const allFiltered = await DailyCash.find(filter);
    const totals = allFiltered.reduce(
      (acc, e) => {
        const cash =
          (e.openingCash?.note500 || 0) * 500 +
          (e.openingCash?.note200 || 0) * 200 +
          (e.openingCash?.note100 || 0) * 100 +
          (e.openingCash?.note50 || 0) * 50 +
          (e.openingCash?.note20 || 0) * 20 +
          (e.openingCash?.note10 || 0) * 10 +
          (e.openingCash?.coins || 0) * 1;

        acc.totalCash += cash;
        acc.totalOnline += e.totalOnline || e.online || 0;
        acc.grandTotal += e.totalSales || 0;
        acc.totalEntries += 1;
        return acc;
      },
      { totalCash: 0, totalOnline: 0, grandTotal: 0, totalEntries: 0 }
    );

    res.json({
      success: true,
      statusCode: 200,
      count: total,
      totalCount: total,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      totals,
      data: entries,
    });
  } catch (error) {
    console.error('Get All Daily Cash Error:', error);
    res.json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
    });
  }
};

// =============================
// GET BY ID
// =============================
const getDailyCashById = async (req, res) => {
  try {
    const entry = await DailyCash.findById(req.params.id);
    if (!entry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: 'Daily cash entry not found',
      });
    }
    res.json({ success: true, statusCode: 200, data: entry });
  } catch (error) {
    console.error('Get Daily Cash By ID Error:', error);
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
// UPDATE
// =============================
const updateDailyCash = async (req, res) => {
  try {
    let entry = await DailyCash.findById(req.params.id);
    if (!entry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: 'Daily cash entry not found',
      });
    }

    const payload = { ...req.body };

    // Recompute totals if relevant fields supplied
    if (payload.formData) {
      const cashTotal = computeCashTotal(payload.formData);
      const onlineTotal =
        payload.onlinePayments !== undefined
          ? computeOnlineTotal(payload.onlinePayments)
          : entry.totalOnline || 0;

      payload.openingCash = payload.formData;
      payload.totalOnline = onlineTotal;
      payload.totalSales = cashTotal + onlineTotal;
      payload.online = onlineTotal;
      delete payload.formData;
    } else if (payload.onlinePayments) {
      const onlineTotal = computeOnlineTotal(payload.onlinePayments);
      const cashTotal = computeCashTotal(entry.openingCash);
      payload.totalOnline = onlineTotal;
      payload.totalSales = cashTotal + onlineTotal;
      payload.online = onlineTotal;
    }

    entry = await DailyCash.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Daily cash entry updated successfully',
      data: entry,
    });
  } catch (error) {
    console.error('Update Daily Cash Error:', error);

    if (error.code === 11000) {
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Duplicate date entry not allowed',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.json({
        success: false,
        statusCode: 400,
        message: 'Validation Error',
        errors: messages,
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
// DELETE
// =============================
const deleteDailyCash = async (req, res) => {
  try {
    const entry = await DailyCash.findById(req.params.id);
    if (!entry) {
      return res.json({
        success: false,
        statusCode: 404,
        message: 'Daily cash entry not found',
      });
    }

    await entry.deleteOne();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Daily cash entry deleted successfully',
    });
  } catch (error) {
    console.error('Delete Daily Cash Error:', error);
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

module.exports = {
  createDailyCash,
  getAllDailyCash,
  getDailyCashById,
  updateDailyCash,
  deleteDailyCash,
};
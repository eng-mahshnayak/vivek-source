const mongoose = require("mongoose");
const Customerledger = require("../models/customerLedger.model");
const Vehicle = require("../models/vehicle.model");
const PaymentReceived = require("../models/paymentReceived.model");
const CreditCustomer = require('../models/creditCustomer.model')
const ReturnItems = require("../models/itemsReturn.model");
const Party = require("../models/parties.mode.js");



// =============================
// GET LEDGER SUMMARY (list — with pagination, search, filter)
// =============================
const getCustomerLedgerSummary = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search, customerId } = req.query;

    // Build filter
    const filter = {};
    if (customerId && customerId !== "all") {
      filter.customerId = customerId;
    }
    if (search && search.trim()) {
      filter.customerName = { $regex: search.trim(), $options: "i" };
    }

    // Fetch with populate
    const customersledger = await Customerledger.find(filter)
      .populate("customerId", "companyName displayName phone")
      .skip(skip)
      .limit(limit)
      .sort({ balance: -1 });

    // 🔥 Total count
    const totalCount = await Customerledger.countDocuments(filter);

    // 🔥 Totals across all (not just page)
    const allLedgers = await Customerledger.find(filter);
    const totals = allLedgers.reduce(
      (acc, l) => {
        acc.totalSell += l.totalSellAmount || 0;
        acc.totalPaid += l.totalRecievedAmount || 0;
        acc.totalBalance += l.balance || 0;
        return acc;
      },
      { totalSell: 0, totalPaid: 0, totalBalance: 0 }
    );

    res.json({
      status: true,
      statusCode: 200,
      count: customersledger.length,
      total: totalCount,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
      totals: {
        ...totals,
        totalCustomers: totalCount,
      },
      data: customersledger,
    });
  } catch (error) {
    console.error("Get All Customers Error:", error);
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

// =============================
// GET SINGLE CUSTOMER DETAILED LEDGER (with all entries)
// =============================
const getCustomerLedgerDetail = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { fromDate, toDate } = req.query;

    // ============ Validation ============
    if (!customerId) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid Customer ID",
      });
    }

    // ============ Get Customer ============
    const party = await Party.findById(customerId).lean();

    if (!party) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Customer not found",
      });
    }

    // ============ Build Date Filter ============
    const dateMatch = {};

    if (fromDate || toDate) {
      dateMatch.date = {};

      if (fromDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);
        dateMatch.date.$gte = from;
      }

      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        dateMatch.date.$lte = to;
      }
    }

    // ============ 🔥 Get ALL Entries (both types) ============
    const creditEntries = await CreditCustomer.find({
      customerId,
      ...dateMatch,
    })
      .sort({ date: 1, createdAt: 1 }) // ⬅️ Sort ASC (oldest first) for correct running balance
      .lean();

    const paymentEntries = await PaymentReceived.find({
      customerId,
      ...dateMatch,
    })
      .sort({ date: 1, createdAt: 1 })
      .lean();

    // ============ Map Entries ============
    const mappedCredits = creditEntries.map((credit) => ({
      _id: credit._id,
      type: "credit",
      description: `Invoice No - ${credit.billNo || "-"}`,
      amount: Number(credit.amount || 0),
      date: credit.date,
      reference: credit.billNo || "",
    }));

    const mappedPayments = paymentEntries.map((payment) => ({
      _id: payment._id,
      type: "debit",
      description: `Payment — ${payment.paymentMode || "Cash"}`,
      amount: Number(payment.amount || 0),
      date: payment.date,
      reference: payment.remark || "",
    }));

    // ============ 🔥 Combine + Sort ASC for running balance ============
    const allEntries = [...mappedCredits, ...mappedPayments].sort((a, b) => {
      const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      // Same date — tie-break by _id (stable)
      return String(a._id).localeCompare(String(b._id));
    });

    // ============ 🔥 Compute Running Balance (ASC) ============
    let running = 0;
    let totalSell = 0;
    let totalPaid = 0;

    const entriesWithRunning = allEntries.map((e) => {
      const amt = Number(e.amount) || 0;

      if (e.type === "credit") {
        running += amt;
        totalSell += amt;
      } else {
        running -= amt;
        totalPaid += amt;
      }

      return {
        ...e,
        runningBalance: running, // ✅ Backend-computed
      };
    });

    // ============ 🔥 Final Summary (backend-computed) ============
    const balance = totalSell - totalPaid; // ✅ Backend-computed

    // ✅ Latest entries first for display
    const displayEntries = [...entriesWithRunning].reverse();

    // ============ Customer Response ============
    const customer = {
      _id: party._id,
      customerName:
        party.companyName || party.displayName || party.customerName || "",
      phone: party.phone || "",
    };

    // ============ Final Response ============
    return res.json({
      success: true,
      statusCode: 200,

      customer,

      // 🔥 Summary (backend-driven)
      summary: {
        totalSell: Number(totalSell.toFixed(2)),
        totalPaid: Number(totalPaid.toFixed(2)),
        balance: Number(balance.toFixed(2)),
        closingBalance: Number(running.toFixed(2)), // ✅ Same as balance
        totalEntries: displayEntries.length,
      },

      // 🔥 Entries with runningBalance
      data: displayEntries,

      count: displayEntries.length,
    });
  } catch (error) {
    console.error("Get Customer Ledger Detail Error:", error);

    return res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// =============================
// 1️⃣ GET CUSTOMER BALANCE (for TOTAL PAYMENT box)
// =============================
const getCustomerBalance = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid Customer ID",
      });
    }

    // Customer info
    const party = await Party.findById(customerId).lean();
    if (!party) {
      return res.json({
        success: false,
        statusCode: 404,
        message: "Customer not found",
      });
    }

    // Ledger summary
    const ledger = await Customerledger.findOne({ customerId }).lean();

    const totalSellAmount = ledger?.totalSellAmount || 0;
    const totalRecievedAmount = ledger?.totalRecievedAmount || 0;
    const balance = ledger?.balance ?? totalSellAmount - totalRecievedAmount;
    const numberOfEntries = ledger?.numberOfEntries || 0;

    return res.json({
      success: true,
      statusCode: 200,
      data: {
        customerId: party._id,
        customerName: party.companyName || party.displayName || "-",
        phone: party.phone || "",
        totalSellAmount: Number(totalSellAmount.toFixed(2)),
        totalRecievedAmount: Number(totalRecievedAmount.toFixed(2)),
        balance: Number(balance.toFixed(2)), // 🔥 Ye TOTAL PAYMENT me dikhega
        numberOfEntries,
      },
    });
  } catch (error) {
    console.error("Get Customer Balance Error:", error);
    return res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// =============================
// 2️⃣ GET PENDING INVOICES (for Link modal)
// =============================
const getPendingInvoices = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Customer ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.json({
        success: false,
        statusCode: 400,
        message: "Invalid Customer ID",
      });
    }

    // 🔥 Sirf wo entries jo "done" nahi hain aur jinka remaingAmount > 0 hai
    const invoices = await CreditCustomer.find({
      customerId,
      paymentStatus: { $ne: "done" },
      remaingAmount: { $gt: 0 },
    })
      .sort({ date: -1 })
      .lean();

    // Map to frontend-friendly format
    const mapped = invoices.map((inv) => {
      const remaining = Number(inv.remaingAmount) || 0;
      return {
        _id: inv._id,
        invoiceNumber: inv.billNo || "-",
        date: inv.date,
        totalAmount: Number(inv.amount) || 0,
        currentBalance: remaining, // 🔥 jitna baaki hai
        type: "Sale",
        paymentStatus: inv.paymentStatus,
        remarks: inv.remarks || "",
      };
    });

    return res.json({
      success: true,
      statusCode: 200,
      count: mapped.length,
      data: mapped,
    });
  } catch (error) {
    console.error("Get Pending Invoices Error:", error);
    return res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};






module.exports = {
  getCustomerLedgerSummary,
  getCustomerLedgerDetail,
  getCustomerBalance,
  getPendingInvoices
};
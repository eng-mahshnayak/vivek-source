const Vehicle = require('../models/vehicle.model.js');
const ReturnItems = require("../models/itemsReturn.model");
const DailyCash = require('../models/dailyCash.model.js');
const PaymentReceived = require("../models/paymentReceived.model");
const Expense = require("../models/expense.model");
const CreditCustomer = require("../models/creditCustomer.model");

// =============================
// GET TODAY'S CALCULATION
// =============================
const getTodayeData = async (req, res) => {
  try {
    // Today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // 🔥 1. LOAD ITEM (Vehicle)
    const entries = await Vehicle.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalValueSum = entries.reduce(
      (sum, entry) => sum + (entry.totalValue || 0),
      0
    );

    // 🔥 2. RETURN ITEMS
    const returnitem = await ReturnItems.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalReturnValueSum = returnitem.reduce(
      (sum, entry) => sum + (entry.totalValue || 0),
      0
    );


    // 🔥 3. NOTE SUMMARY (Daily Cash)
    const notesummery = await DailyCash.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalCash = notesummery.reduce(
      (sum, entry) => sum + (entry.totalSales || 0),
      0
    );

    // 🔥 4. EXPENSES
    const expenseData = await Expense.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalExpense = expenseData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    // 🔥 5. PAYMENT RECEIVED
    const PaymentReceivedData = await PaymentReceived.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalpreviousPaymentData = PaymentReceivedData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );


     const creditCustomerData = await CreditCustomer.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    const totalCreditValueSum = creditCustomerData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    

    // 🔥 CALCULATIONS
    const todaySell = totalValueSum - totalReturnValueSum;
    const salePayment = totalCash - totalpreviousPaymentData;
    const grandTotal = salePayment + totalExpense;
    const difference = grandTotal - todaySell;

    // 🔥 RESPONSE
    res.json({
      success: true,
      statusCode: 200,
      message: "Today's calculation fetched successfully",
      data: {
        loadItem: totalValueSum,
        returnItem: totalReturnValueSum,
        noteSummary: totalCash,
        paymentReceived: totalpreviousPaymentData,
        expenses: totalExpense,
        creditCustomer:totalCreditValueSum,
        todaySale: todaySell,
        salePayment: salePayment,
        grandTotal: grandTotal,
        difference: difference,
        date: new Date().toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Get Today Vehicle Data Error:", error);

    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};



// =============================
// ✅ NEW: VIEW SETTLEMENT (with date range)
// =============================
const viewSettlement = async (req, res) => {
  try {
    // 🔥 Query params: from (YYYY-MM-DD), to (YYYY-MM-DD)
    // Agar dono nahi diye, aaj ka din lo
    const { from, to } = req.query;

    let startOfDay;
    let endOfDay;

    if (from || to) {
      // Agar sirf `from` diya hai to single date
      // Agar dono diye hain to range
      const fromDate = from ? new Date(from) : new Date(to);
      const toDate = to ? new Date(to) : new Date(from);

      startOfDay = new Date(fromDate);
      startOfDay.setHours(0, 0, 0, 0);

      endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);
    } else {
      // Default: today
      startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
    }

    const dateFilter = { date: { $gte: startOfDay, $lte: endOfDay } };

    // 🔥 1. LOAD ITEM (Vehicle)
    const entries = await Vehicle.find(dateFilter);
    const totalValueSum = entries.reduce(
      (sum, entry) => sum + (entry.totalValue || 0),
      0
    );

    // 🔥 2. RETURN ITEMS
    const returnitem = await ReturnItems.find(dateFilter);
    const totalReturnValueSum = returnitem.reduce(
      (sum, entry) => sum + (entry.totalValue || 0),
      0
    );

    // 🔥 3. NOTE SUMMARY (Daily Cash)
    const notesummery = await DailyCash.find(dateFilter);
    const totalCash = notesummery.reduce(
      (sum, entry) => sum + (entry.totalSales || 0),
      0
    );

    // 🔥 4. EXPENSES
    const expenseData = await Expense.find(dateFilter);
    const totalExpense = expenseData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    // 🔥 5. PAYMENT RECEIVED
    const PaymentReceivedData = await PaymentReceived.find(dateFilter);
    const totalpreviousPaymentData = PaymentReceivedData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    // 🔥 6. CREDIT CUSTOMER
    const creditCustomerData = await CreditCustomer.find(dateFilter);
    const totalCreditValueSum = creditCustomerData.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    // 🔥 CALCULATIONS
    const todaySell = totalValueSum - totalReturnValueSum;
    const salePayment = totalCash - totalpreviousPaymentData;
    const grandTotal = salePayment + totalExpense + totalCreditValueSum;
    const difference = grandTotal - todaySell;

    // 🔥 RESPONSE
    res.json({
      success: true,
      statusCode: 200,
      message: "Settlement fetched successfully",
      data: {
        loadItem: totalValueSum,
        returnItem: totalReturnValueSum,
        noteSummary: totalCash,
        paymentReceived: totalpreviousPaymentData,
        expenses: totalExpense,
        creditCustomer: totalCreditValueSum,
        todaySale: todaySell,
        salePayment: salePayment,
        grandTotal: grandTotal,
        difference: difference,
        from: startOfDay.toISOString().split("T")[0],
        to: endOfDay.toISOString().split("T")[0],
        date: new Date().toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("View Settlement Error:", error);
    res.json({
      success: false,
      statusCode: 500,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getTodayeData,
  viewSettlement, // ✅ new
};


const express = require("express");
const router = express.Router();

const {
  getCustomerLedgerSummary,
  getCustomerLedgerDetail,
  getCustomerBalance,
  getPendingInvoices,
} = require("../controllers/customerLedger.controller");

// Summary list
router.get("/summary", getCustomerLedgerSummary);

// Single customer detail
router.get("/customer/:customerId", getCustomerLedgerDetail);

// 🔥 NEW: Balance for TOTAL PAYMENT box
router.get("/balance/:customerId", getCustomerBalance);

// 🔥 NEW: Pending invoices for Link modal
router.get("/pending-invoices/:customerId", getPendingInvoices);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  createCreditEntry,
  getAllCreditEntries,
  getCreditEntryById,
  getCreditsByCustomer,
  updateCreditEntry,
  deleteCreditEntry,
  deleteAllCreditEntries,
} = require("../controllers/creditCustomer.controller.js");

// =============================
// DELETE ALL
// DELETE /api/credit-customer/delete-all
// ⚠️ Must be BEFORE /:id
// =============================
router.delete("/delete-all", deleteAllCreditEntries);

// =============================
// GET ALL CREDITS FOR A CUSTOMER
// GET /api/credit-customer/customer/:customerId
// ⚠️ Must be BEFORE /:id
// =============================
router.get("/customer/:customerId", getCreditsByCustomer);

// =============================
// CREATE + GET ALL
// POST /api/credit-customer
// GET  /api/credit-customer?page=1&limit=25&from=&to=&search=
// =============================
router.route("/").post(createCreditEntry).get(getAllCreditEntries);

// =============================
// GET ONE + UPDATE + DELETE
// GET    /api/credit-customer/:id
// PUT    /api/credit-customer/:id
// DELETE /api/credit-customer/:id
// =============================
router
  .route("/:id")
  .get(getCreditEntryById)
  .put(updateCreditEntry)
  .delete(deleteCreditEntry);

module.exports = router;
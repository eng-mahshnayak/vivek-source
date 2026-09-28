const express = require("express");
const router = express.Router();

const {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByCustomer,
  updatePayment,
  deletePayment,
  deleteAllPayments,
} = require("../controllers/paymentReceived.controller.js");

// =============================
// DELETE ALL
// DELETE /api/payment-received/delete-all
// ⚠️ Must be BEFORE /:id
// =============================
router.delete("/delete-all", deleteAllPayments);

// =============================
// GET PAYMENTS FOR A CUSTOMER
// GET /api/payment-received/customer/:customerId
// ⚠️ Must be BEFORE /:id
// =============================
router.get("/customer/:customerId", getPaymentsByCustomer);

// =============================
// CREATE + GET ALL
// POST /api/payment-received
// GET  /api/payment-received?page=1&limit=25&from=&to=&paymentMode=&search=
// =============================
router.route("/").post(createPayment).get(getAllPayments);

// =============================
// GET ONE + UPDATE + DELETE
// GET    /api/payment-received/:id
// PUT    /api/payment-received/:id
// DELETE /api/payment-received/:id
// =============================
router
  .route("/:id")
  .get(getPaymentById)
  .put(updatePayment)
  .delete(deletePayment);

module.exports = router;
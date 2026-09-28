const express = require("express");
const router = express.Router();

const {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
} = require("../controllers/expense.controller.js");

// =============================
// DELETE ALL
// DELETE /api/expense/delete-all
// ⚠️ Must be BEFORE /:id
// =============================
router.delete("/delete-all", deleteAllExpenses);

// =============================
// CREATE + GET ALL
// POST /api/expense
// GET  /api/expense?page=1&limit=25&from=&to=&category=&search=
// =============================
router.route("/").post(createExpense).get(getAllExpenses);

// =============================
// GET ONE + UPDATE + DELETE
// GET    /api/expense/:id
// PUT    /api/expense/:id
// DELETE /api/expense/:id
// =============================
router
  .route("/:id")
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
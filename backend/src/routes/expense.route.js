const express = require("express");
const router = express.Router();

const {
  createExpense,
  createBulkExpenses,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  deleteAllExpenses,
  getAllCategories,
  createCategory,
} = require("../controllers/expense.controller.js");

// CATEGORY routes
router.get("/categories", getAllCategories);
router.post("/categories", createCategory);

// BULK
router.post("/bulk", createBulkExpenses);

// DELETE ALL (before /:id)
router.delete("/delete-all", deleteAllExpenses);

// CREATE + GET ALL
router.route("/").post(createExpense).get(getAllExpenses);

// GET ONE + UPDATE + DELETE
router
  .route("/:id")
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
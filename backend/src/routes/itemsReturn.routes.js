const express = require("express");
const router = express.Router();

const {
  createReturnItems,
  getAllReturnItems,
  getReturnItemsById,
  updateReturnItems,
  deleteReturnItems,
  deleteAllReturnItems,
} = require("../controllers/itemsReturn.controller");

// =============================
// DELETE ALL
// DELETE /api/return-items/delete-all
// ⚠️ Must be BEFORE /:id
// =============================
router.delete("/delete-all", deleteAllReturnItems);

// =============================
// CREATE + GET ALL
// POST /api/return-items
// GET  /api/return-items?page=1&limit=25&from=&to=&search=
// =============================
router.route("/").post(createReturnItems).get(getAllReturnItems);

// =============================
// GET ONE + UPDATE + DELETE
// GET    /api/return-items/:id
// PUT    /api/return-items/:id
// DELETE /api/return-items/:id
// =============================
router
  .route("/:id")
  .get(getReturnItemsById)
  .put(updateReturnItems)
  .delete(deleteReturnItems);

module.exports = router;
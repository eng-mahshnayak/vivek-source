const express = require("express");
const router = express.Router();
const {
  createRouteDirectionSale,
  getRouteDirectionSales,
  getRouteDirectionSaleById,
  updateRouteDirectionSale,
  deleteRouteDirectionSale,
  deleteAllRouteDirectionSales,
} = require("../controllers/routeDirectionSaleController");



router.post("/", createRouteDirectionSale);
router.get("/", getRouteDirectionSales);
router.delete("/delete-all", deleteAllRouteDirectionSales); // ⚠️ must be BEFORE /:id
router.get("/:id", getRouteDirectionSaleById);
router.put("/:id", updateRouteDirectionSale);
router.delete("/:id", deleteRouteDirectionSale);

module.exports = router;
const mongoose = require("mongoose");

const routeDirectionSaleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    route: {
      type: String,
      required: [true, "Route is required"],
      trim: true,
      maxlength: 200,
    },
    remark: {
      type: String,
      trim: true,
      default: "-",
      maxlength: 500,
    },
  },
  { timestamps: true }
);

// Fast sorting & filtering by date
routeDirectionSaleSchema.index({ date: -1 });
routeDirectionSaleSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model(
  "RouteDirectionSale",
  routeDirectionSaleSchema
);
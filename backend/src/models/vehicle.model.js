const mongoose = require('mongoose');

const customerItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    mrp: {
      type: Number,
      required: true,
      min: 0,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const vehicleSchema = new mongoose.Schema(
  {
    items: {
      type: [customerItemSchema],
      required: true,
      default: [],
    },
    totalValue: {
      type: Number,
      required: true,
    },
    // ✅ NEW: Route / Direction
    route: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Index for route filtering
vehicleSchema.index({ route: 1 });
vehicleSchema.index({ date: -1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
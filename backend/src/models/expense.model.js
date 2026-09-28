const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Expense category is required"],
      enum: [
        "Diesel / Fuel",
        "Toll / Parking",
        "Driver Allowance",
        "Food / Refreshment",
        "Vehicle Repair",
        "Loading / Unloading",
        "Other",
      ],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    paidVia: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "Cash from Route Collection",
        "Company Cash",
        "UPI / Online",
        "Credit",
      ],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },

    createdBy: {
      type: String,
      default: "System",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Expense", expenseSchema);
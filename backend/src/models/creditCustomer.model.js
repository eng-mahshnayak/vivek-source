const mongoose = require("mongoose");

const creditCustomerSchema = new mongoose.Schema(
  {
    // Reference to Party (customer) — same model as your parties.model.js
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: [true, "Customer is required"],
    },

    // Denormalized snapshot for fast display (in case party gets deleted)
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    billNo: {
      type: String,
      trim: true,
      default: "-",
    },

    amount: {
      type: Number,
      required: [true, "Credit amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    remarks: {
      type: String,
      trim: true,
      default: "-",
      maxlength: [500, "Remarks cannot exceed 500 characters"],
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },

    // For future multi-user support
    createdBy: {
      type: String,
      default: "System",
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast lookups
creditCustomerSchema.index({ customerId: 1 });
creditCustomerSchema.index({ date: -1 });
creditCustomerSchema.index({ createdAt: -1 });

module.exports = mongoose.model("CreditCustomer", creditCustomerSchema);
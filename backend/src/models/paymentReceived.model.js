const mongoose = require("mongoose");

const paymentReceivedSchema = new mongoose.Schema(
  {
    // Reference to Party (customer) — same model as parties.model.js
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: [true, "Customer is required"],
    },

    // Denormalized snapshot
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    paymentMode: {
      type: String,
      required: [true, "Payment mode is required"],
      enum: [
        "Cash Collection",
        "UPI / QR",
        "Bank Transfer",
        "Cheque",
        "Card",
        "Other",
      ],
      default: "Cash Collection",
    },

    transactionRef: {
      type: String,
      trim: true,
      default: "-",
      maxlength: [200, "Transaction ref cannot exceed 200 characters"],
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

// Indexes for fast queries
paymentReceivedSchema.index({ customerId: 1 });
paymentReceivedSchema.index({ date: -1 });
paymentReceivedSchema.index({ paymentMode: 1 });
paymentReceivedSchema.index({ createdAt: -1 });

module.exports = mongoose.model("PaymentReceived", paymentReceivedSchema);
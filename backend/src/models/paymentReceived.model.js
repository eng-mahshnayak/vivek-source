const mongoose = require("mongoose");

const paymentReceivedSchema = new mongoose.Schema(
  {
     date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Party",
          required: [true, "Customer is required"],
        },
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
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    todayPayment:{
       type: Number,
      required: true,
      default:0
    },
    previousPayment:{
       type: Number,
      required: true,
      default:0
    },
linkedInvoices:[{
    invoiceId:{
      type:String,
      trim:true
    },
     invoiceNumber:{
      type:String,
      trim:true
    },
    linkedAmount:{
      type: Number,
    },
}],
     remark: {
      type: String,
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




module.exports = mongoose.model("PaymentReceived", paymentReceivedSchema);
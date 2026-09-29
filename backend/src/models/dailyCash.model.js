const mongoose = require('mongoose');

const dailyCashSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now,
  },

  // Physical cash denominations
  openingCash: {
    note500: { type: Number, default: 0, min: 0 },
    note200: { type: Number, default: 0, min: 0 },
    note100: { type: Number, default: 0, min: 0 },
    note50:  { type: Number, default: 0, min: 0 },
    note20:  { type: Number, default: 0, min: 0 },
    note10:  { type: Number, default: 0, min: 0 },
    coins:   { type: Number, default: 0, min: 0 },
  },

  // 🔥 Online payments — now an ARRAY of multiple entries
  onlinePayments: [
    {
      amount: { type: Number, required: true, min: 0 },
      note:   { type: String, default: "" }, // optional label/note
    },
  ],

  // Totals
  totalOnline: { type: Number, default: 0, min: 0 },
  totalSales:  { type: Number, default: 0, min: 0 },

  // Kept for backward-compat (old single online value)
  online: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

const DailyCash = mongoose.model('DailyCash', dailyCashSchema);

module.exports = DailyCash;
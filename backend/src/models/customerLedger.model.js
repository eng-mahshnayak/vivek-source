// models/user.model.js

const mongoose = require('mongoose');


// User Schema
const CustomerledgerSchema = new mongoose.Schema({
// Reference to Party (customer) — same model as your parties.model.js
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      required: [true, "Customer is required"],
    },
    customerName: {
        type: String,
        required: [true, 'Customer Name is required'],
        trim: true,
    },
    totalSellAmount:{
      type: Number,
    },
    totalRecievedAmount:{
      type: Number,
    },
    balance:{
      type: Number,
    },
    numberOfEntries:{
        type: Number,
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});


const Customerledger = mongoose.model('Customerledger', CustomerledgerSchema);

module.exports = Customerledger;
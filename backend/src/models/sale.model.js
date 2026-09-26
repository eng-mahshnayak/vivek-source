const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
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
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const saleSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Party',
            required: [true, 'Customer is required'],
        },
        items: {
            type: [saleItemSchema],
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: 'At least one item is required',
            },
        },
        grandTotal: {
            type: Number,
            required: true,
            min: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Sale', saleSchema);
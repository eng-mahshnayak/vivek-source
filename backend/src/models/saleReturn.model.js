const mongoose = require('mongoose');

const returnItemSchema = new mongoose.Schema(
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
        originalQuantity: {
            type: Number,
            required: true,
            min: 0,
        },
        returnQuantity: {
            type: Number,
            required: true,
            min: 0,
        },
        returnAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);

const saleReturnSchema = new mongoose.Schema(
    {
        // Original sale invoice reference
        saleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale',
            required: [true, 'Original Sale is required'],
        },

        // Customer reference
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Party',
            required: [true, 'Customer is required'],
        },

        // Return type
        returnType: {
            type: String,
            enum: ['Full Cancel', 'Partial Return'],
            required: true,
        },

        // Returned items
        returnItems: {
            type: [returnItemSchema],
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: 'At least one return item is required',
            },
        },

        // Amounts
        originalTotal: {
            type: Number,
            required: true,
            min: 0,
        },
        returnTotal: {
            type: Number,
            required: true,
            min: 0,
        },

        // Reason
        reason: {
            type: String,
            trim: true,
            default: '',
        },

        // Who performed it — from auth middleware (req.user)
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },
        performedByName: {
            type: String,
            trim: true,
            default: '',
        },

        // Return date
        returnDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SaleReturn', saleReturnSchema);
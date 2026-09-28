const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, 'Item name is required'],
            trim: true,
        },
        mrp: {
            type: Number,
            required: [true, 'MRP is required'],
            min: [0, 'MRP cannot be negative'],
        },
        rate: {
            type: Number,
            required: [true, 'Rate is required'],
            min: [0, 'Rate cannot be negative'],
        },
        unit: {
            type: String,
            required: [true, 'Unit is required'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for fast search by category + name
productSchema.index({ categoryId: 1, itemName: 1 });

module.exports = mongoose.model('Product', productSchema);
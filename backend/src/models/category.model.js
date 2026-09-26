const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true,
        },
        createdBy: {
            type: String,
            required: [true, 'Created By is required'],
            trim: true,
        },
    },
    {
        timestamps: true, // createdAt + updatedAt auto
    }
);

module.exports = mongoose.model('Category', categorySchema);
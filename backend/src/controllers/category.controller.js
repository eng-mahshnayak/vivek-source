const Category = require('../models/category.model.js');


// =============================
// CREATE CATEGORY
// =============================
const createCategory = async (req, res) => {
    try {
        const { categoryName, createdBy } = req.body;

        const category = await Category.create({
            categoryName,
            createdBy,
        });

        res.json({
            success: true,
            statusCode: 201,
            message: 'Category created successfully',
            data: category,
        });

    } catch (error) {
        console.error('Create Category Error:', error);

        // Duplicate category name
        if (error.code === 11000) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Category with this name already exists',
            });
        }

        // Validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);

            return res.json({
                success: false,
                statusCode: 400,
                message: 'Validation Error',
                errors: messages,
            });
        }

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET ALL CATEGORIES
// =============================
const getAllCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        // Search by category name if provided
        if (req.query.search) {
            filter.categoryName = { $regex: req.query.search, $options: 'i' };
        }

        const categories = await Category.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Category.countDocuments(filter);

        res.json({
            success: true,
            statusCode: 200,
            count: total,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: categories,
        });

    } catch (error) {
        console.error('Get All Categories Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET CATEGORY BY ID
// =============================
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Category not found',
            });
        }

        res.json({
            success: true,
            statusCode: 200,
            data: category,
        });

    } catch (error) {
        console.error('Get Category By ID Error:', error);

        if (error.kind === 'ObjectId') {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Invalid ID',
            });
        }

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// UPDATE CATEGORY
// =============================
const updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Category not found',
            });
        }

        category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            statusCode: 200,
            message: 'Category updated successfully',
            data: category,
        });

    } catch (error) {
        console.error('Update Category Error:', error);

        if (error.code === 11000) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Category with this name already exists',
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);

            return res.json({
                success: false,
                statusCode: 400,
                message: 'Validation Error',
                errors: messages,
            });
        }

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// DELETE CATEGORY
// =============================
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Category not found',
            });
        }

        await category.deleteOne();

        res.json({
            success: true,
            statusCode: 200,
            message: 'Category deleted successfully',
        });

    } catch (error) {
        console.error('Delete Category Error:', error);

        if (error.kind === 'ObjectId') {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Invalid ID',
            });
        }

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// DELETE ALL CATEGORIES
// =============================
const deleteAllCategories = async (req, res) => {
    try {
        const result = await Category.deleteMany({});

        res.json({
            success: true,
            statusCode: 200,
            message: 'All categories deleted successfully',
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error('Delete All Categories Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
};
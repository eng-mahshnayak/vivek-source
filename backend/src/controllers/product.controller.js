const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');


// =============================
// CREATE PRODUCT
// =============================
const createProduct = async (req, res) => {
    try {
        const { itemName, mrp, rate, unit, categoryId } = req.body;

        // Check category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Category not found',
            });
        }

        const product = await Product.create({
            itemName,
            mrp,
            rate,
            unit,
            categoryId,
        });

        // Populate category info
        const populated = await product.populate('categoryId', 'categoryName');

        res.json({
            success: true,
            statusCode: 201,
            message: 'Product created successfully',
            data: populated,
        });

    } catch (error) {
        console.error('Create Product Error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Validation Error',
                errors: messages,
            });
        }

        if (error.kind === 'ObjectId') {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Invalid Category ID',
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
// GET ALL PRODUCTS (with search)
// Supports:
//   ?page=1&limit=25
//   ?categoryId=xxx
//   ?letter=A          → first letter of itemName
//   ?search=abc        → general search
// =============================
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        // Filter by category
        if (req.query.categoryId) {
            filter.categoryId = req.query.categoryId;
        }

        // Filter by first letter of itemName (case-insensitive)
        if (req.query.letter) {
            const letter = req.query.letter.charAt(0);
            filter.itemName = { $regex: `^${letter}`, $options: 'i' };
        }

        // General search by itemName
        if (req.query.search) {
            filter.itemName = {
                ...filter.itemName,
                $regex: req.query.search,
                $options: 'i',
            };
        }

        const products = await Product.find(filter)
            .populate('categoryId', 'categoryName')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(filter);

        res.json({
            success: true,
            statusCode: 200,
            count: total,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products,
        });

    } catch (error) {
        console.error('Get All Products Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET PRODUCT BY ID
// =============================
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('categoryId', 'categoryName');

        if (!product) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Product not found',
            });
        }

        res.json({
            success: true,
            statusCode: 200,
            data: product,
        });

    } catch (error) {
        console.error('Get Product By ID Error:', error);

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
// UPDATE PRODUCT
// =============================
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Product not found',
            });
        }

        // If categoryId changing, verify new category exists
        if (req.body.categoryId) {
            const category = await Category.findById(req.body.categoryId);
            if (!category) {
                return res.json({
                    success: false,
                    statusCode: 404,
                    message: 'Category not found',
                });
            }
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('categoryId', 'categoryName');

        res.json({
            success: true,
            statusCode: 200,
            message: 'Product updated successfully',
            data: product,
        });

    } catch (error) {
        console.error('Update Product Error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Validation Error',
                errors: messages,
            });
        }

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
// DELETE PRODUCT
// =============================
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Product not found',
            });
        }

        await product.deleteOne();

        res.json({
            success: true,
            statusCode: 200,
            message: 'Product deleted successfully',
        });

    } catch (error) {
        console.error('Delete Product Error:', error);

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
// DELETE ALL PRODUCTS
// =============================
const deleteAllProducts = async (req, res) => {
    try {
        const result = await Product.deleteMany({});

        res.json({
            success: true,
            statusCode: 200,
            message: 'All products deleted successfully',
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error('Delete All Products Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
};
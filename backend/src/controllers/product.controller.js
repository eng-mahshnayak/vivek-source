const Product = require('../models/product.model.js');

// =============================
// SEARCH PRODUCTS (For dropdown/autocomplete)
// GET /api/product/search?query=term&limit=20
// =============================
const searchProducts = async (req, res) => {
    try {
        const { query, limit = 20 } = req.query;

        const filter = {};

        // Add regex search if query provided
        if (query && query.trim() !== '') {
            const searchRegex = new RegExp(query.trim(), 'i');
            filter.$or = [
                { itemName: { $regex: searchRegex } },
                { unit: { $regex: searchRegex } },
            ];
        }

        const products = await Product.find(filter)
            .limit(parseInt(limit))
            .sort({ itemName: 1 });

        res.json({
            success: true,
            statusCode: 200,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error('Search Products Error:', error);
        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};

// =============================
// CREATE PRODUCT
// POST /api/product
// =============================
const createProduct = async (req, res) => {
    try {
        const productData = {
            itemName: req.body.itemName,
            mrp: req.body.mrp,
            rate: req.body.rate,
            unit: req.body.unit,
        };

        const product = await Product.create(productData);

        res.json({
            success: true,
            statusCode: 201,
            message: 'Product created successfully',
            data: product,
        });
    } catch (error) {
        console.error('Create Product Error:', error);

        if (error.code === 11000) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Product already exists',
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
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
// GET ALL PRODUCTS WITH PAGINATION & FILTERS
// GET /api/product?page=1&limit=10&search=term
// =============================
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search } = req.query;

        let filter = {};

        if (search) {
            filter.$or = [
                { itemName: { $regex: search, $options: 'i' } },
                { unit: { $regex: search, $options: 'i' } },
            ];
        }

        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(filter);

        res.json({
            success: true,
            statusCode: 200,
            count: products.length,
            total,
            page,
            limit,
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
// GET /api/product/:id
// =============================
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

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
                message: 'Invalid product ID',
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
// PUT /api/product/:id
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

        product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                itemName: req.body.itemName,
                mrp: req.body.mrp,
                rate: req.body.rate,
                unit: req.body.unit,
            },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            statusCode: 200,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        console.error('Update Product Error:', error);

        if (error.code === 11000) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'Product already exists',
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
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
                message: 'Invalid product ID',
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
// DELETE /api/product/:id
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
                message: 'Invalid product ID',
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
// DELETE /api/product/delete-all
// =============================
const deleteAllProducts = async (req, res) => {
    try {
        const result = await Product.deleteMany({});

        res.json({
            success: true,
            statusCode: 200,
            message: `${result.deletedCount} products deleted successfully`,
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
    searchProducts,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
};
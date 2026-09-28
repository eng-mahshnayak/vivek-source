const express = require('express');
const router = express.Router();

const {
    searchProducts,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
} = require('../controllers/product.controller.js');

// =============================
// SEARCH PRODUCTS (Advanced search with regex)
// GET /api/product/search?query=term&limit=20
// ⚠️ Must come BEFORE /:id route
// =============================
router.get('/search', searchProducts);

// =============================
// DELETE ALL PRODUCTS
// DELETE /api/product/delete-all
// ⚠️ Must come BEFORE /:id route
// =============================
router.delete('/delete-all', deleteAllProducts);

// =============================
// CREATE + GET ALL
// POST /api/product  → Create new product
// GET  /api/product  → Get all products (with pagination)
// =============================
router.route('/')
    .post(createProduct)
    .get(getAllProducts);

// =============================
// GET ONE + UPDATE + DELETE
// GET    /api/product/:id  → Get single product
// PUT    /api/product/:id  → Update product
// DELETE /api/product/:id  → Delete product
// =============================
router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
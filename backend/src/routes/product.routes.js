const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
} = require('../controllers/product.controller.js');


// =============================
// PRODUCT ROUTES
// =============================

// Create + Get All (with search/filter)
router
    .route('/')
    .post(createProduct)
    .get(getAllProducts);

// Delete All  ⚠️ ye '/:id' se PEHLE hona chahiye
router
    .route('/delete-all')
    .delete(deleteAllProducts);

// Get Single + Update + Delete
router
    .route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);


module.exports = router;
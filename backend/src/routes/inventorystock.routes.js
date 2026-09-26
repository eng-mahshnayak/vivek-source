const express = require ('express');


const router = express.Router();


const {createCategory,getAllCategories,getCategoryById,updateCategory,deleteCategory,deleteAllCategories,} = require('../controllers/category.controller.js');

// Optional: agar aapke paas auth middleware hai to yahan import karein



// =============================
// CATEGORY ROUTES
// =============================


router
    .route('/')
    .post( createCategory)
    .get( getAllCategories);


router
    .route('/delete-all')
    .delete( deleteAllCategories);

// Get Single + Update + Delete
router
    .route('/:id')
    .get(getCategoryById)
    .put( updateCategory)
    .delete( deleteCategory);







    
    

module.exports = router;
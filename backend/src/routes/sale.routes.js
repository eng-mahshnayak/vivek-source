const express = require('express');

const router = express.Router();

const {
   
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    deleteAllSales,
    createVehicle,
} = require('../controllers/vehicle.controller.js');


// =============================
// SALE ROUTES
// =============================

// Create + Get All
router
    .route('/')
    .post(createVehicle)
    .get(getAllSales);

// Delete All  ⚠️ ye '/:id' se PEHLE hona chahiye
router
    .route('/delete-all')
    .delete(deleteAllSales);

// Get Single + Update + Delete
router
    .route('/:id')
    .get(getSaleById)
    .put(updateSale)
    .delete(deleteSale);


module.exports = router;
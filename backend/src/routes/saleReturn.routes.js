const express = require('express');
const router = express.Router();

const {
    createSaleReturn,
    getAllSaleReturns,
    getSaleReturnById,
    updateSaleReturn,
    deleteSaleReturn,
    deleteAllSaleReturns,
    getReturnableInfo,
} = require('../controllers/saleReturn.controller.js');


// =============================
// SALE RETURN ROUTES
// =============================

// Create + Get All
router
    .route('/')
    .post(createSaleReturn)
    .get(getAllSaleReturns);

// Delete All  ⚠️ ye '/:id' se PEHLE
router
    .route('/delete-all')
    .delete(deleteAllSaleReturns);

// Get returnable info for a sale (kitna aur return ho sakta hai)
router
    .route('/returnable/:saleId')
    .get(getReturnableInfo);

// Get Single + Update + Delete
router
    .route('/:id')
    .get(getSaleReturnById)
    .put(updateSaleReturn)
    .delete(deleteSaleReturn);


module.exports = router;
const SaleReturn = require('../models/saleReturn.model.js');
const Sale = require('../models/sale.model.js');
const Product = require('../models/product.model.js');


// =============================
// CREATE SALE RETURN
// Handles both Full Cancel & Partial Return
// =============================
const createSaleReturn = async (req, res) => {
    try {
        const {
            saleId,
            returnType,
            returnItems,
            reason,
        } = req.body;

        // 1. Validate sale exists
        const originalSale = await Sale.findById(saleId);
        if (!originalSale) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Original sale not found',
            });
        }

        // 2. Check how much already returned for this sale
        const existingReturns = await SaleReturn.find({ saleId });
        const alreadyReturned = {}; // productId → qty already returned

        existingReturns.forEach((r) => {
            r.returnItems.forEach((it) => {
                const pid = it.productId.toString();
                alreadyReturned[pid] =
                    (alreadyReturned[pid] || 0) + it.returnQuantity;
            });
        });

        // 3. Validate each return item
        if (!returnItems || returnItems.length === 0) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'At least one return item is required',
            });
        }

        const finalReturnItems = [];
        let returnTotal = 0;

        for (const item of returnItems) {
            // find original sale item
            const originalItem = originalSale.items.find(
                (i) => i.productId.toString() === item.productId.toString()
            );

            if (!originalItem) {
                return res.json({
                    success: false,
                    statusCode: 400,
                    message: `Item not found in original sale: ${item.itemName}`,
                });
            }

            const alreadyQty = alreadyReturned[item.productId.toString()] || 0;
            const availableQty = originalItem.quantity - alreadyQty;

            const returnQty = Number(item.returnQuantity);

            if (returnQty <= 0) {
                return res.json({
                    success: false,
                    statusCode: 400,
                    message: `Return quantity must be greater than 0 for ${item.itemName}`,
                });
            }

            if (returnQty > availableQty) {
                return res.json({
                    success: false,
                    statusCode: 400,
                    message: `Cannot return ${returnQty} of ${item.itemName}. Only ${availableQty} available to return.`,
                });
            }

            const returnAmount = returnQty * originalItem.rate;

            finalReturnItems.push({
                productId: originalItem.productId,
                itemName: originalItem.itemName,
                mrp: originalItem.mrp,
                rate: originalItem.rate,
                originalQuantity: originalItem.quantity,
                returnQuantity: returnQty,
                returnAmount,
            });

            returnTotal += returnAmount;
        }

        // 4. Determine final returnType based on actual qty
        let finalReturnType = returnType;
        // If all items fully returned, mark as Full Cancel
        const fullyReturned = originalSale.items.every((orig) => {
            const alreadyQty = alreadyReturned[orig.productId.toString()] || 0;
            const thisReturnQty =
                finalReturnItems.find(
                    (f) => f.productId.toString() === orig.productId.toString()
                )?.returnQuantity || 0;
            return alreadyQty + thisReturnQty >= orig.quantity;
        });

        if (fullyReturned) {
            finalReturnType = 'Full Cancel';
        }

        // 5. Create return
        const saleReturn = await SaleReturn.create({
            saleId,
            customerId: originalSale.customerId,
            returnType: finalReturnType,
            returnItems: finalReturnItems,
            originalTotal: originalSale.grandTotal,
            returnTotal,
            reason: reason || '',
            performedBy: req.user?._id || null,
            performedByName: req.user?.name || req.user?.username || 'System',
            returnDate: new Date(),
        });

        const populated = await SaleReturn.findById(saleReturn._id)
            .populate('saleId', 'grandTotal date')
            .populate('customerId', 'name companyName mobile phone')
            .populate('performedBy', 'name username');

        res.json({
            success: true,
            statusCode: 201,
            message: `${finalReturnType} created successfully`,
            data: populated,
        });

    } catch (error) {
        console.error('Create Sale Return Error:', error);

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
// GET ALL SALE RETURNS
// =============================
const getAllSaleReturns = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.saleId) filter.saleId = req.query.saleId;
        if (req.query.customerId) filter.customerId = req.query.customerId;
        if (req.query.returnType) filter.returnType = req.query.returnType;

        // Date range
        if (req.query.from || req.query.to) {
            filter.returnDate = {};
            if (req.query.from) filter.returnDate.$gte = new Date(req.query.from);
            if (req.query.to) {
                const toDate = new Date(req.query.to);
                toDate.setDate(toDate.getDate() + 1);
                filter.returnDate.$lt = toDate;
            }
        }

        const returns = await SaleReturn.find(filter)
            .populate('saleId', 'grandTotal date')
            .populate('customerId', 'name companyName mobile phone')
            .populate('performedBy', 'name username')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await SaleReturn.countDocuments(filter);

        res.json({
            success: true,
            statusCode: 200,
            count: total,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: returns,
        });

    } catch (error) {
        console.error('Get All Sale Returns Error:', error);
        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET SALE RETURN BY ID
// =============================
const getSaleReturnById = async (req, res) => {
    try {
        const saleReturn = await SaleReturn.findById(req.params.id)
            .populate('saleId', 'grandTotal date items')
            .populate('customerId', 'name companyName mobile phone gst address email')
            .populate('performedBy', 'name username');

        if (!saleReturn) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale Return not found',
            });
        }

        res.json({
            success: true,
            statusCode: 200,
            data: saleReturn,
        });

    } catch (error) {
        console.error('Get Sale Return By ID Error:', error);

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
// UPDATE SALE RETURN
// Only reason & returnDate editable (items/qty immutable for audit)
// =============================
const updateSaleReturn = async (req, res) => {
    try {
        let saleReturn = await SaleReturn.findById(req.params.id);

        if (!saleReturn) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale Return not found',
            });
        }

        // Only allow updating reason
        if (req.body.reason !== undefined) {
            saleReturn.reason = req.body.reason;
        }

        await saleReturn.save();

        res.json({
            success: true,
            statusCode: 200,
            message: 'Sale Return updated successfully',
            data: saleReturn,
        });

    } catch (error) {
        console.error('Update Sale Return Error:', error);
        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// DELETE SALE RETURN
// =============================
const deleteSaleReturn = async (req, res) => {
    try {
        const saleReturn = await SaleReturn.findById(req.params.id);

        if (!saleReturn) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale Return not found',
            });
        }

        await saleReturn.deleteOne();

        res.json({
            success: true,
            statusCode: 200,
            message: 'Sale Return deleted successfully',
        });

    } catch (error) {
        console.error('Delete Sale Return Error:', error);

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
// DELETE ALL SALE RETURNS
// =============================
const deleteAllSaleReturns = async (req, res) => {
    try {
        const result = await SaleReturn.deleteMany({});

        res.json({
            success: true,
            statusCode: 200,
            message: 'All sale returns deleted successfully',
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error('Delete All Sale Returns Error:', error);
        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET RETURNABLE INFO FOR A SALE
// Helper API: kitna qty har item ka return ho sakta hai
// =============================
const getReturnableInfo = async (req, res) => {
    try {
        const { saleId } = req.params;

        const originalSale = await Sale.findById(saleId)
            .populate('customerId', 'name companyName mobile phone');

        if (!originalSale) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale not found',
            });
        }

        // Calculate already returned
        const existingReturns = await SaleReturn.find({ saleId });
        const alreadyReturned = {};

        existingReturns.forEach((r) => {
            r.returnItems.forEach((it) => {
                const pid = it.productId.toString();
                alreadyReturned[pid] =
                    (alreadyReturned[pid] || 0) + it.returnQuantity;
            });
        });

        // Build returnable items array
        const returnableItems = originalSale.items.map((item) => {
            const alreadyQty = alreadyReturned[item.productId.toString()] || 0;
            const availableQty = item.quantity - alreadyQty;
            return {
                productId: item.productId,
                itemName: item.itemName,
                mrp: item.mrp,
                rate: item.rate,
                originalQuantity: item.quantity,
                alreadyReturned: alreadyQty,
                availableToReturn: availableQty,
            };
        });

        // Check if fully returned
        const isFullyReturned = returnableItems.every(
            (it) => it.availableToReturn <= 0
        );

        res.json({
            success: true,
            statusCode: 200,
            data: {
                sale: originalSale,
                returnableItems,
                isFullyReturned,
                totalReturns: existingReturns.length,
            },
        });

    } catch (error) {
        console.error('Get Returnable Info Error:', error);
        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



module.exports = {
    createSaleReturn,
    getAllSaleReturns,
    getSaleReturnById,
    updateSaleReturn,
    deleteSaleReturn,
    deleteAllSaleReturns,
    getReturnableInfo,
};
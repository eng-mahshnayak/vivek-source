const Sale = require('../models/sale.model.js');
const Customer = require('../models/parties.mode.js');
const Product = require('../models/product.model.js');


// =============================
// CREATE SALE INVOICE
// =============================
const createSale = async (req, res) => {
    try {
        const { customerId, items, date } = req.body;

        // Validate customer
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Customer not found',
            });
        }


        console.log(customer,'=============customer=================');
        

        // Validate items
        if (!items || items.length === 0) {
            return res.json({
                success: false,
                statusCode: 400,
                message: 'At least one item is required',
            });
        }

        // Validate each product & calculate total
        let grandTotal = 0;
        const finalItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.json({
                    success: false,
                    statusCode: 404,
                    message: `Product not found: ${item.itemName}`,
                });
            }

            const qty = Number(item.quantity);
            const rate = Number(item.rate);
            const totalAmount = qty * rate;

            finalItems.push({
                productId: product._id,
                itemName: product.itemName,
                mrp: product.mrp,
                rate,
                quantity: qty,
                totalAmount,
            });

            grandTotal += totalAmount;
        }

        const sale = await Sale.create({
            customerId,
            items: finalItems,
            grandTotal,
            date: date || Date.now(),
        });

        const populated = await Sale.findById(sale._id)
            .populate('customerId', 'name mobile')
            .populate('items.productId', 'itemName mrp unit');

        res.json({
            success: true,
            statusCode: 201,
            message: 'Sale invoice created successfully',
            data: populated,
        });

    } catch (error) {
        console.error('Create Sale Error:', error);

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
// GET ALL SALES (with pagination)
// =============================
const getAllSales = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        // Filter by customer
        if (req.query.customerId) {
            filter.customerId = req.query.customerId;
        }

        // Filter by date range
        if (req.query.from || req.query.to) {
            filter.date = {};
            if (req.query.from) filter.date.$gte = new Date(req.query.from);
            if (req.query.to) {
                const toDate = new Date(req.query.to);
                toDate.setDate(toDate.getDate() + 1);
                filter.date.$lt = toDate;
            }
        }

        const sales = await Sale.find(filter)
            .populate('customerId', 'companyName mobile')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Sale.countDocuments(filter);

        res.json({
            success: true,
            statusCode: 200,
            count: total,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: sales,
        });

    } catch (error) {
        console.error('Get All Sales Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



// =============================
// GET SALE BY ID
// =============================
const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id)
            .populate('customerId', 'name mobile gst address email')
            .populate('items.productId', 'itemName mrp unit');

        if (!sale) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale not found',
            });
        }

        res.json({
            success: true,
            statusCode: 200,
            data: sale,
        });

    } catch (error) {
        console.error('Get Sale By ID Error:', error);

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
// UPDATE SALE
// =============================
const updateSale = async (req, res) => {
    try {
        const { customerId, items, date } = req.body;

        let sale = await Sale.findById(req.params.id);
        if (!sale) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale not found',
            });
        }

        // Validate customer if changing
        if (customerId) {
            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.json({
                    success: false,
                    statusCode: 404,
                    message: 'Customer not found',
                });
            }
        }

        // Validate + recalculate items
        let finalItems = sale.items;
        let grandTotal = sale.grandTotal;

        if (items && items.length > 0) {
            finalItems = [];
            grandTotal = 0;

            for (const item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    return res.json({
                        success: false,
                        statusCode: 404,
                        message: `Product not found: ${item.itemName}`,
                    });
                }

                const qty = Number(item.quantity);
                const rate = Number(item.rate);
                const totalAmount = qty * rate;

                finalItems.push({
                    productId: product._id,
                    itemName: product.itemName,
                    mrp: product.mrp,
                    rate,
                    quantity: qty,
                    totalAmount,
                });

                grandTotal += totalAmount;
            }
        }

        sale = await Sale.findByIdAndUpdate(
            req.params.id,
            {
                customerId: customerId || sale.customerId,
                items: finalItems,
                grandTotal,
                date: date || sale.date,
            },
            { new: true, runValidators: true }
        )
            .populate('customerId', 'name mobile')
            .populate('items.productId', 'itemName mrp unit');

        res.json({
            success: true,
            statusCode: 200,
            message: 'Sale updated successfully',
            data: sale,
        });

    } catch (error) {
        console.error('Update Sale Error:', error);

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
// DELETE SALE
// =============================
const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id);

        if (!sale) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'Sale not found',
            });
        }

        await sale.deleteOne();

        res.json({
            success: true,
            statusCode: 200,
            message: 'Sale deleted successfully',
        });

    } catch (error) {
        console.error('Delete Sale Error:', error);

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
// DELETE ALL SALES
// =============================
const deleteAllSales = async (req, res) => {
    try {
        const result = await Sale.deleteMany({});

        res.json({
            success: true,
            statusCode: 200,
            message: 'All sales deleted successfully',
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error('Delete All Sales Error:', error);

        res.json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
        });
    }
};



module.exports = {
    createSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
    deleteAllSales,
};
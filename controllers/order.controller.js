const { Order } = require('../models/order.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllOrders = catchAsync(async (req, res, next) => {
    const orders = Order.findAll();
    
    res.status(200).json({
        status: 'success',
        orders
    });
});

const createOrder = catchAsync(async (req, res, next) => {
    const { mealId, quantity } = req.body;

    const newOrder = Order.create({
        mealId,
        quantity
    });

    res.status(201).json({
        status: 'success',
        newOrder   
    });
});

const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    const { mealId, quantity } = req.body;

    await order.update({
        mealId,
        quantity
    });

    res.status(204).json({ status: 'success' });
});

const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;

    await order.update({ status: 'cancelled' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
};
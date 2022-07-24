const { Order } = require('../models/order.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const orderExists = catchAsync(async (req, res, next) => {
    const { id, status } = req.params;

    const order = await Order.findOne({ where: { id } });

    if (!order) {
        return next(new AppError('Order not found', 404));
    } else if(status === 'cancelled') {
        return  next(new AppError('Order has been cancelled', 404));
    }

    req.order= order;
    next();
});

module.exports = { orderExists };
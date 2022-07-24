const express = require('express');

const {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order.controller');

const { createOrderValidators } = require('../middlewares/validators.middleware');
const { orderExists } = require('../middlewares/orders.middleware');
const { mealExists } = require('../middlewares/meal.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

const ordersRouter = express.Router();

ordersRouter.get('/me', getAllOrders);

ordersRouter.post('/', createOrderValidators, mealExists, createOrder);

ordersRouter
    .use('/:id', protectSession, protectUserAccount, orderExists)
    .route('/:id')
    .patch(updateOrder)
    .delete(deleteOrder)

module.exports = { ordersRouter };
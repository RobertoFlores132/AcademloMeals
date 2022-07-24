const express = require('express');

const {
    getAllRestaurants,
    createRestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createRestaurantReview,
    updateRestaurantReview,
    deleteRestaurantReview
} = require('../controllers/restaurants.controller');

const { createRestaurantValidators } = require('../middlewares/validators.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { reviewExists } = require('../middlewares/review.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', restaurantExists, getRestaurantById);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);

restaurantsRouter
    .use('/:id', protectSession, restaurantExists)
    .route('/:id')
    .patch(updateRestaurant)
    .delete(deleteRestaurant)

restaurantsRouter.post('/reviews/:restaurantId', protectSession, createRestaurantReview);

restaurantsRouter
    .use('/reviews/:id', reviewExists)
    .route('/reviews/:id')
    .update(protectSession, protectUserAccount, updateRestaurantReview)
    .delete(protectSession, protectUserAccount, deleteRestaurantReview)

module.exports = { restaurantsRouter };
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll();

    res.status(200).json({
        status: 'success',
        restaurants
    });
});

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    newRestaurant = await Restaurant.create({
        name,
        address,
        rating
    });

    res.status(201).json({
        status: 'success',
        newRestaurant
    });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({
        status: 'success',
        restaurant
    });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name } = req.body;
    const { address } = req.body;
    const { rating } = req.body;
    
    await restaurant.update({
        name,
        address,
        rating
    });

    res.status(204).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    await restaurant.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
})

const createRestaurantReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;

    const newReview = Review.create({
        comment,
        rating
    });

    res.status(201).json({
        status: 'success',
        newReview
    });
});

const updateRestaurantReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { comment } = req.body;
    const { rating } = req.body;

    await review.update({
        comment,
        rating
    });

    res.status(204).json({ status: 'success' });
});

const deleteRestaurantReview = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllRestaurants,
    createRestaurant,
    updateRestaurant,
    getRestaurantById,
    deleteRestaurant,
    createRestaurantReview,
    updateRestaurantReview,
    deleteRestaurantReview
}
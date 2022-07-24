const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = Meal.findAll();

    res.status(200).json({
        status: 'success',
        meals
    });
});

const getMealById = catchAsync(async (req, res, next) => {
    const { meal } = req;

    res.status(200).json({
        status: 'success',
        meal
    });
});

const createMeal = catchAsync(async (req, res, next) => {
    const { name, price } = req.body;

    const newMeal = await Meal.create({
        name,
        price
    });

    res.status(201).json({
        status: 'success',
        newMeal
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price} = req.body;

    await meal.update({
        name,
        price
    });

    res.status(201).json({ status: 'success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;

    await meal.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
};
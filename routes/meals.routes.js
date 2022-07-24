const express = require('express');

const {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal
} = require('../controllers/meals.controller');

const { createMealValidators } = require('../middlewares/validators.middleware');
const { mealExists } = require('../middlewares/meal.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', mealExists, getMealById);

mealsRouter.use(protectSession);

mealsRouter.put('/:id', createMealValidators, restaurantExists, createMeal);

mealsRouter.patch('/:id', mealExists, updateMeal);

mealsRouter.delete('/:id', mealExists, deleteMeal);

module.exports = { mealsRouter };




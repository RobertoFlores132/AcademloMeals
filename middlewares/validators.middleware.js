const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map(err => err.msg);

        const message = errorMsgs.join(', ');

        return next(new AppError(message, 400));
    }

    next();
};

const createUserValidators = [
    body('name').notEmpty().withMessage("Name can't be empy"),
	body('email').isEmail().withMessage("Invalid email format"),
	body('password')
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters")
		.isAlphanumeric()
		.withMessage("Password must contain letters and numbers"),
        checkResult,
];

const createRestaurantValidators = [
    body('name').notEmpty().withMessage("Name can't be empty"),
    body('address').notEmpty().withMessage("Address can't be empty"),
    body('rating')
        .notEmpty()
        .withMessage("Rating can't be empty")
        .isAlphanumeric()
        .withMessage("Rating must be a number from 1 to 5")
]

const createMealValidators = [
    body('name').notEmpty().withMessage("Name can't be empty"),
    body('price')
        .notEmpty()
        .withMessage("Price can't be empty")
        .isAlphanumeric()
        .withMessage("Price must be a number")
]

const createOrderValidators = [
    body('mealId')
        .notEmpty()
        .withMessage("Meal ID can't be empty")
        .isAlphanumeric()
        .withMessage("Meal ID must be a Number"),
    body('quantity')
        .notEmpty()
        .withMessage("Quantity can't be empty")
        .isAlphanumeric()
        .withMessage("Quantity can't be empty")
    ]

module.exports = { createUserValidators, createRestaurantValidators, createMealValidators, createOrderValidators };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email,
            status: 'active'
        },
    });

    if(!user) {
        return next(new AppError('Invalid Credentials', 400));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return next(new AppError('Invalid Credentials', 400));
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT.SECRET, { expiresIn: '30d' });

    res.status(200).json({
        status: 'success',
        token
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name } = req.body;
    const { password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await user.update({
        name,
        password: hashPassword
    });

    res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
});

module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser
};
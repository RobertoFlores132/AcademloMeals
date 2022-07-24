const express = require('express');

const {
    createUser,
    login,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');

const { createUserValidators } = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter
    .use('./:id', userExists)
    .route('./:id')
    .patch(protectUserAccount, updateUser)
    .delete(protectUserAccount, deleteUser)

module.exports = { usersRouter };
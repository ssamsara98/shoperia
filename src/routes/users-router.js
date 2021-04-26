const express = require('express');

const UsersController = require('../controllers/users-controller');
const authMw = require('../middlewares/auth-mw');

const usersRouter = express.Router();

usersRouter.get('/me', authMw, UsersController.getProfile);

module.exports = usersRouter;

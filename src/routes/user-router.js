const express = require('express');

const UserController = require('../controllers/user-controller');
const authMw = require('../middlewares/auth-mw');

const userRouter = express.Router();

userRouter.get('/me', authMw, UserController.getProfile);

module.exports = userRouter;

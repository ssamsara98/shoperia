const express = require('express');
const { body } = require('express-validator');

const AuthController = require('../controllers/auth-controller');

const authRouter = express.Router();

authRouter.post(
  '/register',
  body('email').isEmail().normalizeEmail(),
  body('username').notEmpty(),
  body('password').isLength({ min: 6, max: 32 }),
  body('name').notEmpty(),
  AuthController.register,
);
authRouter.post(
  '/login',
  body('user_session').notEmpty(),
  body('password').notEmpty(),
  AuthController.login,
);

module.exports = authRouter;

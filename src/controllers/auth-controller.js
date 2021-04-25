const express = require('express');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const User = require('../models/user');
const { signPayload } = require('../utils/jwt-helper');

const createSendToken = (user, statusCode, req = express.request, res = express.response) => {
  const token = signPayload({
    sub: user._id,
    email: user.email,
  });

  res.cookie('_SID_', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  delete user.password;

  res.status(statusCode);
  return res.json({
    data: {
      token,
      user,
    },
    metadata: {
      status: res.statusCode,
    },
  });
};

class AuthController {
  static async register(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { name, email, username, password } = req.body;

      const newUser = new User({ name, email, username, password });
      await newUser.save();

      return createSendToken(newUser, 201, req, res);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }

  static async login(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { user_session, password } = req.body;

      const user = await User.findOne({
        $or: [{ email: user_session }, { username: user_session }],
      }).select('+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(createHttpError(401, 'Incorrect email or password'));
      }

      return createSendToken(user, 200, req, res);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = AuthController;

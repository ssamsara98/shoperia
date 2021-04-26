const express = require('express');

class UsersController {
  static async getProfile(req = express.request, res = express.response, next) {
    try {
      return res.json(req.user);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = UsersController;

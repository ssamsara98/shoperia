const express = require('express');

class UserController {
  static async getProfile(req = express.request, res = express.response, next) {
    try {
      const result = {
        data: {
          user: req.user,
        },
        meta: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = UserController;

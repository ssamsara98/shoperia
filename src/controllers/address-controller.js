const express = require('express');

class AddressController {
  static async createAddress(req = express.request, res = express.response, next) {
    try {
      return res.json({ message: 'success' });
    } catch (err) {
      return next(err);
    }
  }

  static async getAddress(req = express.request, res = express.response, next) {
    try {
      return res.json({ message: 'success' });
    } catch (err) {
      return next(err);
    }
  }
  static async updateAddress(req = express.request, res = express.response, next) {
    try {
      return res.json({ message: 'success' });
    } catch (err) {
      return next(err);
    }
  }
  static async updateAddressPrimary(req = express.request, res = express.response, next) {
    try {
      return res.json({ message: 'success' });
    } catch (err) {
      return next(err);
    }
  }
  static async deleteAddress(req = express.request, res = express.response, next) {
    try {
      return res.json({ message: 'success' });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = AddressController;

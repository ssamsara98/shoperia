const express = require('express');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Cart = require('../models/cart');

class CartController {
  static async addToCart(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { product_id, quantity } = req.body;

      // find item
      let item = await Cart.findOne({ user: req.user.id, product: product_id });

      if (item) {
        item = await Cart.findOneAndUpdate(
          { user: req.user.id, product: product_id },
          { $inc: { quantity } },
          { new: true },
        );
      } else {
        item = new Cart({ user: req.user.id, product: product_id, quantity });
        await item.save();
      }

      res.status(201);
      const result = {
        data: {
          item,
        },
        metadata: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async getCart(req = express.request, res = express.response, next) {
    try {
      const cart = await Cart.find({ user: req.user.id });

      const result = {
        data: {
          cart,
        },
        metadat: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = CartController;

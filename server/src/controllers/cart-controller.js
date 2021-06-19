const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Cart = require('../models/cart');
const expressAsyncHandler = require('express-async-handler');

class CartController {
  static addToCart = expressAsyncHandler(async (req, res) => {
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
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static getCart = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }

    const cart = await Cart.find({ user: req.user.id });

    const result = {
      data: {
        cart,
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static deleteItem = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { product_id } = req.body;

    const item = await Cart.findOneAndDelete({ user: req.user.id, product: product_id });

    const result = {
      data: {
        item,
      },
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });
}

module.exports = CartController;

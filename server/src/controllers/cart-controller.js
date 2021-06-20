const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Cart = require('../models/cart');
const expressAsyncHandler = require('express-async-handler');

class CartController {
  static addCartItem = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { product_id, quantity = 1, modified } = req.body;

    // find item
    let item = await Cart.findOne({ user: req.user.id, product: product_id });

    if (item) {
      if (modified && quantity) {
        item = await Cart.findOneAndUpdate(
          { user: req.user.id, product: product_id },
          { quantity: Math.abs(quantity) },
          { new: true },
        );
      } else if (item.quantity + quantity <= 0) {
        await item.delete();
        res.status(204);
      } else {
        item = await Cart.findOneAndUpdate(
          { user: req.user.id, product: product_id },
          { $inc: { quantity } },
          { new: true },
        );
        res.status(201);
      }
    } else {
      item = new Cart({ user: req.user.id, product: product_id, quantity: Math.abs(quantity) });
      await item.save();
    }

    const result = {
      data: item,
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

    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'product',
        select: 'name price stock',
        populate: {
          path: 'images',
          select: 'filepath filename type',
        },
      })
      .exec();

    const result = {
      data: cart.map((item) => ({
        _id: item._id,
        id: item.id,
        quantity: item.quantity,
        product: item.product,
        created_at: item.created_at,
        updated_at: item.updated_at,
      })),
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });

  static deleteCartItem = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { product_id } = req.body;

    const item = await Cart.findOneAndDelete({ user: req.user.id, product: product_id });

    if (!item) throw createHttpError(404);

    res.status(204);
    const result = {
      data: item,
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });
}

module.exports = CartController;

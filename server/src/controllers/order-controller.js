const expressAsyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

const Address = require('../models/address');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

class OrderController {
  static placeOrder = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { address_id } = req.body;

    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'product',
        select: 'name price stock images',
      })
      .exec();

    const address = await Address.findById(address_id);

    if (!cart.length) createHttpError(422, 'Your cart is empty');
    if (!address) createHttpError(422, 'Your address is not valid');

    let quantityFail = false;
    let itemsPrice = 0;
    const orderItems = [];
    cart.forEach((item) => {
      if (item.quantity == 0 || item.quantity > item.product.stock) return (quantityFail = true);
      const result = {
        product: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total_price: item.product.price * item.quantity,
        images: item.product.images,
      };
      itemsPrice += result.total_price;
      orderItems.push(result);
    });

    if (quantityFail) throw createHttpError(422);

    // const session = await mongoose.startSession();
    try {
      // session.startTransaction();

      const newOrder = {
        buyer: req.user.id,
        items: orderItems,
        shipment: {
          address: address.id,
          consignee: {
            name: address.name,
            phone: address.phone,
            country: address.detail.country,
            province: address.detail.province,
            city: address.detail.city,
            district: address.detail.district,
            address: address.detail.address,
            postal_code: address.detail.postal_code,
          },
        },
        amount: {
          total: itemsPrice,
          items: itemsPrice,
          shipping: 0,
        },
        payment_type: 'stripe',
      };
      const order = new Order(newOrder);
      await order.save();

      order.items.forEach(async (item) => {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      });

      await Cart.deleteMany({ user: req.user.id });

      // await session.commitTransaction();

      res.status(201);
      const result = {
        data: order,
        meta: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      // await session.abortTransaction();
    } finally {
      // session.endSession();
    }
  });

  static getOrderList = expressAsyncHandler(async (req, res) => {
    const orderList = await Order.find({ buyer: req.user.id })
      .populate({
        path: 'buyer',
        select: 'avatar birthdate sex_type name username',
      })
      .populate({
        path: 'items.images',
        select: 'filepath filename type',
      })
      .populate({
        path: 'items.product',
        select: 'name price stock',
      })
      .populate({
        path: 'shipment.address',
        select: '-__v -created_at -updated_at',
      })

      .exec();

    const result = {
      data: orderList,
      meta: {
        status: res.statusCode,
      },
    };

    return res.json(result);
  });

  static getOrder = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { order_id } = req.params;

    const order = await Order.findById(order_id)
      .populate({
        path: 'buyer',
        select: 'avatar birthdate sex_type name username',
      })
      .populate({
        path: 'items.images',
        select: 'filepath filename type',
      })
      .populate({
        path: 'items.product',
        select: 'name price stock',
      })
      .populate({
        path: 'shipment.address',
        select: '-__v -created_at -updated_at',
      })
      .exec();

    const result = {
      data: order,
      meta: {
        status: res.statusCode,
      },
    };

    return res.json(result);
  });

  static cancelOrder = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { order_id } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(order_id), buyer: req.user.id },
      { status: 'canceled' },
      { new: true },
    );

    if (!order) throw createHttpError(204);

    const result = {
      data: order,
      meta: {
        status: res.statusCode,
      },
    };

    return res.json(result);
  });
}

module.exports = OrderController;

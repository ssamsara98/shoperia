const expressAsyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const Stripe = require('stripe');

// const Address = require('../models/address');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const imgHelper = require('../utils/img-helper');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

class OrderController {
  static placeOrder = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { consignee, courier: carrier, service, shipping_cost } = req.body;

    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'product',
        select: 'name price stock images',
      })
      .exec();

    // const address = await Address.findById(address_id);

    if (!cart.length) throw createHttpError(422, 'Your cart is empty');
    // if (!address) throw createHttpError(422, 'Your address is not valid');

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

    const newOrder = {
      buyer: req.user.id,
      items: orderItems,
      shipment: {
        // address: address.id,
        consignee: {
          name: consignee.name,
          phone: consignee.phone,
          province: consignee.province,
          city: consignee.city,
          district: consignee.district,
          address: consignee.address,
          postal_code: consignee.postal_code,
        },
        courier: {
          carrier,
          service,
          receipt: '',
        },
      },
      amount: {
        total: itemsPrice + (shipping_cost < 0 ? 0 : shipping_cost),
        items: itemsPrice,
        shipping: shipping_cost < 0 ? 0 : shipping_cost,
      },
      payment_type: 'stripe',
    };
    const order = new Order(newOrder);
    await order.save();

    order.items.forEach(async (item) => {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    });

    await Cart.deleteMany({ user: req.user.id });

    res.status(201);
    const result = {
      data: order,
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
    // // const session = await mongoose.startSession();
    // try {
    //   // session.startTransaction();
    //   // await session.commitTransaction();
    // } catch (err) {
    //   // await session.abortTransaction();
    // } finally {
    //   // session.endSession();
    // }
  });

  static getOrderList = expressAsyncHandler(async (req, res) => {
    const orderList = await Order.find({ buyer: req.user.id })
      .sort({ created_at: 'desc' })
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

  static payOrder = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { order_id } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(order_id), buyer: req.user.id },
      { status: 'paid' },
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

  static createStripeSession = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(422, { errors: errors.array() });
    }
    const { order_id } = req.params;

    const order = await Order.findOne({
      _id: mongoose.Types.ObjectId(order_id),
      buyer: req.user.id,
      status: 'pending',
      payment_type: 'stripe',
    }).populate({
      path: 'items.images',
      select: 'filepath filename type',
    });

    if (!order) throw createHttpError(404, 'Order not found');

    const line_items = [
      ...order.items.map((item) => ({
        price_data: {
          currency: 'idr',
          product_data: {
            name: item.name,
            images: [imgHelper(item.images[0])],
          },
          unit_amount: Math.ceil(item.price * 100),
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: 'idr',
          product_data: {
            name: 'Shipping Cost',
          },
          unit_amount: Math.ceil(order.amount.shipping * 100),
        },
        quantity: 1,
      },
    ];

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get(
        'host',
      )}/account/orders?success=true&order_id=${order_id}`,
      cancel_url: `${req.protocol}://${req.get('host')}/account/orders?canceled=true`,
      customer_email: req.user.email,
      client_reference_id: order_id,
      mode: 'payment',
      line_items,
    });

    const result = {
      data: session,
      meta: { status: res.statusCode },
    };

    // return res.redirect(303, session.url);
    return res.json(result);
  });
}

module.exports = OrderController;

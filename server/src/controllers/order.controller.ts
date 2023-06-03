import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import Cart from '../models/cart';
import Order from '../models/order';
import Product from '../models/product';
import imgHelper from '../utils/img.helper';
import { stripe } from '../utils/stripe.helper';
import { OrderIdParamsDto, PlaceOrderReqDto } from '../dtos/order.dto';

class OrderController {
  placeOrder = expressAsyncHandler<any, any, PlaceOrderReqDto>(async (req, res) => {
    const { consignee, courier: carrier, service, shippingCost } = req.body;

    const cart = await Cart.find({ user: req.user.id })
      .populate({
        path: 'product',
        select: 'name price stock images',
      })
      .exec();

    // const address = await Address.findById(addressId);

    if (!cart.length) throw createHttpError(422, 'Your cart is empty');
    // if (!address) throw createHttpError(422, 'Your address is not valid');

    let quantityFail = false;
    let itemsPrice = 0;
    const orderItems: Array<any> = [];
    cart.forEach((item) => {
      if (item.quantity == 0 || item.quantity > (item.product as any).stock)
        return (quantityFail = true);
      const result = {
        product: (item.product as any).id,
        name: (item.product as any).name,
        quantity: item.quantity,
        price: (item.product as any).price,
        totalPrice: (item.product as any).price * item.quantity,
        images: (item.product as any).images,
      };
      itemsPrice += result.totalPrice;
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
          telephone: consignee.telephone,
          province: consignee.province,
          city: consignee.city,
          district: consignee.district,
          address: consignee.address,
          postalCode: consignee.postalCode,
        },
        courier: {
          carrier,
          service,
          receipt: '',
        },
      },
      amount: {
        total: itemsPrice + (shippingCost < 0 ? 0 : shippingCost),
        items: itemsPrice,
        shipping: shippingCost < 0 ? 0 : shippingCost,
      },
      paymentType: 'stripe',
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
    res.json(result);
    // // const session = await mongoose.startSession();
    // try {
    //   // session.startTransaction();
    //   // await session.commitTransaction();
    // } catch (err) {
    //   // await session.abortTransaction();
    // } finally {
    //   // session.endSession();
    // }
    return;
  });

  getOrderList = expressAsyncHandler(async (req, res) => {
    const orderList = await Order.find({ buyer: req.user.id })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'buyer',
        select: 'avatar birthdate sexType name username',
      })
      .populate({
        path: 'items.images',
        select: 'filepath filename type',
      })
      .populate({
        path: 'items.product',
        select: 'name price stock',
      })
      // .populate({
      //   path: 'shipment.address',
      //   select: '-__v -createdAt -updatedAt',
      // })
      .exec();

    const result = {
      data: orderList,
      meta: {
        status: res.statusCode,
      },
    };

    res.json(result);
    return;
  });

  getOrder = expressAsyncHandler<OrderIdParamsDto>(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate({
        path: 'buyer',
        select: 'avatar birthdate sexType name username',
      })
      .populate({
        path: 'items.images',
        select: 'filepath filename type',
      })
      .populate({
        path: 'items.product',
        select: 'name price stock',
      })
      // .populate({
      //   path: 'shipment.address',
      //   select: '-__v -createdAt -updatedAt',
      // })
      .exec();

    const result = {
      data: order,
      meta: {
        status: res.statusCode,
      },
    };

    res.json(result);
    return;
  });

  cancelOrder = expressAsyncHandler<OrderIdParamsDto>(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(orderId), buyer: req.user.id },
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

    res.json(result);
    return;
  });

  payOrder = expressAsyncHandler<OrderIdParamsDto>(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(orderId), buyer: req.user.id },
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

    res.json(result);
    return;
  });

  createStripeSession = expressAsyncHandler<OrderIdParamsDto>(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(orderId),
      buyer: req.user.id,
      status: 'pending',
      paymentType: 'stripe',
    }).populate({
      path: 'items.images',
      select: 'filepath filename type',
    });

    if (!order) throw createHttpError(404, 'Order not found');

    const line_items: Array<Stripe.Checkout.SessionCreateParams.LineItem> = [
      ...order.items.map<Stripe.Checkout.SessionCreateParams.LineItem>((item) => ({
        price_data: {
          currency: 'idr',
          product_data: {
            name: item.name,
            images: [imgHelper(item.images[0] as any)],
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
      )}/account/orders?success=true&orderId=${orderId}`,
      cancel_url: `${req.protocol}://${req.get('host')}/account/orders?canceled=true`,
      customer_email: req.user.email,
      client_reference_id: orderId,
      mode: 'payment',
      line_items,
    });

    const result = {
      data: session,
      meta: { status: res.statusCode },
    };

    // res.redirect(303, session.url);
    res.json(result);
    return;
  });
}

// module.exports = OrderController;
// export default OrderController;
export const orderController = new OrderController();

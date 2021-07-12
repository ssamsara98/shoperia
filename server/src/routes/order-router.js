const express = require('express');
const { body, param } = require('express-validator');

const OrderController = require('../controllers/order-controller');
const authMw = require('../middlewares/auth-mw');

const orderRouter = express.Router();

orderRouter.use(authMw);

orderRouter.post(
  '/place-order',
  [
    body('consignee').isObject(),
    body('consignee.name').isString(),
    body('consignee.phone').isString(),
    body('consignee.province').isString(),
    body('consignee.city').isString(),
    body('consignee.district').isString(),
    body('consignee.address').isString(),
    body('consignee.postal_code').isNumeric(),
    body('courier').isString(),
    body('shipping_cost').isNumeric(),
  ],
  OrderController.placeOrder,
);

orderRouter.get('/get-order-list', OrderController.getOrderList);

orderRouter.get('/get-order/:order_id', param('order_id').isMongoId(), OrderController.getOrder);

orderRouter.patch(
  '/cancel-order/:order_id',
  param('order_id').isMongoId(),
  OrderController.cancelOrder,
);

orderRouter.patch('/pay-order/:order_id', param('order_id').isMongoId(), OrderController.payOrder);

orderRouter.post(
  '/create-stripe-checkout-session/:order_id',
  param('order_id').isMongoId(),
  OrderController.createStripeSession,
);

module.exports = orderRouter;

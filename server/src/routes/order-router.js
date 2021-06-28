const express = require('express');
const { body, param } = require('express-validator');

const OrderController = require('../controllers/order-controller');
const authMw = require('../middlewares/auth-mw');

const orderRouter = express.Router();

orderRouter.use(authMw);

orderRouter.post('/place-order', body('address_id').isMongoId(), OrderController.placeOrder);

orderRouter.get('/get-order-list', OrderController.getOrderList);

orderRouter.get('/get-order/:order_id', param('order_id').isMongoId(), OrderController.getOrder);

orderRouter.patch(
  '/cancel-order/:order_id',
  param('order_id').isMongoId(),
  OrderController.cancelOrder,
);

module.exports = orderRouter;

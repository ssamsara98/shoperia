import { body, param } from 'express-validator';

class OrderValidation {
  placeOrder = [
    body('consignee').isObject(),
    body('consignee.name').isString(),
    body('consignee.telephone').isString(),
    body('consignee.province').isString(),
    body('consignee.city').isString(),
    body('consignee.district').isString(),
    body('consignee.address').isString(),
    body('consignee.postalCode').isNumeric(),
    body('courier').isString(),
    body('shippingCost').isNumeric(),
  ];

  getOrder = [param('orderId').isMongoId()];

  cancelOrder = [param('orderId').isMongoId()];

  payOrder = [param('orderId').isMongoId()];

  createStripeSession = [param('orderId').isMongoId()];
}

export const orderValidation = new OrderValidation();

import e from 'express';
import { orderController } from '../controllers/order.controller';
import { authMw } from '../middlewares/auth.middleware';
import { orderValidation } from '../validations/order.validation';
import { validationMw } from '../middlewares/validation.middleware';

export const orderRouter = e.Router();

orderRouter.use(authMw);

orderRouter.post(
  '/place-order',
  orderValidation.placeOrder,
  validationMw,
  orderController.placeOrder,
);

orderRouter.get('/get-order-list', orderController.getOrderList);

orderRouter.get<'/get-order/:orderId', any>(
  '/get-order/:orderId',
  orderValidation.getOrder,
  validationMw,
  orderController.getOrder,
);

orderRouter.patch<'/cancel-order/:orderId', any>(
  '/cancel-order/:orderId',
  orderValidation.cancelOrder,
  validationMw,
  orderController.cancelOrder,
);

orderRouter.patch<'/pay-order/:orderId', any>(
  '/pay-order/:orderId',
  orderValidation.payOrder,
  validationMw,
  orderController.payOrder,
);

orderRouter.post<'/create-stripe-checkout-session/:orderId', any>(
  '/create-stripe-checkout-session/:orderId',
  orderValidation.createStripeSession,
  validationMw,
  orderController.createStripeSession,
);

// module.exports = orderRouter;
// export default orderRouter;

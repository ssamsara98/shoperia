import e from 'express';
import { cartController } from '../controllers/cart.controller';
import { authMw } from '../middlewares/auth.middleware';
import { cartValidation } from '../validations/cart.validation';
import { validationMw } from '../middlewares/validation.middleware';

export const cartRouter = e.Router();

cartRouter.use(authMw);

cartRouter.post(
  '/add-cart-item',
  cartValidation.addCartItem,
  validationMw,
  cartController.addCartItem,
);

cartRouter.get('/get-cart', cartController.getCart);

cartRouter.delete(
  '/delete-cart-item',
  cartValidation.deleteCartItem,
  validationMw,
  cartController.deleteCartItem,
);

// module.exports = cartRouter;
// export default cartRouter;

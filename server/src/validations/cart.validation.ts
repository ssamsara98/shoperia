import { body } from 'express-validator';

class CartValidation {
  addCartItem = [
    body('productId').isMongoId(),
    body('quantity').optional().isInt(),
    body('modified').optional().isBoolean({ strict: true }),
  ];

  deleteCartItem = [body('productId').isMongoId()];
}

export const cartValidation = new CartValidation();

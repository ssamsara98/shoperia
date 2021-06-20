const express = require('express');
const { body } = require('express-validator');

const CartController = require('../controllers/cart-controller');
const authMw = require('../middlewares/auth-mw');

const cartRouter = express.Router();

cartRouter.use(authMw);

cartRouter.post(
  '/add-cart-item',
  [
    body('product_id').isMongoId(),
    body('quantity').optional().isInt(),
    body('modified').optional().isBoolean({ strict: true }),
  ],
  CartController.addCartItem,
);

cartRouter.get('/get-cart', CartController.getCart);

cartRouter.delete(
  '/delete-cart-item',
  body('product_id').isMongoId(),
  CartController.deleteCartItem,
);

module.exports = cartRouter;

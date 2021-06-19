const express = require('express');
const { body } = require('express-validator');

const CartController = require('../controllers/cart-controller');
const authMw = require('../middlewares/auth-mw');

const cartRouter = express.Router();

cartRouter.use(authMw);
cartRouter.post('/add-to-cart', body('product_id').isMongoId(), CartController.addToCart);
cartRouter.get('/get-cart', body('product_id').isMongoId(), CartController.getCart);
cartRouter.delete('/delete-item', body('product_id').isMongoId(), CartController.deleteItem);

module.exports = cartRouter;

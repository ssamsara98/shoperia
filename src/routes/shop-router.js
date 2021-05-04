const express = require('express');
const { body, param } = require('express-validator');

const ShopController = require('../controllers/shop-controller');
const authMw = require('../middlewares/auth-mw');

const shopRouter = express.Router();

shopRouter.post(
  '/create-shop',
  authMw,
  body('shop_name').notEmpty(),
  body('shop_domain').notEmpty(),
  ShopController.createShop,
);
shopRouter.get('/get-shop', authMw, ShopController.getShop);
shopRouter.get(
  '/get-shop/:shop_domain',
  param('shop_domain').notEmpty().isSlug(),
  ShopController.getShopDomain,
);

module.exports = shopRouter;

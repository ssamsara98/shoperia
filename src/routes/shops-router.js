const express = require('express');
const { body, param } = require('express-validator');

const ShopsController = require('../controllers/shops-controller');
const authMw = require('../middlewares/auth-mw');

const shopsRouter = express.Router();

shopsRouter.post(
  '/create-shop',
  authMw,
  body('shop_name').notEmpty(),
  body('shop_domain').notEmpty(),
  ShopsController.createShop,
);
shopsRouter.get('/show-shop', authMw, ShopsController.showShop);
shopsRouter.get(
  '/show-shop/:shop_domain',
  param('shop_domain').notEmpty().isSlug(),
  ShopsController.showShopDomain,
);

module.exports = shopsRouter;

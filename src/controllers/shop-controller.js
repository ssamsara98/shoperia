const express = require('express');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Shop = require('../models/shop');

class ShopController {
  static async createShop(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { shop_name, shop_domain } = req.body;

      const newShop = new Shop({ owner: req.user._id, name: shop_name, domain: shop_domain });
      await newShop.save();

      res.status(201);
      const result = {
        data: {
          shop: newShop,
        },
        meta: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async getShop(req = express.request, res = express.response, next) {
    try {
      const shop = await Shop.findOne({ owner: req.user._id }).populate({
        path: 'owner',
        select: 'name username',
      });

      const result = {
        data: {
          shop,
        },
        meta: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async getShopDomain(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { shop_domain } = req.params;

      const shop = await Shop.findOne({ domain: shop_domain });

      const result = {
        data: {
          shop,
        },
        meta: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = ShopController;

const express = require('express');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Product = require('../models/product');

class ProductController {
  static async addProduct(req = express.request, res = express.response, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw createHttpError(422, { errors: errors.array() });
      }
      const { name, price, stock, description, condition, image_ids } = req.body;

      const newProduct = new Product({
        name,
        price,
        stock,
        description,
        condition,
        images: image_ids,
      });
      await (await newProduct.save()).execPopulate({ path: 'images', select: 'filename filepath' });

      res.status(201);
      const result = {
        data: {
          product: newProduct,
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

  static async getProduct(req = express.request, res = express.response, next) {
    try {
      const products = await Product.find().populate({
        path: 'images',
        select: 'filename filepath',
      });

      const result = {
        data: {
          products,
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

  static async getProductById(req = express.request, res = express.response, next) {
    try {
      const { product_id } = req.params;
      const product = await Product.findById(product_id).populate({
        path: 'images',
        select: 'filename filepath',
      });

      const result = {
        data: {
          product,
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

  static async updateProduct(req = express.request, res = express.response, next) {
    try {
      const { product_id } = req.params;
      const product = await Product.findByIdAndUpdate(
        product_id,
        {
          ...req.body,
        },
        { new: true },
      );

      const result = {
        data: {
          product,
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

  static async deleteProduct(req = express.request, res = express.response, next) {
    try {
      const { product_id } = req.params;
      const product = await Product.findByIdAndDelete(product_id);

      const result = {
        data: {
          product,
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

module.exports = ProductController;

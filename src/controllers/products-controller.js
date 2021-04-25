const express = require('express');

const Product = require('../models/product');

class ProductsController {
  static async addProduct(req = express.request, res = express.response, next) {
    try {
      const { name, price, stock, description, condition } = req.body;
      const newProduct = new Product({ name, price, stock, description, condition });
      await newProduct.save();

      res.status(201);
      const result = {
        data: {
          product: newProduct,
        },
        metadata: {
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
      const products = await Product.find();

      const result = {
        data: {
          products,
        },
        metadata: {
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
      const { product_id } = req.params;
      const product = await Product.findById(product_id);

      const result = {
        data: {
          product,
        },
        metadata: {
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
      const { name, price, stock, description, condition } = req.body;
      const product = await Product.findByIdAndUpdate(product_id, {
        name,
        price,
        stock,
        description,
        condition,
      });

      const result = {
        data: {
          product,
        },
        metadata: {
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
        metadata: {
          status: res.statusCode,
        },
      };
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = ProductsController;

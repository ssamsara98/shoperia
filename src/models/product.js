const { model } = require('mongoose');

const productSchema = require('./schemes/product-schema');

const Product = model('product', productSchema);

module.exports = Product;

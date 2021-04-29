const mongoose = require('mongoose');

const productImageSchema = require('./schemes/product-image-schema');

const ProductImage = mongoose.model('product_image', productImageSchema);

module.exports = ProductImage;

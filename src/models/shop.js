const mongoose = require('mongoose');

const shopSchema = require('./schemes/shop-schema');

const Shop = mongoose.model('shop', shopSchema);

module.exports = Shop;

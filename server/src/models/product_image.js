const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema(
  {
    uuidv4: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      require: true,
      default: 'shoperia',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const ProductImage = mongoose.model('product_image', productImageSchema, 'product_image');

module.exports = ProductImage;

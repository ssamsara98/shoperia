const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    uuidv4: {
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

const ProductImage = mongoose.model('product_image', productImageSchema);

module.exports = ProductImage;

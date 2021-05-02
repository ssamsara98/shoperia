const { Schema } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'product_image',
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    condition: {
      type: String,
      enum: ['New', 'Used'],
      required: true,
      default: 'New',
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

module.exports = productSchema;

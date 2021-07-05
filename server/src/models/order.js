const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'pending',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total_price: {
          type: Number,
          required: true,
        },
        images: [
          {
            type: mongoose.Types.ObjectId,
            ref: 'product_image',
            required: true,
          },
        ],
      },
    ],
    shipment: {
      // address: {
      //   type: mongoose.Types.ObjectId,
      //   ref: 'address',
      //   required: true,
      // },
      consignee: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          default: null,
        },
        country: {
          type: String,
          default: 'Indonesia',
          required: true,
        },
        province: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        postal_code: {
          type: Number,
          required: true,
        },
      },
      courier: {
        carrier: {
          type: String,
          required: true,
        },
        service: {
          type: String,
          required: true,
        },
        receipt: {
          type: String,
          default: '',
        },
      },
    },
    amount: {
      total: {
        type: Number,
        required: true,
      },
      items: {
        type: Number,
        required: true,
      },
      shipping: {
        type: Number,
        required: true,
      },
    },
    payment_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

const Order = mongoose.model('order', orderSchema, 'order');

module.exports = Order;

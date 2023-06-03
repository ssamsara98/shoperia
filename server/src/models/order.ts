import mongoose from 'mongoose';

// export interface IOrderItem {
//   product: mongoose.Schema.Types.ObjectId;
//   name: string;
//   quantity: string;
//   price: number;
//   totalPrice: number;
//   images: Array<mongoose.Schema.Types.ObjectId>;
// }

// export interface IOrderShipmentConsignee {
//   name: string;
//   telephone: string;
//   country: string;
//   province: string;
//   city: string;
//   district: string;
//   address: string;
//   postalCode: string
// }

// export interface IOrderShipmentCourier {
//   carrier: string;
//   service: string;
//   receipt: string;
// }

// export interface IOrderShipment {
//   consignee: IOrderShipmentConsignee;
//   courier: IOrderShipmentCourier;
// }

// export interface IOrderAmount {
//   total: number;
//   items: number;
//   shipping: number;
// }

// export interface IOrder {
//   status: string;
//   buyer: mongoose.Schema.Types.ObjectId;
//   items: Array<IOrderItem>;
//   shipment: IOrderShipment;
//   amount: IOrderAmount;
//   paymentType: string;
// }

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'pending',
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
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
        totalPrice: {
          type: Number,
          required: true,
        },
        images: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductImage',
            required: true,
          },
        ],
      },
    ],
    shipment: {
      type: {
        // address: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Address',
        //   required: true,
        // },
        consignee: {
          name: {
            type: String,
            required: true,
          },
          telephone: {
            type: String,
            default: null,
          },
          country: {
            type: String,
            default: 'Indonesia',
            required: false,
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
          postalCode: {
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
      required: true,
    },
    amount: {
      type: {
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
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

export type IOrder = mongoose.InferSchemaType<typeof orderSchema>;

const Order = mongoose.model<IOrder>('Order', orderSchema, 'order');

// module.exports = Order;
export default Order;

import mongoose from 'mongoose';

// export interface IProduct {
//   name: string;
//   images: Array<mongoose.Schema.Types.ObjectId>;
//   price: number;
//   stock: number;
//   description: string;
//   condition: string;
//   weight: number
// }

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage',
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
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type IProduct = mongoose.InferSchemaType<typeof productSchema>;

const Product = mongoose.model<IProduct>('Product', productSchema, 'product');

// module.exports = Product;
export default Product;

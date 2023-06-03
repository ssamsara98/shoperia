import mongoose from 'mongoose';

// export interface IProductImage{
//   uuidv4: string;
//   filepath: string;
//   filename: string;
//   type: string;
// }

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
      required: true,
      default: 'shoperia',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type IProductImage = mongoose.InferSchemaType<typeof productImageSchema>;

const ProductImage = mongoose.model<IProductImage>(
  'ProductImage',
  productImageSchema,
  'productImage',
);

// module.exports = ProductImage;
export default ProductImage;

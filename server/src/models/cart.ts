import mongoose from 'mongoose';

// export interface ICart {
//   user: mongoose.Schema.Types.ObjectId;
//   product: mongoose.Schema.Types.ObjectId;
//   quantity: number;
// }

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Product is required'],
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      default: 1,
      validate: {
        validator: (val: number) => {
          return val > 0;
        },
        message: (props: any) => `${props.value} is not a valid`,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type ICart = mongoose.InferSchemaType<typeof cartSchema>;

const Cart = mongoose.model<ICart>('Cart', cartSchema, 'cart');

// module.exports = Cart;
export default Cart;

import mongoose from 'mongoose';

// export interface IAddressDetail {
//   country: string;
//   province: string;
//   city: string;
//   district: string;
//   address: string;
//   postalCode: number;
// }

// export interface IAddress {
//   user: mongoose.Schema.Types.ObjectId;
//   title: string;
//   name: string;
//   telephone: string;
//   primary: boolean;
//   detail: IAddressDetail;
// }

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      default: null,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: {
        country: {
          type: String,
          required: true,
          default: 'Indonesia',
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
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type IAddress = mongoose.InferSchemaType<typeof addressSchema>;

const Address = mongoose.model<IAddress>('Address', addressSchema, 'address');

// module.exports = Address;
export default Address;

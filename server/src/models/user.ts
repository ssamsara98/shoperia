import mongoose from 'mongoose';
import validator from 'validator';
import { comparePassword, hashPassword } from '../utils/bcrypt.helper';

// export interface IUser {
//   name: string;
//   email: string;
//   username: string;
//   password: string;
//   admin: boolean;
//   avatar: string;
//   birthdate: mongoose.Schema.Types.Date;
//   sexType: string;
// }

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: 'img/avatar/default.webp',
    },
    birthdate: {
      type: mongoose.Schema.Types.Date,
      default: null,
    },
    sexType: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type IUser = mongoose.InferSchemaType<typeof userSchema>;

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await hashPassword(this.password);

  next();
});

userSchema.methods.correctPassword = async function (password: string) {
  return await comparePassword(password, this.password);
};

const User = mongoose.model<IUser>('User', userSchema, 'user');

// module.exports = User;
export default User;

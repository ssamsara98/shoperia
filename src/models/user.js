const mongoose = require('mongoose');

const { hashPassword, comparePassword } = require('../utils/bcrypt-helper');

const { default: validator } = require('validator');

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
    birthdate: {
      type: mongoose.Schema.Types.Date,
      default: null,
    },
    sex_type: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    avatar: {
      type: String,
      default: 'img/avatar/default.webp',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  },
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await hashPassword(this.password);

  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await comparePassword(password, this.password);
};

// virtual populate
userSchema.virtual('shop', {
  ref: 'shop',
  foreignField: 'owner',
  localField: '_id',
  justOne: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;

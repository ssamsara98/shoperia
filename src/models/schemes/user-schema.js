const { Schema } = require('mongoose');
const { default: validator } = require('validator');

const userSchema = new Schema(
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
      type: Schema.Types.Date,
      default: null,
    },
    sex_type: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
      default: 'Unknown',
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

module.exports = userSchema;

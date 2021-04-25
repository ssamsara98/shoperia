const mongoose = require('mongoose');

const { hashPassword, comparePassword } = require('../utils/bcrypt-helper');
const userSchema = require('./schemes/user-schema');

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

const User = mongoose.model('user', userSchema);

module.exports = User;

const { Schema } = require('mongoose');

const shopSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'user',
    },
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
      validate: (val) => {
        const isMatch = /^[a-zA-Z0-9_.-]*$/.test(val);
        return isMatch;
      },
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

module.exports = shopSchema;

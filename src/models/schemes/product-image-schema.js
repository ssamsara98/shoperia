const { Schema } = require('mongoose');

const productImageSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    uuidv4: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      require: true,
      default: 'shoperia',
    },
  },
  {
    id: true,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = productImageSchema;

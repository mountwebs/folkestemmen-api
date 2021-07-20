const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagModelSchema = new Schema(
  {
    name: { type: String, required: true },
    color: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tag', tagModelSchema);

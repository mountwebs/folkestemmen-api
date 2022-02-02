const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeModelSchema = new Schema(
  {
    answerId: { type: String, required: true },
    users: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Like', likeModelSchema);

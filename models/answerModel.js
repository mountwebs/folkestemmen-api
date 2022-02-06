const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerModelSchema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    tags: String,
    numOfLikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerModelSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerModelSchema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true, select: false },
    tags: String,
    numOfLikes: { type: Number, default: 0 },
    age: { type: Number, select: false },
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerModelSchema);

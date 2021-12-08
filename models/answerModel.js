const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerModelSchema = new Schema(
  {
    text: { type: String, required: true },
    user: String,
    tags: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerModelSchema);

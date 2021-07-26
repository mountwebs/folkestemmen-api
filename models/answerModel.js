const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerModelSchema = new Schema(
  {
    text: { type: String, required: true },
    user: String,
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerModelSchema);

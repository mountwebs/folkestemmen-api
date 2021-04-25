const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerModelSchema = new Schema({
  text: { type: String, required: true },
  user: String,
  tag: String,
});

module.exports = mongoose.model('Answer', answerModelSchema);

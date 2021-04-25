const answerModel = require('../models/answerModel');

module.exports.getAllAnswers = async () => {
  const answers = await answerModel.find();
  return answers;
};

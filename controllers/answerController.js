const answerModel = require('../models/answerModel');

module.exports = {
  getAllAnswers: async () => {
    const answers = await answerModel.find();
    return answers;
  },

  postAnswer: async (data) => {
    console.log(data);
    const newAnswer = new answerModel(data);
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  },
};

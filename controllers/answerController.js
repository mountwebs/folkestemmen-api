const answerModel = require('../models/answerModel');

module.exports = {
  getAllAnswers: async () => {
    const answers = await answerModel
      .find()
      .populate('tags')
      .sort({ createdAt: -1 })
      .exec();
    return answers;
  },

  postAnswer: async (data) => {
    console.log(data);
    const newAnswer = new answerModel(data);
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  },
};

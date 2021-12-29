const answerModel = require('../models/answerModel');

module.exports = {
  getAllAnswers: async () => {
    const answers = await answerModel.find().sort({ createdAt: -1 });
    return answers;
  },

  postAnswer: async (data) => {
    console.log(data);
    const newAnswer = new answerModel(data);
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  },

  updateAnswer: async (id, data) => {
    const newAnswer = await answerModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
    return newAnswer;
    // const newAnswer = new answerModel(data);
    // const savedAnswer = await newAnswer.save();
    // return savedAnswer;
  },
};

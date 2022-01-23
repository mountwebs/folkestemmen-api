const answerModel = require('../models/answerModel');

module.exports = {
  getAllAnswers: async (sort) => {
    const answers =
      sort === 'likes'
        ? await answerModel.find().sort({ numOfLikes: -1, createdAt: -1 })
        : await answerModel.find().sort({ createdAt: -1 });
    return answers;
  },

  postAnswer: async (data) => {
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

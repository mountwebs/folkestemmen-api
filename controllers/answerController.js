const answerModel = require('../models/answerModel');

module.exports = {
  getAllAnswers: async (req, res, next) => {
    try {
      const answers =
        req.query.sort === 'likes'
          ? await answerModel.find().sort({ numOfLikes: -1, createdAt: -1 })
          : await answerModel.find().sort({ createdAt: -1 });
      res.json(answers).status(200).end();
    } catch (error) {
      next(error);
    }
  },

  postAnswer: async (req, res, next) => {
    try {
      const newAnswer = new answerModel(req.body);
      const savedAnswer = await newAnswer.save();
      res.status(201).send(JSON.stringify(savedAnswer));
    } catch (error) {
      next(error);
    }
  },

  updateAnswer: async (req, res, next) => {
    try {
      const newAnswer = await answerModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).send(JSON.stringify(newAnswer));
    } catch (error) {
      next(error);
    }
  },
};

const answerModel = require('../models/answerModel');
const likeModel = require('../models/likeModel');

module.exports = {
  updateLike: async (req, res, next) => {
    try {
      if (!req.headers.userid) return res.status(403).end();
      const newLike = await likeModel.findOneAndUpdate(
        { answerId: req.params.postId },
        {
          $addToSet: {
            users: req.headers.userid,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      console.log({ newLike });
      incrementOrDecrement = newLike ? 1 : -1;
      const newAnswer = await answerModel.findByIdAndUpdate(
        req.params.postId,
        {
          $inc: { numOfLikes: incrementOrDecrement },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(400).end();
    } catch (error) {
      next(error);
    }
  },
};

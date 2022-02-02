const answerModel = require('../models/answerModel');
const likeModel = require('../models/likeModel');

module.exports = {
  updateLike: async (req, res, next) => {
    try {
      if (!req.headers.userid) return res.status(403).end();

      let numOfLikeChange = 0;
      let updatedLike = null;
      let likeDoc = await likeModel.findOne({ answerId: req.params.postId });

      if (!likeDoc) {
        const newLike = new likeModel({ answerId: req.params.postId });
        likeDoc = await newLike.save();
      }

      if (!likeDoc.users.includes(req.headers.userid)) {
        updatedLike = await likeModel.findOneAndUpdate(
          { answerId: req.params.postId },
          {
            $push: {
              users: req.headers.userid,
            },
          },
          {
            useFindAndModify: false,
            new: true,
          }
        );
        numOfLikeChange = 1;
      } else {
        updatedLike = await likeModel.findOneAndUpdate(
          { answerId: req.params.postId },
          {
            $pullAll: {
              users: [req.headers.userid],
            },
          },
          {
            useFindAndModify: false,
            new: true,
          }
        );
        numOfLikeChange = -1;
      }

      if (!updatedLike) {
        return res.status(404).end();
      }

      const newAnswer = await answerModel.findByIdAndUpdate(
        req.params.postId,
        {
          $set: { numOfLikes: updatedLike.users.length },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      if (!newAnswer) {
        return res.status(404).end();
      }
      res.status(200).json(numOfLikeChange);
    } catch (error) {
      next(error);
    }
  },
};

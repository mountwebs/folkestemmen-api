const jwt = require('jsonwebtoken');

const answerModel = require('../models/answerModel');
const likeModel = require('../models/likeModel');

require('dotenv').config();

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
      if (!req.body.userId) return res.status(403).end();
      const newAnswer = new answerModel({
        text: req.body.text,
        tags: req.body.tags,
        userId: req.body.userId,
      });
      const savedAnswer = await newAnswer.save();
      const newLike = new likeModel({ answerId: savedAnswer._id });
      const savedLike = await newLike.save();
      res.status(201).send(JSON.stringify(savedAnswer));
    } catch (error) {
      next(error);
    }
  },

  updateAnswer: async (req, res, next) => {
    console.log(req.body);

    if (!req.body.text || (!req.body.tags && req.body.tags !== '')) {
      console.log('forbidden?');
      return res.status(403).end();
    }

    try {
      const newAnswer = await answerModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { text: req.body.text, tags: req.body.tags },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      delete newAnswer.userId;
      res.status(200).end(JSON.stringify(newAnswer));
    } catch (error) {
      next(error);
    }
  },

  deleteAnswer: async (req, res, next) => {
    try {
      const result = await answerModel.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(204).end();
      }
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },

  authorizePostUser: async (req, res, next) => {
    const authHeader = req.headers.token;
    const userId = req.headers.userid;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) {
          return res.status(403).json('Token is not valid');
        }
        if (user.isAdmin) {
          next();
        } else {
          return res.status(403).json('not allowed');
        }
      });
    } else if (userId) {
      try {
        const result = await answerModel
          .findById(req.params.id)
          .select('+userId');
        if (!result) return res.status(204).end();

        if (req.headers.userid !== result.userId) return res.status(403).end();
        next();
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(403).end();
    }
  },
};

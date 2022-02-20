const jwt = require('jsonwebtoken');

const answerModel = require('../models/answerModel');
const likeModel = require('../models/likeModel');
const bleeps = require('../utils/bleeps');

require('dotenv').config();

module.exports = {
  getAnswers: async (req, res, next) => {
    const sort =
      req.query.sort && req.query.sort === 'likes'
        ? { numOfLikes: -1, createdAt: -1 }
        : { createdAt: -1 };
    const skip =
      req.query.skip && /^\d+$/.test(req.query.skip)
        ? Number(req.query.skip)
        : 0;
    const limit =
      req.query.limit && /^\d+$/.test(req.query.limit)
        ? Number(req.query.limit)
        : 25;
    try {
      const answers = await answerModel
        .find()
        .limit(limit)
        .skip(skip)
        .sort(sort);
      res.json(answers).status(200).end();
    } catch (error) {
      next(error);
    }
  },

  postAnswer: async (req, res, next) => {
    try {
      if (!req.body.userId) return res.status(403).end();
      // Check if user has more than two answers
      const answersByUser = await answerModel
        .find({ userId: req.body.userId })
        .count();
      if (answersByUser >= 2)
        return res.status(403).json('Too many answers for user');
      let improvedText = req.body.text;
      let improvedTags = req.body.tags;
      bleeps.forEach((word) => {
        const regEx = new RegExp(`${word}`, 'gi');
        improvedText = improvedText.replace(regEx, '🍆');
        improvedTags = improvedTags.replace(regEx, '🍆');
      });
      const newAnswer = new answerModel({
        text: improvedText,
        tags: improvedTags,
        userId: req.body.userId,
        age: req.body.age,
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
    if (!req.body.text || (!req.body.tags && req.body.tags !== '')) {
      console.log('forbidden?');
      return res.status(403).end();
    }

    try {
      const newAnswer = await answerModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { text: req.body.text, tags: req.body.tags, edited: true },
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
      console.log('test');

      return res.status(403).end();
    }
  },
};

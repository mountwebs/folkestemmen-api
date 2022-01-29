const express = require('express');
const router = express.Router();
const authorize = require('./../utils/authorize');

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAllAnswers);

router.post('/', answerController.postAnswer);

router.put('/:id', answerController.updateAnswer);

router.delete(
  '/:id',
  answerController.authorizePostUser,
  answerController.deleteAnswer
);

module.exports = router;

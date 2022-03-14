const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAnswers);

router.get(
  '/all',
  answerController.authorizePostUser,
  answerController.getAllAnswers
);

router.post('/', answerController.postAnswer);

router.patch(
  '/:id',
  answerController.authorizePostUser,
  answerController.updateAnswer
);

router.delete(
  '/:id',
  answerController.authorizePostUser,
  answerController.deleteAnswer
);

module.exports = router;

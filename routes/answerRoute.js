const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAllAnswers);

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

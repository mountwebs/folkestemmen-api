const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAllAnswers);

router.post('/', answerController.postAnswer);

router.put('/:id', answerController.updateAnswer);

router.delete('/:id', answerController.deleteAnswer);

module.exports = router;

const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAllAnswers);

router.post('/', answerController.postAnswer);

router.put('/:id', answerController.updateAnswer);

module.exports = router;

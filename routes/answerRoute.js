const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', async (req, res) => {
  const answerData = await answerController.getAllAnswers();
  res.json(answerData).status(200).end();
});

module.exports = router;

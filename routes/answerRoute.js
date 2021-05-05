const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', async (req, res) => {
  const answerData = await answerController.getAllAnswers();
  res.json(answerData).status(200).end();
});

router.post('/', async (req, res) => {
  const postedAnswer = await answerController.postAnswer(req.body);
  res.status(201).send(JSON.stringify(postedAnswer));
});

module.exports = router;

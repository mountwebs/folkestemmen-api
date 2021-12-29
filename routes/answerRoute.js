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

router.put('/:id', async (req, res) => {
  const newAnswer = await answerController.updateAnswer(
    req.params.id,
    req.body
  );
  res.status(200).send(JSON.stringify(newAnswer));
});

module.exports = router;

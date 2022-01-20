const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', async (req, res, next) => {
  try {
    const answerData = await answerController.getAllAnswers();
    res.json(answerData).status(200).end();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const postedAnswer = await answerController.postAnswer(req.body);
    res.status(201).send(JSON.stringify(postedAnswer));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newAnswer = await answerController.updateAnswer(
      req.params.id,
      req.body
    );
    res.status(200).send(JSON.stringify(newAnswer));
  } catch (error) {
    next(error);
  }
});

module.exports = router;

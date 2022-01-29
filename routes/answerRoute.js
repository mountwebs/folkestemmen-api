const express = require('express');
const router = express.Router();

const answerController = require('../controllers/answerController.js');

router.get('/', answerController.getAllAnswers);

router.post('/', answerController.postAnswer);

router.put('/:id', answerController.updateAnswer);

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await answerController.deleteAnswer(req.params.id);
    if (!deleted) {
      return res.status(204);
    }
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

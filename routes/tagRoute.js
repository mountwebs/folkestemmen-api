const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/', async (req, res) => {
  const tagData = await tagController.getAllTags();
  res.json(tagData).status(200).end();
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tagData = await tagController.getTag(id);
  res.json(tagData).status(200).end();
});

router.post('/', async (req, res) => {
  const postedTag = await tagController.postTag(req.body);
  res.send(JSON.stringify(postedTag)).status(201).end();
});

module.exports = router;

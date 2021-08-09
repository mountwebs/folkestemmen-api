const express = require('express');
const router = express.Router();

const { errorHandler } = require('../utils/errorHandler');
const tagController = require('../controllers/tagController');

router.get(
  '/',
  errorHandler(async (req, res) => {
    const tagData = await tagController.getAllTags();
    res.json(tagData).status(200).end();
  })
);

router.get(
  '/:id',
  errorHandler(async (req, res) => {
    const { id } = req.params;
    const tagData = await tagController.getTag(id);
    res.json(tagData).status(200).end();
  })
);

router.post(
  '/',
  errorHandler(async (req, res) => {
    const postedTag = await tagController.postTag(req.body);
    res.send(JSON.stringify(postedTag)).status(201).end();
  })
);

module.exports = router;

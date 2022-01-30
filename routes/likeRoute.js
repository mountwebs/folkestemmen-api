const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController.js');

router.patch('/:postId', likeController.updateLike);

module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllMemories, createMemory, likeDislikeMemory, currentUser } = require('../controllers/memoryItems');
const { authenticate } = require('../middleware/protect');

router.route('/')
    .get(authenticate, getAllMemories)
    .post(authenticate, upload.single('file'), createMemory);

router.route('/like/:id')
    .post(authenticate, likeDislikeMemory);

router.route('/current')
    .get(authenticate, currentUser);

module.exports = router;

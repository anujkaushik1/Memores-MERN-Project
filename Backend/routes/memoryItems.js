const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllMemories, createMemory, likeDislikeMemory, currentUser, deleteMemory, updateMemoryData } = require('../controllers/memoryItems');
const { authenticate } = require('../middleware/protect');

router.route('/')
    .get(authenticate, getAllMemories)
    .post(authenticate, upload.single('file'), createMemory)
    .put(authenticate, upload.single('file'), updateMemoryData);

router.route('/:id')
    .delete(authenticate, deleteMemory);

router.route('/like/:id')
    .post(authenticate, likeDislikeMemory);

router.route('/current')
    .get(authenticate, currentUser);

module.exports = router;

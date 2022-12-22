const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllMemories, createMemory, likeMemory } = require('../controllers/memoryItems');
const { authenticate } = require('../middleware/protect');

router.route('/')
    .get(authenticate, getAllMemories)
    .post(authenticate, upload.single('file'), createMemory);

router.route('/like/:id')
    .post(authenticate, likeMemory);


module.exports = router;

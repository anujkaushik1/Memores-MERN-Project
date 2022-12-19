const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getAllMemories, createMemory } = require('../controllers/memoryItems');
const { authenticate } = require('../middleware/protect');

router.route('/')
    .get(authenticate, getAllMemories)
    .post(upload.single('file'), createMemory);


module.exports = router;

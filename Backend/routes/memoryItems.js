const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {getAllMemories, createMemory} = require('../controllers/memoryItems');

router.route('/')
    .get(getAllMemories)
    .post(createMemory);


module.exports = router;

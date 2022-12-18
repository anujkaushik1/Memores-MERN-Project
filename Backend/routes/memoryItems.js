const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {getAllMemories, createMemory} = require('../controllers/memoryItems');

router.route('/')
    .get(getAllMemories)
    .post(upload.single('file'), createMemory);


module.exports = router;

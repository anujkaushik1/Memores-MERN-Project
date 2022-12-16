const express = require('express');
const router = express.Router();

const {getAllTest} = require('../controllers/memoryItems');

// router.route('/').get(getAllMemories);
router.route('/test').get(getAllTest);

module.exports = router;

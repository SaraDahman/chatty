const express = require('express');
const { messageController } = require('../controllers');

const router = express.Router();

router.post('/', messageController.createMessage);
router.get('/', messageController.getMessages);

module.exports = router;
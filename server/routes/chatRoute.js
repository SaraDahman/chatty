const express = require('express');
const { chatController } = require('../controllers')

const router = express.Router();


router.post('/', chatController.createChat)
router.get('/find', chatController.findChat)
router.get('/find/:userId', chatController.findUserChats)

module.exports = router;


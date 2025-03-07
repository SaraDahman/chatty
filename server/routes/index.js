const express = require('express');
const userRoute = require('./userRoute');
const chatRoute = require('./chatRoute');
const messageRoute = require('./messageRoute');

const router = express.Router();

router.use('/users', userRoute);
router.use('/chat', chatRoute);
router.use('/message', messageRoute);

module.exports = router;
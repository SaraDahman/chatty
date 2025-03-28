const express = require('express');
const userRoute = require('./userRoute');
const chatRoute = require('./chatRoute');
const messageRoute = require('./messageRoute');
const googleAuthRoute = require('./googleAuth');

const router = express.Router();

router.use('/users', userRoute);
router.use('/chat', chatRoute);
router.use('/message', messageRoute);
router.use('/auth', googleAuthRoute);

module.exports = router;
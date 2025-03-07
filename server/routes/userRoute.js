const express = require('express');
const { userController } = require('../controllers')

const router = express.Router();


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/', userController.getUsers)
router.get('/potential', userController.getPotentialUsers)
router.get('/find/:userId', userController.findUser)

module.exports = router;
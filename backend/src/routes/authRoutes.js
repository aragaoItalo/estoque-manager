const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//SIGNUP
router.post('/signup', authController.signup);

//SIGNIN
router.post('/signin', authController.signin);

module.exports = router;
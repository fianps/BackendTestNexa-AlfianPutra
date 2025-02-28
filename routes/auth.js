const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/token', authController.generateToken);
router.post('/login', authController.login);

module.exports = router;

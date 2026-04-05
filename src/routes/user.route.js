const express = require('express');
const multer = require('multer');
const { signup, login } = require('../controllers/user.controller.js');

const  router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
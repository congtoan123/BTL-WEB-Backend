const express = require('express');
const router = express.Router();

const LoginController = require('../controller/LoginController');

router.post('/login', LoginController.Signin);
router.post('/register',LoginController.Signup);


module.exports = router;
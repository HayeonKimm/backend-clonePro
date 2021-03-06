const dotenv = require('dotenv');

dotenv.config();
const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

//회원가입 - 개인
router.post('/users/signup', userController.signup);

//회원가입 - 기업
router.post('/users/companies/signup', userController.companysignup);

//로그인
router.post('/users/login', userController.login);

module.exports = router;

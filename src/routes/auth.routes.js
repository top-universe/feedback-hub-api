const { Router } = require('express');
const auth = Router();
const {
  validate,
  registerValidationRules,
  loginValidationRules,
} = require('../utils/validation/auth.validation');
const {
  registerUser,
  verifyMail,
  login
} = require('../controller/user.controller');


auth.post('/signup', registerValidationRules(), validate, registerUser);
auth.get('/verify/:link', verifyMail);

auth.post('/login', loginValidationRules(), validate, login);

module.exports = { auth };

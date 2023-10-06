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
  login,refreshUserToken
} = require('../controller/user.controller');

const {logout} = require('../controller/logoutcontroller');
const {verify} = require("../middlewares/auth.middleware");

auth.post('/signup', registerValidationRules(), validate, registerUser);
auth.get('/verify/:link', verifyMail);

auth.post('/login', loginValidationRules(), validate, login);
auth.post('/logout', logout);
auth.post("/refresh-token", verify, refreshUserToken);

module.exports = { auth };

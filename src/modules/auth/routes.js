const authRouter = require("express").Router();
const { authController } = require("./controller");

// This route handles user registration
authRouter.post("/register", authController.CreateUser);

// This route handles email verification
authRouter.put("/verify/:token", authController.VerifyEmail);

// This route handles user sign in
authRouter.post("/signin", authController.SignIn);

// This route initiate user password-reset
authRouter.post("/password-reset", authController.IntiatePasswordReset);

// This route handles user password-reset
authRouter.post("/password-reset/:token", authController.PasswordReset);

module.exports = authRouter;

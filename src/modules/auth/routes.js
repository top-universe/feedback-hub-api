const authRouter = require("express").Router();
const { authController } = require("./controller");

// This route handles user registration
authRouter.post("/register", authController.CreateUser);

// This route handles email verification
authRouter.get("/verify/:token", authController.VerifyEmail);

// This route handles user sign in
authRouter.post("/signin", authController.SignIn);

// This route handles user password-reset initiatiation - by collecting the user email
authRouter.post("/password-reset/request", authController.IntiatePasswordReset);

// This route handles user password-reset token verification and renders/redirect user to password reset page
authRouter.get(
  "/password-reset/:token",
  authController.VerifyPasswordResetToken
);

//This route handles user password reset
authRouter.post("/password-reset", authController.PasswordReset);

module.exports = authRouter;

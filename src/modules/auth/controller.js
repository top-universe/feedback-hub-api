const { userSchema } = require("../../helpers/dataValidators");
const { hashPassword } = require("../../helpers/passHandler");
const { AuthRespository } = require("./repository");
const {
  EMAIL_VERIFICATION,
  EMAIL_VERIFICATION_STATUS,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
} = require("../../services/EmailService/constants");
const { sendEmailHandler } = require("../../services/EmailService/mailer");
const { generateJWT, verifyJWT } = require("../../helpers/jwtHandler");

exports.authController = {
  /**
   * This controller function handles user registration
   * @typedef {Function} - user registration function
   * @param {Object} - User registration details
   */
  CreateUser: async (req, res) => {
    const userData = req.body;

    try {
      // validate incomming data
      const { error, value } = userSchema.validate(userData);
      if (error) {
        return Response.error(res, error.details[0].message, 400);
      }

      // check if email already exist
      const isExistingUser = await AuthRespository.isUser(value.email);
      if (isExistingUser) {
        return Response.error(res, "Email is already in Use", 400);
      }

      // Hash the password before storing it in the database
      const hashPass = await hashPassword(value.password);

      // Create a new user record
      const userInfo = {
        username: value.username,
        email: value.email,
        password: hashPass,
      };
      const user = await AuthRespository.createUser(userInfo);

      // Generate token and link
      const token = generateJWT({ id: user.id, username: user.username }, 3600);

      const link = process.env.FE_URL + `verify/${token}`;
      // log(link);

      // Send verification email
      await sendEmailHandler(
        user.email,
        "Email Verification",
        await EMAIL_VERIFICATION(link)
      );

      return Response.success(
        res,
        "Registration successfully, proceed to email verification"
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Registration failed" });
    }
  },

  /**
   * This function handles user email verification
   * @typedef {Function} - Email verification
   * @param {String} - collects token: string as parameter and update status of account
   */
  VerifyEmail: async (req, res) => {
    const { token } = req.params;

    try {
      // check if token is valid
      const { id } = verifyJWT(token);

      // update status
      const updatedStatus = await AuthRespository.updateVerifiedStatus(id);

      // Send email to inform user of his status
      // log(updatedStatus);
      await sendEmailHandler(
        updatedStatus.email,
        "Email Verification Status",
        await EMAIL_VERIFICATION_STATUS(updatedStatus.username)
      );

      // Response
      if (!updatedStatus) throw Error("Token has expired");

      return Response.success(res, "Account verified successfully!");
    } catch (error) {
      log(error);
      return Response.error(res, "Error verifying user", 500);
    }
  },

  /**
   * This controller function handles user sign-in
   * @typedef {Function} - User sign function
   * @param {Object} - User sign in details
   */

  SignIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Authenticate the user based on email and password
      const user = await AuthRespository.authenticateUser(email, password);

      if (!user) {
        return Response.error(
          res,
          "Authentication failed. Incorrect credentials.",
          401
        );
      }

      // If authentication succeeds, issue JWT tokens
      const accessToken = generateJWT(
        { id: user.id, username: user.username },
        3600
      );

      // Return the access token to the client
      return Response.success(
        res,
        "Login successful",
        {
          accessToken,
        },
        200
      );
    } catch (error) {
      return Response.error(res, error.message, 401);
    }
  },

  /**
   *This controller function collects user email and a password reset link
   * @typedef {Function} - initiate password-reset
   * @param {String} - user email
   */
  IntiatePasswordReset: async (req, res) => {
    try {
      const { email } = req.body;

      // Verify if user exists
      const user = await AuthRespository.isUser(email);
      if (!user) {
        return Response.error(res, "User not found", 404);
      }

      // if user exits - generate token and link to send as email
      const token = generateJWT({ id: user.id, email: user.email }, 3600);
      const link = `${process.env.FE_URL}/password-reset/${token}`;

      await sendEmailHandler(
        user.email,
        "Password Reset",
        await PASSWORD_RESET(link)
      );

      // save token in the database

      return Response.success(
        res,
        "Check your email to complete your password reset."
      );
    } catch (error) {
      return Response.error(res, error.message, 401);
    }
  },

  /**
   * Verify a password reset token and redirect to the password reset page.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @throws {Error} If the token is invalid.
   */
  VerifyPasswordResetToken: async (req, res) => {
    try {
      const { token } = req.params;
      // Validate the token and check if it's still valid
      const { id } = await verifyJWT(token);
      if (!id) {
        throw new Error("Invalid Token");
      }
      const frontendResetPageUrl = `${process.env.FE_URL}/reset-password?token=${token}`;
      return res.redirect(frontendResetPageUrl);
    } catch (error) {
      return Response.error(res, error.message, 401);
    }
  },

  /**
   * This controller function handles password-reset operations
   * @typedef {Function} - handles password-reset
   * @param {Objest} - new password
   */
  PasswordReset: async (req, res) => {
    try {
      const { token, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return Response.error(res, "Passwords doesn't match!", 400);
      }

      // Validate the JWT token
      const { id } = await verifyJWT(token);

      // check if user exists
      const isUser = await AuthRespository.isUser(id);
      if (!isUser) {
        throw new Error(`Invalid User!`);
      }

      // Hashpassword
      const pass = await hashPassword(newPassword);

      // Update User password and set the token to null
      const updatedUser = await AuthRespository.updateUser(id, {
        pass,
        token: null,
      });

      // Send password reset success email
      await sendEmailHandler(
        updatedUser.email,
        "Password Reset Successful",
        await PASSWORD_RESET_SUCCESS(updatedUser.username)
      );

      return Response.success(res, "Password successfully changed");
    } catch (error) {
      return Response.error(res, error.message, 500);
    }
  },
};

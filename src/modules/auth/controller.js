const { userSchema } = require("../../helpers/dataValidators");
const { hashPassword } = require("../../helpers/passHandler");
const { AuthRespository } = require("./repository");

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
      const user = { value, hashPass };

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
  VerifyEmail: async (req, res) => {},

  /**
   * This controller function handles user sign-in
   * @typedef {Function} - User sign function
   * @param {Object} - User sign in details
   */
  SignIn: async (req, res) => {},

  /**
   *This controller function collects user email and a password reset link
   * @typedef {Function} - initiate password-reset
   * @param {String} - user email
   */
  IntiatePasswordReset: async (req, res) => {},

  /**
   * This controller function handles password-reset operations
   * @typedef {Function} - handles password-reset
   * @param {Objest} - new password
   */
  PasswordReset: async (req, res) => {},
};

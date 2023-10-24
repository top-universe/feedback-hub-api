exports.authController = {
  /**
   * This controller function handles user registration
   * @typedef {Function} - user registration function
   * @param {Object} - User registration details
   */
  CreateUser: async (req, res) => {
    res.status(200).json("Hello World!");
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

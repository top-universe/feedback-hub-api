const { body, check, validationResult, query } = require("express-validator");
const { response } = require("../../utils/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const resultErrors = [];
  errors.array().map((err) => resultErrors.push({ [err.param]: err.msg }));

  const errorObject = Object.assign({}, ...resultErrors);
  return res.status(422).json(
    response({
      success: false,
      message: "Action unsuccessful",
      error: "Validation failed",
      data: errorObject,
    })
  );
};
/**
 * It checks if the payload contains only the fields that are allowed
 * @param payload - the data you want to check
 * @param fields - an array of allowed fields
 * @returns true
 */
const checkAllowedFields = (payload, fields) => {
  payload = Array.isArray(payload) ? payload : [payload];

  payload.forEach((item) => {
    const allowed = Object.keys(item).every((field) => fields.includes(field));
    fields = typeof fields === "string" ? fields : fields.join(", ");

    if (!allowed) {
      throw new Error(`Wrong fields passed. Allowed fields: ${fields}`);
    }
  });

  return true;
};

const registerValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    check("firstName")
      .trim()
      .notEmpty()
      .withMessage("first name can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("First name  must be between 1 and 20 characters"),
    check("lastName")
      .trim()
      .notEmpty()
      .withMessage("last name can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("Last name  must be between 1 and 20 characters"),
    check("username")
      .trim()
      .notEmpty()
      .withMessage("username can not be empty")
      .isLength({ min: 1, max: 20 })
      .withMessage("username  must be between 1 and 20 characters"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
    check("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
  ];
};

const loginValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password can not be empty")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password must be between 6 and 16 characters"),
  ];
};

const emailValidationRules = () => {
  return [
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("please enter a valid email"),
  ];
};

module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules
};

const { v4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { environment } = require("../../config/environment");
const { JWT_SECRET } = environment;

let schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => v4(),
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
      maxlength: 1023,
    },
    username: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password
schema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  return (this.password =
    this.password !== null ? bcrypt.hash(this.password, salt) : null);
});

exports.generateHash = async (reqPassword) => {
  console.log("hashedPassword");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqPassword, salt);
    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error generating hash:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

// comparing the password
schema.methods.comparePassword = async function (reqPassword) {
  const correctPassword = await bcrypt.compare(reqPassword, this.password);
  return correctPassword;
};

/**
 * Signup and login schema
 * The return value is a Joi object in all cases.
 *
 *
 */

// jwt auth token
schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

exports.authValidatorSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "xyz", "io", "co", "org"] },
    })
    .lowercase()
    .required(),
  password: Joi.string().min(5).required(),
});

const userCollection = mongoose.model("user", schema);

module.exports = { userCollection };

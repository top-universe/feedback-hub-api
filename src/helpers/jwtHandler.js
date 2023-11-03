const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
/**
 * Generates a JSON Web Token (JWT) and returns it.
 *
 * @param {Object} payload - The data to be included in the token.
 * @param {string} secret - The secret key for signing the token.
 * @param {string} expiresIn - The token's expiration time (e.g., '1h' for 1 hour, '7d' for 7 days).
 * @returns {string} The generated JWT.
 */
function generateJWT(payload, expiresIn) {
  try {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    throw new Error("Failed to generate JWT: " + error.message);
  }
}

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded payload.
 *
 * @param {string} token - The JWT to be verified.
 * @param {string} secret - The secret key for verifying the token.
 * @returns {Object} The decoded payload if the token is valid, or null if it's invalid.
 */
function verifyJWT(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    log(error.message);
    // If the token is invalid, jwt.verify will throw an error, and we catch it here.
    throw new Error("Token verification failed.");
  }
}
module.exports = { generateJWT, verifyJWT };

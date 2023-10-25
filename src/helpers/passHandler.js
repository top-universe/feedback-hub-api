const argon2 = require("argon2");

/**
 * Hash a password using the Argon2 algorithm.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 * @throws {Error} If an error occurs during hashing.
 */

async function hashPassword(password) {
  try {
    // Generate a secure password hash
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

/**
 * Verify an entered password against a stored hashed password.
 * @param {string} hashedPassword - The stored hashed password.
 * @param {string} inputPassword - The entered password to verify.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the password is valid.
 * @throws {Error} If an error occurs during password verification.
 */

async function verifyPassword(hashedPassword, inputPassword) {
  try {
    // Verify the entered password against the stored hash
    return await argon2.verify(hashedPassword, inputPassword);
  } catch (error) {
    throw new Error("Error verifying password");
  }
}

module.exports = { hashPassword, verifyPassword };

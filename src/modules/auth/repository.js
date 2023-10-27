const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.AuthRespository = {
  /**
   * Find a user by their email or username.
   *
   * @param {string} identifier - The email or username to search for.
   * @returns {Promise<User|null>} A Promise that resolves to the user found or null if not found.
   * @throws {Error} If there is an error in the database query.
   */

  isUser: async (identifier) => {
    try {
      // find a user where either the email or username matches the provided identifier
      return await prisma.user.findFirst({
        where: {
          OR: [{ email: identifier }, { username: identifier }],
        },
      });
    } catch (error) {
      log(error.message);
      throw new Error("Internal Server Error");
    }
  },

  /**
   * Store data in the database.
   * @param {object} data - The data to be stored in the database.
   * @returns {Promise} A Promise that resolves when the data is successfully stored.
   * @throws {Error} If there is an error during database storage.
   */
  async createUser(data) {
    try {
      // Use Prisma to store the data in the database
      return await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          pass: data.password,
        },
      });
    } catch (error) {
      throw new Error("Error storing data in the database");
    }
  },

  /**
   * Update the verification status of a user in the database.
   *
   * @param {string} id - The unique identifier of the user to update.
   * @returns {Promise<User>} A Promise that resolves to the updated user object.
   * @throws {Error} Throws an error if there's an issue updating the user.
   */
  async updateVerifiedStatus(id) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          status: "active",
        },
      });

      return updatedUser;
    } catch (error) {
      log(error.message);
      throw new Error("Error while updating user info");
    }
  },
};

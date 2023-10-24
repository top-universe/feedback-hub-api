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

  async createUser(user) {},
};

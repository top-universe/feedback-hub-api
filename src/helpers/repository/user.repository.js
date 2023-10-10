const { userCollection } = require("../../modules/userSchema"); 
const { authResponse } = require("../../utils/response");
const bcrypt = require("bcryptjs");


const generateHash = async (reqPassword) => {
  console.log("hashedPassword");
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqPassword, salt);
    console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error generating hash:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};


async function register(data) {
  try {
    const password = await generateHash(data.password);

    // Create a new user document and set the hashed password
    const user = await userCollection.create({
      ...data,
      password: password,
    });

    // Save the user document and await the operation
    await user.save();

    return authResponse(user);
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}

module.exports = {
  register
};

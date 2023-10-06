const { userCollection } = require("../../modules/userSchema");
const { authResponse } = require("../../utils/response");
async function register(data) {
  try {
    console.log("Register");
    console.log(data);
    const user = await userCollection.create(data); 
    return authResponse(user);
  } catch (error) {
    return false;
  }
}

module.exports = {
  register
};

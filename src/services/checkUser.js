

const { userCollection } = require ("../modules/userSchema");


const checkUser = async (email) => {
  console.log("emailCheck")

  const user = await userCollection.findOne({email: email})

  if (  !email ) {
      return false
    }
      return user
};

module.exports = { checkUser }


const { userCollection } = require ("../modules/userSchema");


const checkUser = async (email) => {
  console.log("emailCheck")

  const user = await userCollection.find({email: email})

  if (  !email ) {
  console.log("False")

      return true
    }
  console.log("True")

      return user
};

module.exports = { checkUser }

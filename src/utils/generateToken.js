const  jwt = require('jsonwebtoken');
const { environment } = require('../config/environment');
require('dotenv');
const {JWT_SECRET, HOST} = environment;

const verifyJWTToken = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (!err) {
        
				resolve(decoded)
      } else {
        resolve(false);
      }
    });
  });
};
    // generate email verification link when verify a newly created account
   const generateEmailVerificationLink = async function (user) {
    console.log("generateEmailVerificationLink")
      link = jwt.sign(user, JWT_SECRET, { expiresIn: "1800000"}) //token expires in 30 minutes
      verificationLink = `${HOST}/v1/auth/verify/${link}`
      console.log(verificationLink)
      return verificationLink
  };

  // verify jwt => returns embeded user object if links is still active
  const verifyLink = async function (link) {
      let isValid = jwt.verify(link, JWT_SECRET )
      if(isValid) return isValid
  };

module.exports = {  verifyJWTToken, generateEmailVerificationLink, verifyLink}
const  jwt = require("jsonwebtoken");
// const { environment } = require("../config/environment");
require("../config/index") // load config



const verifyJWTToken = (token) => {
  return new Promise((resolve) => {
    jwt.verify(token, AppConfig.JWT_SECRET, (err, decoded) => {
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
      try {
        const payload = {
          id: user
      }
        const link = jwt.sign(payload, AppConfig.JWT_SECRET, { expiresIn: 1800 }); // token expires in 30 minutes
        const verificationLink = `${AppConfig.HOST}/v1/auth/verify/${link}`;
        return verificationLink;
      } catch (error) {
        console.error("Error generating email verification link:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
    };

  // verify jwt => returns embeded user object if links is still active
  const verifyLink = async function (link) {
      let isValid = jwt.verify(link, AppConfig.JWT_SECRET )
      if(isValid) return isValid
  };

module.exports = {  verifyJWTToken, generateEmailVerificationLink, verifyLink}
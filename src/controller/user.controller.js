  const { register } = require("../helpers/repository/user.repository"),
        { response, authResponse } = require("../utils/response"),
        { SIGNUP_TEMPLATE } = require("../utils/email.template"),
        emailService = require("../services/email.service"),
        {
        userCollection,
        } = require("../modules/userSchema"),
        
        {
        generateEmailVerificationLink,
        verifyLink,
        } = require("../utils/generateToken")
        
  registerUser = async (req, res) => { 
       try {
        const bigData = req.body;
        const data = {...bigData}

             const newUser = await register(data);
             
             let verificationLink = await generateEmailVerificationLink(data.email);
          
             let msg = {
               to: data.email,
               subject: "Welcome, Please Verify your Email",
               templateId: "SIGNUP_TEMPLATE", // Email Confirmation Template
               dynamicTemplateData: {
                 name: data.firstName,
                 action_url: verificationLink,
               },
             }
             console.log(msg) 
             // await emailService({
             //   to: email,
             //   subject: "Welcome, Please Verify your Email",
             //   templateId: SIGNUP_TEMPLATE, // Email Confirmation Template
             //   dynamicTemplateData: {
             //     name: firstName,
             //     action_url: verificationLink,
             //   },
             // });
        
             return res.status(201).json(
              response({
                success: true,
                message: "User created successfully, Check your email for confirmation",
                data: newUser,
            }))
            }
              catch (error) {
                return res.status(500).json(
                  response({
                    success: false,
                    message: "Something went wrong, please contact an Admin",
                    data: "user",
                  })
                );
          }}
        
        



  
async function login(req, res) {
  // retrieve the email and password
  const { email, password } = req.body;

  const user = await userCollection.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: `User with email ${email} does not exist.` });
  }

  // comparing password
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json(
    response({
      success: true,
      message: "User login successfully",
      data: authResponse(user),
    })
  );
}

async function verifyMail(req, res) {
  let verificationLink = req.params.link;

  try {
    let user = await verifyLink(verificationLink);
    if (!user) {
      throw new Error("Link expired");
    }

    // res.status(201).redirect("/auth/signin");
    res.status(201).send({
      success: true,
      message:
        "Email has been Successfully Confirmed, pls go back to login route",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      success: false,
      message: "there was an error",
      errorCode: err.code,
      error: err.message,
    });
  }
}

module.exports = {
  registerUser,
  verifyMail,
  login,
};

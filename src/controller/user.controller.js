  const { register } = require("../helpers/repository/user.repository"),
        { response } = require("../utils/response"),
        { SIGNUP_TEMPLATE } = require("../utils/email.template"),
        emailService = require("../services/email.service"),
        checkUser = require("../services/checkUser"),
        {
        userCollection,
        generateHash,
        } = require("../modules/userSchema"),
        
        {
        generateEmailVerificationLink,
        verifyLink,
        } = require("../utils/generateToken")
        

 registerUser = async (req, res) => { 
  const bigData = req.body;
  const data = {...bigData}

  try {
    let email = data.email
    // console.log(email)

    // const checkEmailExist = await checkUser(email);
    // if (checkEmailExist === false) {
    //     console.log(checkEmailExist)
    //   } else {
    //     conslol.log("Win WIn")
    //   }


    //Check if the user already exist
    password =
    data.password === data.confirm_password
        ? await generateHash(data.password)
        : res.status(422).json(
            response({
              success: false,
              message: "Password mismatch, Comfirm your password",
            })
          );


    // if (checkEmailExist != email)
    //   return res
    //     .status(409)
    //     .json(response({ message: "User already exist", success: false }));
        
        

    let verificationLink = await generateEmailVerificationLink(email);

    const user = await register(data);
    
    console.log(verificationLink, user)

    await emailService({
      to: email,
      subject: "Welcome, Please Verify your Email",
      templateId: SIGNUP_TEMPLATE, // Email Confirmation Template
      dynamicTemplateData: {
        name: firstName,
        action_url: verificationLink,
      },
    });

    if (!user) 
      console.log("Here1111")
      return res
        .status(500)
        .json(response({ success: false, message: "User not created" }));

    return res.status(201).json(
      response({
        success: true,
        message: "User created successfully, Check your email for confirmation",
        data: user,
      })
    );
  } catch (error) {
    return res.status(500).json(
      response({
        success: false,
        message: "Something went wrong, please contact an Admin",
        data: "user",
      })
    );
  }
}

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

async function refreshUserToken(req, res) {
  const { _id } = req.user;
  //Check if user already exist
  const user = await userCollection.findById(_id);
  if (!user) {
    return res.status(400).json(
      response({
        success: true,
        message: "User not found",
      })
    );
  }

  return res.status(200).json(
    response({
      success: true,
      message: "Refresh token accepted",
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

    // res.status(201).redirect("/v1/auth/signin");
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
  refreshUserToken,
};

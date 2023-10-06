require('dotenv').config()
//require('./src/config') // load config
require('./src/config/index') // load database
const {cors} = require('./src/utils/cors'),
    express = require('express'),
    app = express()

// middleware for expired token
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, AppConfig.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
       error: "JWT token has expired, please login to obtain a new one"
      });
     }
     res.locals.loggedInUser = await User.findById(userId);
     next();
    } else {
     next();
    }
});

// importing module routers
const {routeHandler} = require('./src/routes/index.route')

// initialise modules
app.use(express.json())
    .use(cors) // loaded cors
    .use(express.urlencoded({ extended: false }))
    .use(routeHandler) // mounting modules
    .get('/', (req,res) => res.send('Everything works pretty well 🚀, powered by Top Universe'))
 //   .listen(AppConfig.PORT, () =>  console.log(`App is running on port ${AppConfig.PORT}`)) // launch express app

    
//404 error
app.all("*", (req, res) => {
    res.status(404).json({
      message: "Ohh you are lost, path not found.",
    });
  });

    module.exports = app;
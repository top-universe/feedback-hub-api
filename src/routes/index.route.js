const routeHandler = require("express").Router();

const { auth } = require("./auth.routes");
const logoutRoute = require("./logoutRoute");

routeHandler.use("/auth", auth);
routeHandler.use("/logout", logoutRoute);

module.exports = { routeHandler };


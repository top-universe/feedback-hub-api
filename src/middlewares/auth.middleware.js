const jwt = require("jsonwebtoken");
const { environment } = require("../config/environment");
const { JWT_SECRET } = environment;
// this is the auth middleware, in this module,
// we check if there is a token in the header of the request.
// if there is no token, it will exit the function.

function verify(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return Response.error(res, "Unauthorize User", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    Response.error(res, "Invalid Token", 401);
  }
}

module.exports = { verify };

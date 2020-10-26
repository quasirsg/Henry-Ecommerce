const jwt = require("jsonwebtoken");
var config = require("../configs/config");

exports.authenticateToken = function (req, res, next) {
  // Gather the jwt access token from the request header
  var token = req.headers["authorization"];
  console.log(token);
  token = token.replace("Bearer ", "");
  console.log("soy un token", token);
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, config.llave, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next(); // pass the execution off to whatever request the client intended
  });
};

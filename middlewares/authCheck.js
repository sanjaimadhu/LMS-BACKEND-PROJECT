const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Authorization token required!",
    });
  }
  const token = req.headers?.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(403).json({
          status: false,
          message: "jwt expired",
        });
      } else {
        res.status(403).json({
          message: "Authentication Failed!",
          err,
        });
      }
    } else {
      req.name = decode;
      req.email = decode;
      next();
    }
  });
};

module.exports = {authCheck};

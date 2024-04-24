const jwt = require("jsonwebtoken");
const HttpError = require('../models/error.model')

const ensureAuthenticated = (req, res, next) => {
  
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "UnAuthorized Login" });
    }
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token is not valid, or it expired",
    });
  }
};

module.exports = {
  ensureAuthenticated,
};

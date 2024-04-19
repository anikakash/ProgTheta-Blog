const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decode = jwt.verify(req.headers["authorization"], process.env.SECRET);
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Token is not valid, or it expired",
    });
  }
};

module.exports = {
  ensureAuthenticated,
};

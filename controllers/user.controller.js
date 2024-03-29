const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// validate req.body -> Done
// create MongoDB userModel ->done
// do password encrytion
// save data to MongoDB
// retrun response to the client
const userRegistration = async (req, res) => {
  const userModel = new UserModel(req.body);
  userModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await userModel.save();
    response.password = undefined; // we are not send password so erase it before send the response
    res
      .status(200)
      .json({ message: "Registration Successful", data: response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration Successful", Message: error.toString() });
  }
};

// Check user using email
// Compare pass:
// Create jwt
// Send Response to client
const userLogin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Auth faild, Invalid mail/pass" });
    }
    // check is correct password or not
    const isPassEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: "Auth faild, Invalid mail/pass" });
    }

    const tokenObject = {
      _id: user._id,
      Name: user.name,
      email: user.email,
    };

    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "4h",
    });

    return res.status(200).json({ jwtToken, tokenObject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Login Faild ", Message: error.toString() });
  }
};

module.exports = {
  userRegistration,
  userLogin,
};

const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// validate req.body -> Done
// create MongoDB userModel ->done
// do password encrytion
// save data to MongoDB
// retrun response to the client

// ================ REGISTER A NEW USER ====================
// POST : /api/users/register

const userRegistration = async (req, res) => {
  const userModel = new UserModel(req.body);
  userModel.password = await bcrypt.hash(req.body.password, 10);
  try {
      res.status(200).json({ message: "Registration Successful"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration Successful", Message: error.toString() });
  }
};


// ================ Login A NEW USER ====================
// POST : /api/users/login


// Check user using email
// Compare pass:
// Create jwt
// Send Response to client
const userLogin = async (req, res) => {
  try {
    // const userCredential = await UserModel.findOne({ email: req.body.email });
    // if (!userCredential) {
    //   return res.status(401).json({ message: "Auth faild, Invalid mail/pass -> Controller" });
    // }
    // // check is correct password or not
    // const isPassEqual = await bcrypt.compare(req.body.password, userCredential.password);

    // if (!isPassEqual) {
    //   return res.status(401).json({ message: "Auth faild, Invalid mail/pass" });
    // }

    // const tokenObject = {
    //   _id: userCredential._id,
    //   Name: userCredential.name,
    //   email: userCredential.email,
    // };

    // const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
    //   expiresIn: "4h",
    // });

    // return res.status(200).json({ jwtToken, tokenObject });

    res.status(200).json({ message: "Login Successful"});

  } catch (error) {
    res
      .status(500)
      .json({ message: "Login Faild ", Message: error.toString() });
  }
};


// ================ GET ALL USER ====================
// GET : /api/users/all
const getUsers = async (req, res) => {
  try {
      res.status(200).json({ message: "User data retrive successfully"});
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// ================ GET ALL USER ====================
// POST : /api/users/:id


const getLoggedInUserInfo = async(req, res)=>{
  try {
    res.status(200).json({Message: "Logged In user info"});

  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
}

// ================ Edit USER AVATAR ====================
// POST : /api/users/change-avatar/:id
// PROTECTED
const changeAvatar = (req, res, next) =>{
  res.json("Change avatar");
}


// ================ EDIT USER DETATILS (from profile)====================
// POST : /api/users/:id/change-avatar
// PROTECTED
const updateUser = (req, res, next) =>{
  res.json("Change avatar");
}


module.exports = {
  userRegistration,
  userLogin,
  getUsers,
  getLoggedInUserInfo,
  changeAvatar,
  updateUser,
};

const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/error.model.js")

// validate req.body -> Done
// create MongoDB userModel ->done
// do password encrytion
// save data to MongoDB
// retrun response to the client

// ================ REGISTER A NEW USER ====================
// POST : /api/users/register

const userRegistration = async (req, res, next) => {
  // const userModel = new UserModel(req.body);
  // userModel.password = await bcrypt.hash(req.body.password, 10);
  try {
      const {name, email, password, password2} = req.body;
      if(!name || !email || !password){
        return next(new HttpError("Fill in all fields.", 422));
      }

      const newEmail = email.toLowerCase();
      const emailExists = await UserModel.findOne({email: newEmail});

      if(emailExists){
        return next(new HttpError("Error already exists.", 422));
      }

      if((password.trim()).length < 6){
        return next(new HttpError("Password should be at least 6 characters.", 422));
      }

      if(password != password2){
        return next(new HttpError("passwords do not match.", 422));
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({name, email: newEmail, password: hashedPass})

      res.status(201).json(newUser);

  } catch (error) {
    return next (new HttpError("User registration failed.", 422))
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
  res.json("Update User info");
}


module.exports = {
  userRegistration,
  userLogin,
  getUsers,
  getLoggedInUserInfo,
  changeAvatar,
  updateUser,
};

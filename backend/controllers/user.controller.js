const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/error.model.js")
const fs = require('fs');
const path = require('path')
const {v4: uuid} = require("uuid");

// validate req.body -> Done
// create MongoDB userModel ->done
// do password encrytion
// save data to MongoDB
// retrun response to the client

// ================ REGISTER A NEW USER ====================
// POST : /api/users/register

const userRegistration = async (req, res, next) => {

  try {
      const {name, email, password, password2} = req.body;
      if(!name || !email || !password || !password2){
        return next(new HttpError("All fields registered!"))
      }

      const newEmail = email.toLowerCase();
      const emailExists = await UserModel.findOne({email: newEmail});

      if(emailExists){
        return next(new HttpError("Email already exists.", 422));
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

      res.status(201).json(`New user ${newUser.email} registered.`);

  } catch (error) {
    console.log(error);
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
    const {email, password} = req.body;
    if(!email || !password) {
      return next(new HttpError("All fields registered!"))
    }
    const newEmail = email.toLowerCase();
    const userCredential = await UserModel.findOne({ email: newEmail});
    if (!userCredential) {
      return res.status(401).json({ message: "Invalied Credentials." });
    }
    // check is correct password or not
    const isPassEqual = await bcrypt.compare(password, userCredential.password);

    if (!isPassEqual) {
      return res.status(401).json({ message: "Wrong Password." });
    }

    const tokenObject = {
      id: userCredential._id,
      Name: userCredential.name,
      email: userCredential.email,
    };

    const jwtToken = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    return res.status(200).json({ jwtToken, tokenObject });

  } catch (error) {
    res
      .status(401)
      .json({ message: "Login Faild " });
  }
};


// ================ GET ALL USER ====================
// GET : /api/users/all
const getUsers = async (req, res) => {
  try {
    const authors = await UserModel.find().select('-password');
      res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// ================ GET ALL USER ====================
// POST : /api/users/


const getLoggedInUserInfo = async(req, res)=>{
  try {
    
    const user = await UserModel.findById(req.user.id).select('-password');;
    if (!user) {
      return res.status(404).json({ Meassage: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    // Message: error.message
    res.status(500).json({ Message: error.message });
  }
}

// ================ GET USER BY ID =================
// GET: / api/users/:id

const getUserById = async(req, res) =>{
  try {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ Message: error.message });
  }
}


// ================ Edit USER AVATAR ====================
// POST : /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }

    const user = await UserModel.findById(req.user.id);

    // Check if user exists
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    // Delete old avatar if exists
    if (user.avatar) {
      fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err.message, 500));
        }
      });
    }

    const { avatar } = req.files;

    if (avatar.size > 500000) {
      return next(new HttpError("Profile picture is too big. Should be less than 500kb", 422));
    }

    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split('.');
    let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];

    avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
      if (err) {
        return next(new HttpError(err.message, 500));
      }

      // Update user's avatar
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        { avatar: newFilename },
        { new: true }
      );

      if (!updatedUser) {
        return next(new HttpError("Avatar couldn't be changed", 422));
      }

      // Remove password field from updated user object
      updatedUser.password = undefined;

      res.status(200).json(updatedUser);
    });

  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};



// ================ EDIT USER DETATILS (from profile)====================
// POST : /api/users/:id/change-avatar
// PROTECTED
const updateUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found.", 403));
    }

    const validUserPassword = await bcrypt.compare(currentPassword, user.password);

      if (!validUserPassword) {
        return next(new HttpError("Provide Correct Password.", 422));
      }

    // Update email if provided and not already taken
    if (email) {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist && (emailExist._id != req.user.id)) {
        return next(new HttpError("Email already exists.", 422));
      }
      user.email = email;
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Validate and update password if provided
    if (newPassword && confirmNewPassword) {

      if (newPassword !== confirmNewPassword) {
        return next(new HttpError("New passwords do not match", 422));
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      user.password = hash;
    }

    // Save updated user information
    await user.save();

    // Remove password field from response
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
}



module.exports = {
  userRegistration,
  userLogin,
  getUsers,
  getLoggedInUserInfo,
  changeAvatar,
  updateUser,
  getUserById
};

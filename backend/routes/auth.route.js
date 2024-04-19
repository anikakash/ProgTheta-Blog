const express = require("express");
const router = express.Router();
const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controller");

const {
  userRegisterValidate,
  userLoginValidate,
} = require("../middleware/userValidation");

router.post("/register", userRegisterValidate, userRegistration);
router.post("/login", userLoginValidate, userLogin);

module.exports = router;

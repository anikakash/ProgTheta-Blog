const express = require("express");
const router = express.Router();
const {
    userRegistration,
    userLogin,
    getUsers,
    getLoggedInUserInfo,
    changeAvatar,
    updateUser,
    getUserById
} = require("../controllers/user.controller.js");

const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/all", getUsers);
router.get("/my-info",ensureAuthenticated, getLoggedInUserInfo);
router.post("/change-avatar",ensureAuthenticated, changeAvatar);
router.patch("/update-user",ensureAuthenticated, updateUser);
router.get("/profile/:id",getUserById);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
    userRegistration,
    userLogin,
    getUsers,
    getLoggedInUserInfo,
    changeAvatar,
    updateUser
} = require("../controllers/user.controller.js");

// const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/all", getUsers);
router.get("/:id", getLoggedInUserInfo);
router.patch("/change-avatar/:id", changeAvatar);
router.patch("/update-user/:id", updateUser);


module.exports = router;

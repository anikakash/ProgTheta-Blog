const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller.js");

const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.get("/all", getPosts);
router.get("/:id", getPostById);
//jwt
router.post("/create-post", createPost);
router.patch("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;

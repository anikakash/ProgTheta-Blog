const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCatagoryBlog,
  getUserPosts
} = require("../controllers/post.controller.js");

const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.get("/all", getPosts);
router.get("/:id", getPostById);
router.get("/categories/:category", getCatagoryBlog);
router.get("/users/all-posts",ensureAuthenticated, getUserPosts);
//jwt
router.post("/create-post",ensureAuthenticated, createPost);
router.patch("/update-post/:id",ensureAuthenticated, updatePost);
router.delete("/delete-post/:id",ensureAuthenticated, deletePost);

module.exports = router;

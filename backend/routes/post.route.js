const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCatagoryBlog,
  getLoggedUserPosts,
  getPostByAuthorId,
  getAllCategories
} = require("../controllers/post.controller.js");

const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/user-posts/:id", getPostByAuthorId);
router.get("/categories/:category", getCatagoryBlog);
router.get("/all-category", getAllCategories);
router.get("/users/my-posts",ensureAuthenticated, getLoggedUserPosts);
//jwt
router.post("/create-post",ensureAuthenticated, createPost);
router.patch("/update-post/:id",ensureAuthenticated, updatePost);
router.delete("/delete-post/:id",ensureAuthenticated, deletePost);

module.exports = router;

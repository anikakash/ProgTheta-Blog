const Post = require("../models/Post.model");


// =============== Get blog ===============
// GET : /api/post/all
const getPosts = async (req, res) => {
  // try {
  //   const Posts = await Post.find({});
  //   if(Posts.length==0) res.status(200).json({Message: "Not Post found"});
  //   res.status(200).json(Posts);
  // } catch (error) {
  //   res.status(500).json({ Message: error.message });
  // }
  try {
    res.status(200).json({Message: "Get all Posts"});
  } catch (error) {
    
  }
};


// =============== Get blog By ID ===============
// GET : /api/post/:id

const getPostById = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Post = await Post.findById(id);
    // res.status(200).json(Post);
    res.status(200).json({Message: "Get Post by ID"});
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// =============== Create Blog ===============
// POST : /post/create-post

const createPost = async (req, res) => {
  try {
    // const Post = await Post.create(req.body);
    // res.status(200).json(Post);
    res.status(200).json({ Message: "Posted" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// =============== Update Blog ===============
// POST : /post/update-post/:id

const updatePost = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Post = await Post.findByIdAndUpdate(id, req.body);

    // if (!Post) {
    //   return res.status(404).json({ Meassage: "Post is not found!" });
    // }

    // const newPost = await Post.findById(id);
    // res.status(200).json(newPost);
    res.status(201).json({ Meassage: "Post Updated" });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// =============== delete Blog ===============
// POST : /post/delete-post/:id


const deletePost = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Post = await Post.findByIdAndDelete(id);
    // if (!Post) {
    //   return res.status(404).json({ Meassage: "Post is not found!" });
    // }
    res.status(200).json({ Message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};

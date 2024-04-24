const Post = require("../models/Post.model");
const UserModel = require("../models/user.model")
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const HttpError = require("../models/error.model")


// =============== Create Blog ===============
// POST : /post/create-post

const createPost = async (req, res, next) => {
  try {
    let {title, category, description} = req.body;
    if(!title || !category || !description){
      return next(HttpError("Fill in all the fields and choose thumbnail.", 422));
    }

      const {thumbnail} = req.files;
      //check the file size;
      if(thumbnail.size > 2000000 ){
        return next(HttpError("Thumbnail too big. File Should be less than 2MB."));
      }

      let fileName = thumbnail.name;
      let splittedFilename = fileName.split('.');
      let newFilename = splittedFilename[0]+uuid() + "." + splittedFilename[splittedFilename.length-1];
      thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async(err)=>{
        if(err){
          return next(new HttpError(err));
        }else{
          const newPost = await Post.create({title, category, description, thumbnail: newFilename, creator: req.user.id});
          if(!newPost){
            return next(HttpError("post couldn't be created.", 422));
          }
          // Increase user post count:
          const currentUser = await UserModel.findById(req.user.id);
          let userPostCount = currentUser.posts || 0;
          userPostCount += 1;
          await UserModel.findByIdAndUpdate(req.user.id, {posts: userPostCount})
          res.status(201).json(newPost);
        }
      })
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// =============== Update Blog ===============
// POST : /post/update-post/:id

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let { title, category, description } = req.body;

    // Check if required fields are provided
    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields", 422));
    }

    // Fetch the old post
    const oldPost = await Post.findById(postId);

    // Check if the user is authorized to update the post
    if (req.user.id !== oldPost.creator) {
      return next(new HttpError("You are not authorized to update this post", 403));
    }

    let updatePost;

    // Check if files are uploaded
    if (req.files && req.files.thumbnail) {
      const thumbnail = req.files.thumbnail;

      // Check the file size
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail too big. File should be less than 2MB."));
      }

      // Generate new filename
      const fileName = thumbnail.name;
      const splittedFilename = fileName.split('.');
      const newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];

      // Move thumbnail to uploads directory
      await thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename));

      // Update post with new thumbnail
      updatePost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });
    } else {
      // Update post without changing thumbnail
      updatePost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true });
    }

    if (!updatePost) {
      return next(new HttpError("Can't update post", 400));
    }

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};



// =============== delete Blog ===============
// POST : /post/delete-post/:id

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return next(new HttpError("Post unavailable.", 400));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found.", 404));
    }

    // Check if the current user is the creator of the post
    if (req.user.id !== post.creator) {
      return next(new HttpError("You are not authorized to delete this post.", 403));
    }

    // Delete thumbnail file
    const fileName = post.thumbnail;
    fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
      if (err) {
        return next(new HttpError(err));
      } else {
        // Remove post from database
        await Post.findByIdAndDelete(postId);

        // Find user and reduce post count
        const currentUser = await UserModel.findById(req.user.id);
        if (currentUser.posts > 0) {
          currentUser.posts -= 1;
          await currentUser.save();
        }

        // Send success response after deleting post
        return res.json(`Post ${postId} deleted successfully.`);
      }
    });

  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};



// =============== Get blog ===============
// GET : /api/post/all
const getPosts = async (req, res) => {
  try {
    const Posts = await Post.find().sort({updatedAt : -1})
    if(Posts.length==0) res.status(200).json({Message: "Not Post found"});
    res.status(200).json(Posts);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
  
};


// =============== Get blog By ID ===============
// GET : /api/post/:id

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      // If post is null or undefined, return a 404 error
      return next(new HttpError("Post not found.", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


// ============= GET Blog by Catagory ==============
// GET: /post/catagory/:catagory
const getCatagoryBlog = async(req, res, next) =>{
  try {
    const { category } = req.params;
    const catPosts = await Post.find({category}).sort({updatedAt : -1});
    if(catPosts.length === 0){
      return next(new HttpError(`Post not found on ${category}.`, 404));
    }
    res.status(200).json(catPosts);
    
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
}

// ============= GET Blog by user ==============
// GET: /post/users/all-posts
const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const posts = await Post.find({ creator: userId }).sort({ updatedAt: -1 });

    if (posts.length === 0) {
      return next(new HttpError("No posts found for this user.", 404));
    }

    res.status(200).json(posts);
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
  getCatagoryBlog,
  getUserPosts
};

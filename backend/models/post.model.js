const {Schema, model, mongoose} = require("mongoose")

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["LeetCode", "System-Design", "Problem-Solving", "Database", "Data-Structure", "AI", "Uncategorized"],
      message: "Value is not supported",
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref : "userModel"
    },
    thumbnail: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;

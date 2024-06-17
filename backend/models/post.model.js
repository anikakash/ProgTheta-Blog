const {Schema, model, mongoose} = require("mongoose")

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref : "Users"
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

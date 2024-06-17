const {Schema, model, mongoose} = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamp: true
    }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
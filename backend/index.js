const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route.js");
const postRoutes = require("./routes/post.route.js");
const categoryRoutes = require("./routes/category.route.js")
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
require("dotenv").config();
const upload = require('express-fileupload')


const app = express();

// middle ware
app.use(express.json({extended: true}));
app.use(express.urlencoded({ extended: true})); // taking form input from postman
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));


app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
// 404 page handle:
app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("DB Connection faild!");
  });


module.exports = app;
const express = require("express");
const mongoose = require("mongoose");
// const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const authRoute = require("./routes/auth.route.js");
require("dotenv").config();
const app = express();

// middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // taking form input from postman

// routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World From Node API");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect to database!");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection faild!");
  });

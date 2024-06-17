const express = require("express");
const router = express.Router();


const {
    createCategory,
    updateCategory,
    allCategory,
    deleteCategory,
} = require("../controllers/category.controller.js");



router.post("/create-category", createCategory);
router.get("/all-categories", allCategory);
router.patch("/update-category/:id", updateCategory);
router.delete("/delete-catagory/:id", deleteCategory);

module.exports = router;
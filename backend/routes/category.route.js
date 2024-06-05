const express = require("express");
const router = express.Router();


const {
    createCategory,
    updateCategory,
    allCategory,
} = require("../controllers/category.controller.js");



router.post("/create-category", createCategory);
router.get("/categories", allCategory);
router.patch("/update-category/:id", updateCategory);

module.exports = router;
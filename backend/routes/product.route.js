const express = require("express");
const router = express.Router();
const { required } = require("joi");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/post.controller.js");

const { ensureAuthenticated } = require("../middleware/authMiddleware.js");

router.get("/", getProducts);
router.get("/:id", getProduct);
//jwt
router.post("/", ensureAuthenticated, createProduct);
router.put("/:id", ensureAuthenticated, updateProduct);
router.delete("/:id", ensureAuthenticated, deleteProduct);

module.exports = router;

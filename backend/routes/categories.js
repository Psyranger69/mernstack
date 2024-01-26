const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getcategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categorycontrollers");

// get all categories
router.get("/", getCategories);

// get single category
router.get("/:id", getcategory);

// post a new category
router.post("/", createCategory);

// delete a category
router.delete("/:id/:subcatid/:subsubcatid", deleteCategory);

// update a category
router.patch("/:id/:subcatid/:subsubcatid", updateCategory);
module.exports = router;

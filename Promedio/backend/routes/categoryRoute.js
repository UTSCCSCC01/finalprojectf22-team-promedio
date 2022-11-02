const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
router.post("/registerCategory", CategoryController.addCategory);
router.post("/editCategory", CategoryController.editCategory);
router.post("/deleteCategory", CategoryController.deleteCategory);
module.exports = router;

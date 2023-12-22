const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryCOntroller,
} = require("../controllers/categoryController");

const router = express.Router();

// routes

// route for creating a category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// route for updating a category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// route for getting all categories

router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

module.exports = router;

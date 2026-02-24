const express = require("express");
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", asyncHandler(listCategories));
router.post("/", requireAuth, requireAdmin, asyncHandler(createCategory));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateCategory));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteCategory));

module.exports = router;

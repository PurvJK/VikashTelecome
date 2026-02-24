const express = require("express");
const {
  listBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const asyncHandler = require("../utils/asyncHandler");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", asyncHandler(listBrands));
router.get("/:id", asyncHandler(getBrand));
router.post("/", requireAuth, requireAdmin, asyncHandler(createBrand));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateBrand));
router.delete("/:id", requireAuth, requireAdmin, asyncHandler(deleteBrand));

module.exports = router;

const express = require("express");
const {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const { requireAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", requireAuth, asyncHandler(listAddresses));
router.post("/", requireAuth, asyncHandler(createAddress));
router.put("/:id", requireAuth, asyncHandler(updateAddress));
router.delete("/:id", requireAuth, asyncHandler(deleteAddress));

module.exports = router;

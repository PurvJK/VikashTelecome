const express = require("express");
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
} = require("../controllers/cartController");
const { requireAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", requireAuth, asyncHandler(getCart));
router.post("/items", requireAuth, asyncHandler(addItem));
router.put("/items/:itemId", requireAuth, asyncHandler(updateItem));
router.delete("/items/:itemId", requireAuth, asyncHandler(removeItem));
router.delete("/clear", requireAuth, asyncHandler(clearCart));

module.exports = router;

const express = require("express");
const { listUsers, updateUser } = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", requireAuth, requireAdmin, asyncHandler(listUsers));
router.put("/:id", requireAuth, requireAdmin, asyncHandler(updateUser));

module.exports = router;

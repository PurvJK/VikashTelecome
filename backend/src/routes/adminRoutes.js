const express = require("express");
const { getAdminAnalytics } = require("../controllers/adminController");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/analytics", requireAuth, requireAdmin, asyncHandler(getAdminAnalytics));

module.exports = router;

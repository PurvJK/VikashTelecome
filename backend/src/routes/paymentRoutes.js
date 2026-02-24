const express = require("express");
const { processDirectPayment } = require("../controllers/paymentController");
const { requireAuth } = require("../middleware/auth");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/process", requireAuth, asyncHandler(processDirectPayment));

module.exports = router;

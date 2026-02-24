const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    image: { type: String },
    productCount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    description: { type: String },
    items: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

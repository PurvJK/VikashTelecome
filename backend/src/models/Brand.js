const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    logo: { type: String },
    category: { type: String, required: true }, // Category slug this brand belongs to
    productCount: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);

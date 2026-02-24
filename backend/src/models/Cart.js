const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    variant: {
      sku: { type: String },
      name: { type: String },
      attributes: {
        color: { type: String },
        storage: { type: String },
        ram: { type: String },
        size: { type: String },
      },
    },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

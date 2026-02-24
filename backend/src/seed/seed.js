const dotenv = require("dotenv");

dotenv.config();

const connectDb = require("../config/db");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const slugify = require("../utils/slugify");
const { products, categories } = require("./data");

const buildCategoryCounts = (items) => {
  const counts = {};
  items.forEach((product) => {
    if (!product.category) return;
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  return counts;
};

const normalizeProduct = (product) => {
  const normalized = { ...product };

  normalized.slug = product.slug ? slugify(product.slug) : slugify(product.title);
  delete normalized.id;

  if (typeof normalized.inStock === "boolean") {
    normalized.stock = normalized.inStock ? 10 : 0;
  }

  if (normalized.stock === undefined) {
    normalized.stock = 25;
  }

  return normalized;
};

const seed = async () => {
  const adminEmail = process.env.ADMIN_SEED_EMAIL || "admin@vikash.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "admin123";

  await connectDb();

  await Product.deleteMany({});
  await Category.deleteMany({});

  const categoryCounts = buildCategoryCounts(products);
  const categoryDocs = categories.map((category) => ({
    name: category.title,
    slug: category.slug,
    image: category.image,
    productCount: categoryCounts[category.slug] || 0,
    status: "active",
    description: `${category.title} products`,
  }));

  await Category.insertMany(categoryDocs);

  const productDocs = products.map(normalizeProduct);
  await Product.insertMany(productDocs);

  await User.deleteOne({ email: adminEmail });
  await User.create({
    name: "Admin User",
    email: adminEmail,
    password: adminPassword,
    role: "admin",
    status: "active",
  });

  console.log("Seed complete");
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

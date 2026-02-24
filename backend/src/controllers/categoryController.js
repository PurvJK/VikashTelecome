const Category = require("../models/Category");
const Product = require("../models/Product");
const slugify = require("../utils/slugify");

const buildUniqueSlug = async (baseSlug, excludeId) => {
  let slug = baseSlug;
  let counter = 1;

  while (await Category.exists({ slug, _id: { $ne: excludeId } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

const listCategories = async (req, res) => {
  const categories = await Category.find().sort("name");
  
  // Calculate product count for each category based on actual products
  const items = await Promise.all(
    categories.map(async (category) => {
      const productCount = await Product.countDocuments({ 
        category: category.slug,
        status: { $ne: "draft" }
      });
      
      return {
        ...category.toObject(),
        productCount,
      };
    })
  );
  
  return res.json({ items });
};

const createCategory = async (req, res) => {
  const payload = { ...req.body };

  if (!payload.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const baseSlug = payload.slug ? slugify(payload.slug) : slugify(payload.name);
  payload.slug = await buildUniqueSlug(baseSlug);

  const category = await Category.create(payload);
  return res.status(201).json({ category });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.name && !updates.slug) {
    const baseSlug = slugify(updates.name);
    updates.slug = await buildUniqueSlug(baseSlug, id);
  }

  const category = await Category.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.json({ category });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.json({ message: "Category removed" });
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

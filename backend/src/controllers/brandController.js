const Brand = require("../models/Brand");
const Product = require("../models/Product");
const slugify = require("../utils/slugify");

const buildUniqueSlug = async (baseSlug, excludeId) => {
  let slug = baseSlug;
  let counter = 1;

  while (await Brand.exists({ slug, _id: { $ne: excludeId } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

const listBrands = async (req, res) => {
  const { category } = req.query;
  const filter = {};
  
  if (category) {
    filter.category = category;
  }

  const brands = await Brand.find(filter).sort("name");
  
  // Calculate product count for each brand based on actual products
  const items = await Promise.all(
    brands.map(async (brand) => {
      const productCount = await Product.countDocuments({ 
        brand: brand.name,
        status: { $ne: "draft" }
      });
      
      return {
        ...brand.toObject(),
        productCount,
      };
    })
  );
  
  return res.json({ items });
};

const getBrand = async (req, res) => {
  const { id } = req.params;
  
  let brand = null;
  
  // Try to find by ID first
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    brand = await Brand.findById(id);
  }
  
  // If not found, try to find by slug
  if (!brand) {
    brand = await Brand.findOne({ slug: id });
  }

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  return res.json({ brand });
};

const createBrand = async (req, res) => {
  const payload = { ...req.body };

  if (!payload.name) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!payload.category) {
    return res.status(400).json({ message: "Category is required" });
  }

  const baseSlug = payload.slug ? slugify(payload.slug) : slugify(payload.name);
  payload.slug = await buildUniqueSlug(baseSlug);

  const brand = await Brand.create(payload);
  return res.status(201).json({ brand });
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const updates = { ...req.body };

  if (updates.name && !updates.slug) {
    const baseSlug = slugify(updates.name);
    updates.slug = await buildUniqueSlug(baseSlug, id);
  }

  const brand = await Brand.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  return res.json({ brand });
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  return res.json({ message: "Brand removed" });
};

module.exports = {
  listBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};

const Address = require("../models/Address");

const listAddresses = async (req, res) => {
  const items = await Address.find({ user: req.user._id }).sort("-createdAt");
  return res.json({ items });
};

const createAddress = async (req, res) => {
  const payload = { ...req.body, user: req.user._id };

  if (payload.isDefault) {
    await Address.updateMany({ user: req.user._id }, { $set: { isDefault: false } });
  }

  const address = await Address.create(payload);
  return res.status(201).json({ address });
};

const updateAddress = async (req, res) => {
  const { id } = req.params;

  if (req.body.isDefault) {
    await Address.updateMany({ user: req.user._id }, { $set: { isDefault: false } });
  }

  const address = await Address.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  return res.json({ address });
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const address = await Address.findOneAndDelete({ _id: id, user: req.user._id });

  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  return res.json({ message: "Address removed" });
};

module.exports = {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};

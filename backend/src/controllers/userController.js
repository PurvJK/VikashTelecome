const User = require("../models/User");

const listUsers = async (req, res) => {
  const users = await User.find().sort("-createdAt");
  return res.json({ items: users });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, role, status } = req.body;

  const updates = {};
  if (name) updates.name = name;
  if (role) updates.role = role;
  if (status) updates.status = status;

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user });
};

module.exports = { listUsers, updateUser };

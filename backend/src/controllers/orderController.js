const Order = require("../models/Order");

const createOrder = async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  const address = req.body.address || "";

  const computedTotal = items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.qty || 0);
    return sum + price * qty;
  }, 0);

  const total = computedTotal || Number(req.body.total || 0);

  if (!total) {
    return res.status(400).json({ message: "Order total is required" });
  }

  const order = await Order.create({
    user: req.user._id,
    customerName: req.user.name,
    email: req.user.email,
    items,
    total,
    address,
  });

  return res.status(201).json({ order });
};

const listMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  return res.json({ items: orders });
};

const listOrders = async (req, res) => {
  const orders = await Order.find().sort("-createdAt");
  return res.json({ items: orders });
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const updates = {};
  if (status) updates.status = status;
  if (paymentStatus) updates.paymentStatus = paymentStatus;

  const order = await Order.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json({ order });
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.json({ message: "Order deleted" });
};

module.exports = {
  createOrder,
  listMyOrders,
  listOrders,
  updateOrderStatus,
  deleteOrder,
};

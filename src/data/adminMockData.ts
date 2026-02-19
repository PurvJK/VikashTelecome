export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  date: string;
  items: { name: string; qty: number; price: number }[];
  address: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "blocked";
  joinedDate: string;
  orders: number;
}

export const adminProducts: AdminProduct[] = [
  { id: "1", name: "SoundDrum P Wireless Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop", category: "Speakers", price: 1299, mrp: 2999, stock: 45, status: "active" },
  { id: "2", name: "Harmonics Twins 28 TWS Earbuds", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=100&h=100&fit=crop", category: "Earbuds", price: 999, mrp: 2499, stock: 32, status: "active" },
  { id: "3", name: "Muffs G Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop", category: "Headphones", price: 1499, mrp: 3499, stock: 0, status: "out_of_stock" },
  { id: "4", name: "Power Plate 10 Wireless Charger", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop", category: "Chargers", price: 799, mrp: 1499, stock: 78, status: "active" },
  { id: "5", name: "Konnect Pro Smartwatch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop", category: "Smartwatches", price: 2499, mrp: 5999, stock: 12, status: "active" },
  { id: "6", name: "iBlitz 20W Fast Charger", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop", category: "Chargers", price: 599, mrp: 1199, stock: 5, status: "draft" },
  { id: "7", name: "SoundDrum 1 BT Speaker", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop", category: "Speakers", price: 1799, mrp: 3999, stock: 23, status: "active" },
  { id: "8", name: "Adapto 62 Car Charger", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=100&h=100&fit=crop", category: "Chargers", price: 649, mrp: 1299, stock: 67, status: "active" },
];

export const adminOrders: AdminOrder[] = [
  { id: "ORD-001", customer: "Rahul Sharma", email: "rahul@email.com", total: 3498, status: "delivered", paymentStatus: "paid", date: "2026-02-18", items: [{ name: "SoundDrum P Speaker", qty: 1, price: 1299 }, { name: "Harmonics Twins 28", qty: 1, price: 999 }], address: "123, MG Road, Mumbai" },
  { id: "ORD-002", customer: "Priya Patel", email: "priya@email.com", total: 2499, status: "shipped", paymentStatus: "paid", date: "2026-02-17", items: [{ name: "Konnect Pro Smartwatch", qty: 1, price: 2499 }], address: "45, Nehru Nagar, Delhi" },
  { id: "ORD-003", customer: "Amit Kumar", email: "amit@email.com", total: 1499, status: "processing", paymentStatus: "paid", date: "2026-02-17", items: [{ name: "Muffs G Headphones", qty: 1, price: 1499 }], address: "78, Whitefield, Bangalore" },
  { id: "ORD-004", customer: "Neha Singh", email: "neha@email.com", total: 799, status: "pending", paymentStatus: "unpaid", date: "2026-02-16", items: [{ name: "Power Plate 10", qty: 1, price: 799 }], address: "22, Banjara Hills, Hyderabad" },
  { id: "ORD-005", customer: "Vikram Joshi", email: "vikram@email.com", total: 4298, status: "delivered", paymentStatus: "paid", date: "2026-02-15", items: [{ name: "Konnect Pro Smartwatch", qty: 1, price: 2499 }, { name: "SoundDrum 1 BT", qty: 1, price: 1799 }], address: "90, Salt Lake, Kolkata" },
  { id: "ORD-006", customer: "Sneha Reddy", email: "sneha@email.com", total: 1248, status: "cancelled", paymentStatus: "refunded", date: "2026-02-14", items: [{ name: "Adapto 62 Car Charger", qty: 1, price: 649 }, { name: "iBlitz 20W Charger", qty: 1, price: 599 }], address: "11, Jubilee Hills, Hyderabad" },
];

export const adminUsers: AdminUser[] = [
  { id: "1", name: "Admin User", email: "admin@vikash.com", role: "admin", status: "active", joinedDate: "2025-01-01", orders: 0 },
  { id: "2", name: "Rahul Sharma", email: "rahul@email.com", role: "user", status: "active", joinedDate: "2025-06-15", orders: 5 },
  { id: "3", name: "Priya Patel", email: "priya@email.com", role: "user", status: "active", joinedDate: "2025-08-22", orders: 3 },
  { id: "4", name: "Amit Kumar", email: "amit@email.com", role: "user", status: "blocked", joinedDate: "2025-09-10", orders: 1 },
  { id: "5", name: "Neha Singh", email: "neha@email.com", role: "user", status: "active", joinedDate: "2025-11-05", orders: 8 },
];

export const salesData = [
  { day: "Mon", revenue: 4200, orders: 8 },
  { day: "Tue", revenue: 5800, orders: 12 },
  { day: "Wed", revenue: 3100, orders: 6 },
  { day: "Thu", revenue: 7400, orders: 15 },
  { day: "Fri", revenue: 6200, orders: 11 },
  { day: "Sat", revenue: 8900, orders: 18 },
  { day: "Sun", revenue: 5500, orders: 10 },
];

export const dashboardStats = {
  totalProducts: 48,
  totalOrders: 156,
  totalRevenue: 285400,
  totalUsers: 892,
};

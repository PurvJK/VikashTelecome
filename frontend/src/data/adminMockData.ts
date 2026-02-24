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
  hoverImage?: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  stock: number;
  status: "active" | "draft" | "out_of_stock";
  badge?: "sale" | "new" | "bestseller";
  specifications: { feature: string; value: string }[];
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

export const adminProducts: AdminProduct[] = [];

export const adminOrders: AdminOrder[] = [];

export const adminUsers: AdminUser[] = [];

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

// ── Categories ─────────────────────────────────────────────
export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  status: "active" | "inactive";
  description: string;
  items?: string[];
}

export const adminCategories: AdminCategory[] = [
  { id: "1", name: "Speakers", slug: "speakers", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop", productCount: 24, status: "active", description: "Bluetooth & wireless speakers for home and outdoor use." },
  { id: "2", name: "Earbuds", slug: "earbuds", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=200&h=200&fit=crop", productCount: 18, status: "active", description: "True wireless earbuds with ANC and long battery life." },
  { id: "3", name: "Headphones", slug: "headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", productCount: 15, status: "active", description: "Over-ear and on-ear headphones for immersive audio." },
  { id: "4", name: "Chargers", slug: "chargers", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop", productCount: 32, status: "active", description: "Fast chargers, wireless chargers, car chargers and power banks." },
  { id: "5", name: "Smartwatches", slug: "smartwatches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop", productCount: 12, status: "active", description: "Smart fitness watches with health tracking and GPS." },
  { id: "6", name: "Mobiles", slug: "mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop", productCount: 20, status: "active", description: "Latest smartphones from top brands." },
  { id: "7", name: "Mobile Accessories", slug: "mobile-accessories", image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=200&h=200&fit=crop", productCount: 45, status: "active", description: "Cases, screen protectors, cables and phone holders." },
  { id: "8", name: "Cables & Adapters", slug: "cables", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop", productCount: 38, status: "inactive", description: "USB-C, Lightning, HDMI and other cables & adapters." },
];

// ── Reviews ─────────────────────────────────────────────
export interface AdminReview {
  id: string;
  productName: string;
  productImage: string;
  customer: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: "published" | "pending" | "rejected";
  helpful: number;
}

export const adminReviews: AdminReview[] = [];

// ── Analytics ─────────────────────────────────────────────
export const monthlyRevenue = [
  { month: "Aug", revenue: 185000, orders: 285, users: 120 },
  { month: "Sep", revenue: 210000, orders: 312, users: 145 },
  { month: "Oct", revenue: 248000, orders: 378, users: 178 },
  { month: "Nov", revenue: 312000, orders: 445, users: 220 },
  { month: "Dec", revenue: 425000, orders: 588, users: 310 },
  { month: "Jan", revenue: 267000, orders: 398, users: 192 },
  { month: "Feb", revenue: 285400, orders: 412, users: 205 },
];

export const categorySales = [
  { category: "Speakers", sales: 48500, units: 38 },
  { category: "Earbuds", sales: 62400, units: 64 },
  { category: "Headphones", sales: 37200, units: 25 },
  { category: "Chargers", sales: 54800, units: 95 },
  { category: "Smartwatches", sales: 74900, units: 31 },
  { category: "Mobiles", sales: 124000, units: 42 },
];

export const topProducts = [
  { name: "Konnect Pro Smartwatch", revenue: 74900, units: 31, growth: 28 },
  { name: "SoundDrum P Speaker", revenue: 48500, units: 38, growth: 15 },
  { name: "Harmonics Twins 28", revenue: 62400, units: 64, growth: 42 },
  { name: "Adapto 62 Car Charger", revenue: 43600, units: 68, growth: 8 },
  { name: "Muffs G Headphones", revenue: 37200, units: 25, growth: -5 },
];


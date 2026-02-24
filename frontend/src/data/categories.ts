export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  productCount: number;
  items?: string[];
  status?: "active" | "inactive";
}

export const categories: Category[] = [
  {
    id: "1",
    title: "Speakers",
    slug: "speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    productCount: 24,
  },
  {
    id: "2",
    title: "Earbuds",
    slug: "earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&h=500&fit=crop",
    productCount: 18,
  },
  {
    id: "3",
    title: "Headphones",
    slug: "headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    productCount: 15,
  },
  {
    id: "4",
    title: "Chargers",
    slug: "chargers",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    productCount: 32,
  },
  {
    id: "5",
    title: "Smartwatches",
    slug: "smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    productCount: 12,
  },
  {
    id: "6",
    title: "Cables & Adapters",
    slug: "cables",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    productCount: 45,
  },
  {
    id: "7",
    title: "Mobiles",
    slug: "mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    productCount: 28,
  },
  {
    id: "8",
    title: "Mobile Accessories",
    slug: "mobile-accessories",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    productCount: 30,
  },
  {
    id: "9",
    title: "Wireless Chargers",
    slug: "wireless-chargers",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    productCount: 16,
  },
  {
    id: "10",
    title: "Car Chargers",
    slug: "car-chargers",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop",
    productCount: 12,
  },
  {
    id: "11",
    title: "Wall Chargers",
    slug: "wall-chargers",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    productCount: 14,
  },
  {
    id: "12",
    title: "Power Banks",
    slug: "power-banks",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    productCount: 20,
  },
  {
    id: "13",
    title: "Neckbands",
    slug: "neckbands",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    productCount: 10,
  },
  {
    id: "14",
    title: "Soundbars",
    slug: "soundbars",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop",
    productCount: 8,
  },
  {
    id: "15",
    title: "Smart Plugs",
    slug: "smart-plugs",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&h=500&fit=crop",
    productCount: 6,
  },
  {
    id: "16",
    title: "LED Lamps",
    slug: "led-lamps",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&h=500&fit=crop",
    productCount: 9,
  },
  {
    id: "17",
    title: "Webcams",
    slug: "webcams",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop",
    productCount: 7,
  },
  {
    id: "18",
    title: "Phone Holders",
    slug: "phone-holders",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    productCount: 11,
  },
  {
    id: "19",
    title: "Laptop Stands",
    slug: "laptop-stands",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    productCount: 8,
  },
  {
    id: "20",
    title: "USB Hubs",
    slug: "usb-hubs",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    productCount: 13,
  },
  {
    id: "21",
    title: "Mouse & Keyboards",
    slug: "mouse-keyboards",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    productCount: 15,
  },
];

export const megaMenuCategories = [
  {
    title: "Mobiles",
    items: ["Samsung", "Xiaomi", "Realme", "OnePlus", "Vivo", "POCO"],
  },
  {
    title: "Mobile Accessories",
    items: ["Chargers", "Cables", "Cases", "Screen Protectors", "Phone Holders"],
  },
  {
    title: "Audio",
    items: ["Bluetooth Speakers", "TWS Earbuds", "Wireless Headphones", "Neckbands", "Soundbars"],
  },
  {
    title: "Charging",
    items: ["Wireless Chargers", "Car Chargers", "Wall Chargers", "Power Banks", "Cables"],
  },
  {
    title: "Smart Devices",
    items: ["Smartwatches", "Smart Plugs", "LED Lamps", "Webcams"],
  },
  {
    title: "Accessories",
    items: ["Phone Holders", "Laptop Stands", "USB Hubs", "Mouse & Keyboards"],
  },
];

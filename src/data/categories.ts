export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  productCount: number;
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
];

export const megaMenuCategories = [
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

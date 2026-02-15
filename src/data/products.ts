export interface Product {
  id: string;
  title: string;
  slug: string;
  image: string;
  hoverImage: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  badge?: "sale" | "new" | "bestseller";
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "SoundDrum P Wireless Speaker",
    slug: "sounddrum-p-wireless-speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    price: 1299,
    mrp: 2999,
    discount: 57,
    rating: 4.5,
    reviewCount: 234,
    badge: "bestseller",
    category: "speakers",
  },
  {
    id: "2",
    title: "Harmonics Twins 28 TWS Earbuds",
    slug: "harmonics-twins-28",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    price: 999,
    mrp: 2499,
    discount: 60,
    rating: 4.3,
    reviewCount: 189,
    badge: "sale",
    category: "earbuds",
  },
  {
    id: "3",
    title: "Muffs G Wireless Headphones",
    slug: "muffs-g-wireless-headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    price: 1499,
    mrp: 3499,
    discount: 57,
    rating: 4.6,
    reviewCount: 312,
    badge: "new",
    category: "headphones",
  },
  {
    id: "4",
    title: "Power Plate 10 Wireless Charger",
    slug: "power-plate-10",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    price: 799,
    mrp: 1499,
    discount: 47,
    rating: 4.2,
    reviewCount: 156,
    category: "chargers",
  },
  {
    id: "5",
    title: "Adapto 62 Car Charger",
    slug: "adapto-62-car-charger",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&h=400&fit=crop",
    price: 649,
    mrp: 1299,
    discount: 50,
    rating: 4.4,
    reviewCount: 98,
    badge: "sale",
    category: "chargers",
  },
  {
    id: "6",
    title: "SoundDrum 1 BT Speaker",
    slug: "sounddrum-1-bt",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    price: 1799,
    mrp: 3999,
    discount: 55,
    rating: 4.7,
    reviewCount: 445,
    badge: "bestseller",
    category: "speakers",
  },
  {
    id: "7",
    title: "Konnect Pro Smartwatch",
    slug: "konnect-pro-smartwatch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
    price: 2499,
    mrp: 5999,
    discount: 58,
    rating: 4.1,
    reviewCount: 203,
    badge: "new",
    category: "smartwatches",
  },
  {
    id: "8",
    title: "iBlitz 20W Fast Charger",
    slug: "iblitz-20w-charger",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    price: 599,
    mrp: 1199,
    discount: 50,
    rating: 4.3,
    reviewCount: 167,
    category: "chargers",
  },
];

export const bestSellers = products.filter(p => p.badge === "bestseller" || p.rating >= 4.5);
export const newArrivals = products.filter(p => p.badge === "new" || p.discount >= 55);

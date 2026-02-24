import { Product } from "./products";

export interface MobileProduct extends Product {
  ram: string;
  storage: string;
  battery: string;
  has5G: boolean;
  emi?: string;
}

export const mobileProducts: MobileProduct[] = [];

export const mobileBrands = ["Samsung", "Xiaomi", "Realme", "POCO", "Motorola", "Vivo", "OnePlus", "iQOO", "Nokia", "OPPO"];
export const ramOptions = ["4 GB", "6 GB", "8 GB", "12 GB"];
export const storageOptions = ["64 GB", "128 GB", "256 GB"];
export const batteryOptions = ["4000-4500 mAh", "4500-5000 mAh", "5000+ mAh"];

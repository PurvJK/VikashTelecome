import { Product } from "./products";

export interface MobileAccessoryProduct extends Product {
  brand: string;
  type: "Charger" | "Cable" | "Case" | "Screen Protector" | "Holder";
  compatibility: string;
  inStock: boolean;
}

export const mobileAccessoriesProducts: MobileAccessoryProduct[] = [];

export const accessoryBrands = ["Anker", "Baseus", "Spigen", "ZAGG", "ESR"];
export const accessoryTypes: MobileAccessoryProduct["type"][] = ["Charger", "Cable", "Case", "Screen Protector", "Holder"];
export const compatibilityOptions = ["Universal", "iPhone", "iPhone 15", "iPhone 15 Pro", "Samsung S24", "Samsung S24 Ultra"];

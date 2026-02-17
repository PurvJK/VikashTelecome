import CategoryPage from "./CategoryPage";
import { smartDevicesProducts } from "@/data/smartDevicesProducts";

const SmartDevicesCategory = () => (
  <CategoryPage
    title="Smart Devices"
    description="Discover smartwatches, smart plugs, LED lamps and webcams."
    products={smartDevicesProducts}
  />
);

export default SmartDevicesCategory;

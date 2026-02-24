import CategoryPage from "./CategoryPage";
import { chargingProducts } from "@/data/chargingProducts";

const ChargingCategory = () => (
  <CategoryPage
    title="Charging"
    description="Explore wireless chargers, power banks, cables and more."
    products={chargingProducts}
  />
);

export default ChargingCategory;

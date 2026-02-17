import CategoryPage from "./CategoryPage";
import { accessoriesProducts } from "@/data/accessoriesProducts";

const AccessoriesCategory = () => (
  <CategoryPage
    title="Accessories"
    description="Browse phone holders, laptop stands, USB hubs, keyboards and more."
    products={accessoriesProducts}
  />
);

export default AccessoriesCategory;

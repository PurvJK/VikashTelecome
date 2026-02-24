import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useCategories } from "@/contexts/CategoriesContext";

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const { categories: allCategories } = useCategories();
  const categories = allCategories.filter((category) => category.status !== "inactive");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed top-16 lg:top-20 inset-x-0 mx-auto w-[700px] bg-background border border-border rounded-xl shadow-card-hover p-6 z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">All Categories</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.slug}`}
            onClick={onClose}
            className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-sm transition-all group"
          >
            <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
              {category.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {category.productCount} products
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Browse all categories to find the perfect product for you
        </p>
      </div>
    </motion.div>
  );
};

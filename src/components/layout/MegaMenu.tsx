import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { megaMenuCategories } from "@/data/categories";

const categoryRoutes: Record<string, string> = {
  Audio: "/collections/audio",
  Charging: "/collections/charging",
  "Smart Devices": "/collections/smart-devices",
  Accessories: "/collections/accessories",
};

interface MegaMenuProps {
  onClose: () => void;
}

export const MegaMenu = ({ onClose }: MegaMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed top-16 lg:top-20 left-1/2 -translate-x-1/2 w-[700px] bg-background border border-border rounded-xl shadow-card-hover p-6 z-50"
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
      <div className="grid grid-cols-4 gap-6">
        {megaMenuCategories.map((category) => (
          <div key={category.title}>
            <h4 className="font-semibold text-sm text-foreground mb-3">
              <Link
                to={categoryRoutes[category.title] || "#"}
                onClick={onClose}
                className="hover:text-primary transition-colors"
              >
                {category.title}
              </Link>
            </h4>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item}>
                  <Link
                    to={categoryRoutes[category.title] || "#"}
                    onClick={onClose}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Link
          to="#"
          onClick={onClose}
          className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View All Categories →
        </Link>
      </div>
    </motion.div>
  );
};

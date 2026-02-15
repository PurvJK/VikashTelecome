import { motion } from "framer-motion";
import { megaMenuCategories } from "@/data/categories";

export const MegaMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-background border border-border rounded-xl shadow-card-hover p-6 mt-2"
    >
      <div className="grid grid-cols-4 gap-6">
        {megaMenuCategories.map((category) => (
          <div key={category.title}>
            <h4 className="font-semibold text-sm text-foreground mb-3">{category.title}</h4>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
          View All Categories →
        </a>
      </div>
    </motion.div>
  );
};

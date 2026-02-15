import { motion } from "framer-motion";
import { megaMenuCategories } from "@/data/categories";
import { ChevronRight } from "lucide-react";

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 lg:hidden"
    >
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute left-0 top-0 bottom-0 w-[300px] bg-background shadow-card-hover overflow-y-auto"
      >
        <div className="p-6 pt-20">
          <nav className="space-y-1">
            {["New Arrivals", "Best Sellers", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={onClose}
                className="flex items-center justify-between py-3 px-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
              >
                <span className="font-medium">{item}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
            {megaMenuCategories.map((cat) => (
              <div key={cat.title} className="mb-4">
                <h4 className="font-semibold text-sm text-foreground mb-2">{cat.title}</h4>
                <div className="space-y-1 pl-2">
                  {cat.items.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={onClose}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

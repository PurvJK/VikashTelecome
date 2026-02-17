import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { megaMenuCategories } from "@/data/categories";

const categoryImages: Record<string, string> = {
  Audio: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
  Charging: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=80&h=80&fit=crop",
  "Smart Devices": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop",
  Accessories: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=80&h=80&fit=crop",
};

const categoryLinks: Record<string, string> = {
  Audio: "/collections/audio",
  Charging: "/collections/charging",
  "Smart Devices": "/collections/smart-devices",
  Accessories: "/collections/accessories",
};

interface Props {
  onClose: () => void;
}

export const MobileCategoriesPanel = ({ onClose }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (title: string) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 320 }}
      className="fixed inset-0 z-[60] bg-background overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Categories</h2>
        <button onClick={onClose} className="p-1">
          <X className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Category List */}
      <div className="divide-y divide-border">
        {megaMenuCategories.map((cat) => (
          <div key={cat.title}>
            <button
              onClick={() => toggle(cat.title)}
              className="flex items-center w-full px-5 py-4 gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden shrink-0">
                <img
                  src={categoryImages[cat.title] || "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=80&h=80&fit=crop"}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="flex-1 text-left text-sm font-bold uppercase text-foreground tracking-wide">
                {cat.title}
              </span>
              {expanded === cat.title ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {expanded === cat.title && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden bg-muted/30"
              >
                <div className="px-5 py-3 space-y-1">
                  {categoryLinks[cat.title] && (
                    <Link
                      to={categoryLinks[cat.title]}
                      onClick={onClose}
                      className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                    >
                      View All {cat.title}
                    </Link>
                  )}
                  {cat.items.map((item) => (
                    <Link
                      key={item}
                      to={categoryLinks[cat.title] || "#"}
                      onClick={onClose}
                      className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Extra links */}
      <div className="border-t border-border mt-2 divide-y divide-border">
        {["New Arrivals", "Support"].map((link) => (
          <Link
            key={link}
            to="#"
            onClick={onClose}
            className="block px-5 py-4 text-sm text-foreground hover:text-primary transition-colors"
          >
            {link}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

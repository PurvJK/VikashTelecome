import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, LayoutGrid, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { MobileCategoriesPanel } from "./MobileCategoriesPanel";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "WhatsApp", icon: MessageCircle, path: "#whatsapp" },
  { label: "Categories", icon: LayoutGrid, path: "#categories" },
  { label: "Log In", icon: User, path: "/login" },
  { label: "Cart", icon: ShoppingCart, path: "/cart" },
];

export const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const [showCategories, setShowCategories] = useState(false);

  const handleClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.label === "Categories") {
      e.preventDefault();
      setShowCategories(true);
    } else if (item.label === "Cart") {
      e.preventDefault();
      setIsCartOpen(true);
    } else if (item.label === "WhatsApp") {
      e.preventDefault();
      window.open("https://wa.me/919999999999", "_blank");
    }
  };

  return (
    <>
      <AnimatePresence>
        {showCategories && (
          <MobileCategoriesPanel onClose={() => setShowCategories(false)} />
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-[0_-2px_12px_-2px_hsl(var(--foreground)/0.08)] md:hidden">
        <div className="flex items-stretch">
          {navItems.map((item, i) => {
            const isActive = item.path !== "#categories" && pathname === item.path;
            const Icon = item.icon;
            const isCart = item.label === "Cart";

            return (
              <div key={item.label} className="flex flex-1">
                <Link
                  to={item.path === "#categories" ? pathname : item.path}
                  onClick={(e) => handleClick(item, e)}
                  className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] relative"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className="relative"
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {isCart && totalItems > 0 && (
                      <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
                {i < navItems.length - 1 && (
                  <div className="w-px bg-border/60 my-3" />
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

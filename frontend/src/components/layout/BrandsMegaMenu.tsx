import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface BrandsMegaMenuProps {
  onClose: () => void;
}

interface Brand {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  category?: string;
  image?: string;
  description?: string;
  productCount?: number;
}

export const BrandsMegaMenu = ({ onClose }: BrandsMegaMenuProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await api.fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Failed to load brands:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="fixed top-16 lg:top-20 inset-x-0 mx-auto w-[700px] bg-background border border-border rounded-xl shadow-card-hover p-6 z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">All Brands</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">Loading brands...</p>
        </div>
      ) : brands.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-muted-foreground">No brands available</p>
        </div>
      ) : (
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
        >
          {brands.map((brand) => (
            <Link
              key={brand.id || brand._id}
              to={`/brands/${brand.slug}`}
              onClick={onClose}
              className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-sm transition-all group"
            >
              <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                {brand.name}
              </h4>
              {brand.productCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {brand.productCount} products
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Browse all brands to discover your favorite products
        </p>
      </div>
    </motion.div>
  );
};

import { useEffect, useState } from "react";
import { products as fallbackProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";
import type { Product } from "@/data/products";

export const FeaturedProducts = () => {
  const [items, setItems] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    let isMounted = true;

    api.fetchProducts({ limit: 8, sort: "rating:desc" })
      .then((data) => {
        if (isMounted && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-12 lg:py-16 bg-surface">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked deals just for you</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

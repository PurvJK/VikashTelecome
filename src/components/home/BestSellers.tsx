import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bestSellers, newArrivals } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductSliderProps {
  title: string;
  subtitle: string;
  products: typeof bestSellers;
  id?: string;
}

const ProductSlider = ({ title, subtitle, products, id }: ProductSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id={id} className="py-12 lg:py-16">
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{title}</h2>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, i) => (
            <div key={product.id} className="min-w-[220px] sm:min-w-[260px] snap-start">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const BestSellers = () => (
  <ProductSlider
    id="best-sellers"
    title="Best Sellers"
    subtitle="Our most popular products"
    products={bestSellers}
  />
);

export const NewArrivalsSection = () => (
  <ProductSlider
    id="new-arrivals"
    title="New Arrivals"
    subtitle="Fresh drops you'll love"
    products={newArrivals}
  />
);

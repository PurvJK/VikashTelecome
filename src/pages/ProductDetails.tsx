import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getProductDetail, getRelatedProducts } from "@/data/productDetails";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isMobile = useIsMobile();

  const product = id ? getProductDetail(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
            <Link to="/" className="text-primary font-semibold hover:underline">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Proceeding to Checkout",
      description: `${product.title} added. Redirecting...`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1 pt-20 lg:pt-24 pb-24 md:pb-12">
        {/* Breadcrumb */}
        <div className="container-main py-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="capitalize">{product.category.replace(/-/g, " ")}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>

        {/* Main product section */}
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <ImageGallery images={product.images} title={product.title} />

            {/* Right: Product Info */}
            <div className="space-y-5">
              {/* Brand */}
              <Link
                to="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                {product.brand}
              </Link>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 bg-primary/10 px-2 py-1 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="text-sm font-semibold text-primary">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-badge-new bg-accent px-2 py-0.5 rounded-md">
                    {product.discount}% off
                  </span>
                </div>
                {product.emi && (
                  <p className="text-xs text-muted-foreground">{product.emi}</p>
                )}
                <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.availability === "In Stock" ? "bg-badge-new" : "bg-destructive"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    product.availability === "In Stock" ? "text-badge-new" : "text-destructive"
                  }`}
                >
                  {product.availability}
                </span>
              </div>

              {/* Short description */}
              <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Quantity + Actions */}
              <div className="space-y-4">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                  >
                    <Zap className="w-5 h-5" />
                    Buy Now
                  </motion.button>
                </div>

                {/* Wishlist */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast({
                      title: wishlisted ? "Removed from Wishlist" : "Added to Wishlist",
                      description: product.title,
                    });
                  }}
                  className={`w-full py-3 border rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
                    wishlisted
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50 text-foreground/70 hover:text-primary"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-primary" : ""}`} />
                  {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                </motion.button>
              </div>

              {/* Delivery + Return */}
              <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Delivery</p>
                    <p className="text-xs text-muted-foreground">{product.deliveryInfo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Returns</p>
                    <p className="text-xs text-muted-foreground">{product.returnPolicy}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Warranty</p>
                    <p className="text-xs text-muted-foreground">1 Year Manufacturer Warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-main mt-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div className="container-main mt-12">
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      {/* Mobile sticky bottom bar */}
      {isMobile && (
        <div className="fixed bottom-16 left-0 right-0 bg-background border-t border-border p-3 flex items-center gap-3 z-40">
          <div className="flex-1">
            <span className="text-lg font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through ml-2">₹{product.mrp.toLocaleString()}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-sm"
          >
            Add to Cart
          </motion.button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;

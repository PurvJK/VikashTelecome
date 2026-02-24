import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const CheckoutCancel = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1 container-main py-20 text-center">
      <h1 className="text-2xl font-bold mb-3">Order cancelled</h1>
      <p className="text-muted-foreground mb-6">Your order was not completed. You can return to checkout and try again.</p>
      <Link to="/checkout" className="text-primary font-semibold">Back to checkout</Link>
    </main>
    <Footer />
  </div>
);

export default CheckoutCancel;

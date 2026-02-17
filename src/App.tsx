import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import AudioCategory from "./pages/AudioCategory";
import ChargingCategory from "./pages/ChargingCategory";
import SmartDevicesCategory from "./pages/SmartDevicesCategory";
import AccessoriesCategory from "./pages/AccessoriesCategory";
import NotFound from "./pages/NotFound";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections/audio" element={<AudioCategory />} />
              <Route path="/collections/charging" element={<ChargingCategory />} />
              <Route path="/collections/smart-devices" element={<SmartDevicesCategory />} />
              <Route path="/collections/accessories" element={<AccessoriesCategory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

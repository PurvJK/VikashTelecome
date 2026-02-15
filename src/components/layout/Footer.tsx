import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  "Quick Links": ["Home", "About Us", "Contact", "Blog", "FAQs"],
  "Customer Service": ["Track Order", "Returns", "Shipping Policy", "Privacy Policy", "Terms of Service"],
  "Categories": ["Speakers", "Earbuds", "Headphones", "Chargers", "Smartwatches"],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">
                Tech<span className="text-primary">Store</span>
              </span>
            </a>
            <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted destination for premium electronics and gadgets. Quality products, competitive prices, and exceptional service.
            </p>
            <div className="space-y-2 text-sm text-background/60">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> 123 Tech Street, Mumbai, India</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> support@techstore.com</div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-background/10">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">© 2026 TechStore. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

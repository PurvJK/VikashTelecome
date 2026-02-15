import { motion } from "framer-motion";

export const PromoBanner = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-8 lg:p-12 flex flex-col justify-center min-h-[200px] lg:min-h-[280px]"
          >
            <span className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider mb-2">Limited Offer</span>
            <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3">Up to 60% Off</h3>
            <p className="text-primary-foreground/80 text-sm mb-5 max-w-xs">
              Premium wireless earbuds and speakers at unbeatable prices
            </p>
            <div>
              <button className="px-6 py-2.5 bg-background text-foreground font-semibold text-sm rounded-xl hover:bg-background/90 transition-colors">
                Shop Now
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-foreground p-8 lg:p-12 flex flex-col justify-center min-h-[200px] lg:min-h-[280px]"
          >
            <span className="text-primary text-sm font-medium uppercase tracking-wider mb-2">New Collection</span>
            <h3 className="text-2xl lg:text-3xl font-bold text-background mb-3">Smart Wearables</h3>
            <p className="text-background/60 text-sm mb-5 max-w-xs">
              Explore our latest smartwatches and fitness trackers
            </p>
            <div>
              <button className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary-hover transition-colors">
                Explore
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

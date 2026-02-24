import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-primary to-secondary">
      <div className="container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
            Stay in the Loop
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Subscribe to get exclusive deals, new arrivals, and tech tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl bg-background/15 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 focus:outline-none focus:border-primary-foreground/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-background text-foreground font-semibold rounded-xl hover:bg-background/90 transition-colors flex items-center justify-center gap-2"
            >
              {submitted ? "Subscribed! ✓" : (
                <>
                  Subscribe <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

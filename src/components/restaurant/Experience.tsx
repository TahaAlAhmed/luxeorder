import { motion } from "framer-motion";
import { Clock, Truck, Sparkles, Award } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "Chef-Crafted", desc: "Recipes refined over generations, plated for today." },
  { icon: Truck, title: "Swift Delivery", desc: "Hot from our kitchen to your door across Baghdad." },
  { icon: Clock, title: "Open Daily", desc: "9:00 AM – 12:00 AM, every day of the week." },
  { icon: Award, title: "Premium Sourcing", desc: "Only the finest local & imported ingredients." },
];

export function Experience() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">
            — The Experience —
          </p>
          <h2
            className="text-3xl sm:text-5xl font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Hospitality, perfected.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6 hover:border-gold/40 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(212,175,55,0.35)]"
            >
              <div className="w-11 h-11 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition">
                <f.icon className="w-4.5 h-4.5 text-gold" strokeWidth={1.6} />
              </div>
              <h3
                className="text-lg font-light tracking-tight"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {f.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] text-white/55 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

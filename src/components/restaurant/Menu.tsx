import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { MENU, CATEGORIES, type Category, type MenuItem } from "@/lib/restaurant-data";
import { cart } from "@/lib/cart-store";
import { useLang, t } from "@/lib/i18n";

function formatIQD(n: number) {
  return n.toLocaleString("en-US");
}

function ItemImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-white/5">
      {!loaded && <div className="absolute inset-0 shimmer" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function Card({ item, lang }: { item: MenuItem; lang: "en" | "ar" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 p-3 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(212,175,55,0.35)]"
    >
      <div className="relative overflow-hidden rounded-xl">
        <ItemImage src={item.image} alt={item.name[lang]} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>
      <div className="px-1 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="text-[17px] font-light leading-snug tracking-tight"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {item.name[lang]}
          </h3>
          <button
            onClick={() => cart.add(item)}
            aria-label="Add to cart"
            className="shrink-0 w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-transform shadow-[0_0_20px_-4px_rgba(212,175,55,0.6)]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
        <p className="mt-1.5 text-[12.5px] text-white/55 leading-relaxed line-clamp-2">
          {item.description[lang]}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-gold text-sm font-medium tracking-wide">
            {formatIQD(item.price)}
          </span>
          <span className="text-white/30 text-[10px] tracking-[0.2em]">IQD</span>
          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}


export function Menu() {
  const [lang] = useLang();
  const d = t[lang];
  const [active, setActive] = useState<Category>("breakfast");
  const items = MENU.filter((i) => i.category === active);

  return (
    <section id="menu" className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-3">— {d.ourMenu} —</p>
          <h2
            className="text-3xl sm:text-5xl font-light"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {d.menuSub}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-full border border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar max-w-full">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`relative px-4 sm:px-5 h-10 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  active === c.key ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {active === c.key && (
                  <motion.span
                    layoutId="tabpill"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {items.map((item) => (
              <Card key={item.id} item={item} lang={lang} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

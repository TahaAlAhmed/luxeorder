import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MENU } from "@/lib/restaurant-data";
import { cart } from "@/lib/cart-store";
import { useLang, t } from "@/lib/i18n";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export function Signature() {
  const [lang] = useLang();
  const d = t[lang];
  const items = MENU.filter((m) => m.signature);

  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-gold text-[11px] tracking-[0.4em] uppercase mb-3">
            ✦ {lang === "ar" ? "أطباق التوقيع" : "Signature"} ✦
          </p>
          <h2
            className="text-4xl sm:text-6xl font-light italic text-gold"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {lang === "ar" ? "روائعنا" : "Our masterpieces"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.name[lang]}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 45%, transparent 70%)",
                  }}
                />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-gold/30">
                  <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
                  <span className="text-[10px] tracking-[0.2em] text-gold uppercase">
                    Signature
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3
                    className="text-2xl sm:text-3xl font-light leading-tight"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {item.name[lang]}
                  </h3>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed line-clamp-2">
                    {item.description[lang]}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-gold text-sm tracking-wide">
                      {fmt(item.price)}{" "}
                      <span className="text-white/40 text-[10px] ml-1">IQD</span>
                    </p>
                    <button
                      onClick={() => cart.add(item)}
                      aria-label={d.addToCart}
                      className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center hover:scale-110 active:scale-95 transition shadow-[0_0_24px_-6px_rgba(212,175,55,0.7)]"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

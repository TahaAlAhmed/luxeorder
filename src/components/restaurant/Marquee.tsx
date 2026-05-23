import { motion } from "framer-motion";

const items = [
  "Slow-roasted Lamb",
  "★",
  "Saffron & Gold",
  "★",
  "Wood-Fired Masgouf",
  "★",
  "A5 Wagyu",
  "★",
  "Cardamom Coffee",
  "★",
  "Bilad al-Rafidayn",
  "★",
];

export function Marquee() {
  return (
    <div className="relative py-6 border-y border-white/5 bg-[#0c0c0c] overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 gap-10 pr-10"
        >
          {[...items, ...items, ...items, ...items].map((t, i) => (
            <span
              key={i}
              className={`text-2xl sm:text-4xl font-light tracking-wide ${
                t === "★" ? "text-gold" : "text-white/70"
              }`}
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {t === "★" ? "✦" : t}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { Phone, Globe } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

export function Header() {
  const [lang, setLang] = useLang();
  const d = t[lang];
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass fixed top-0 inset-x-0 z-40 border-b border-white/5"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center">
            <span className="text-gold font-serif text-lg leading-none">L</span>
          </div>
          <span className="text-[15px] tracking-[0.18em] font-medium">LAYALI</span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="h-9 px-3 rounded-full text-xs font-medium border border-white/10 hover:border-gold/60 hover:text-gold transition-colors flex items-center gap-1.5"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "العربية" : "English"}
          </button>
          <a
            href="tel:+9647729507073"
            className="h-9 px-3.5 rounded-full text-xs font-medium bg-gold text-black hover:opacity-90 transition flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{d.callUs}</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

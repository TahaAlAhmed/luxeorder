import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLang, t } from "@/lib/i18n";
import heroImg from "@/assets/hero-feast.jpg";

export function Hero() {
  const [lang] = useLang();
  const d = t[lang];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden flex items-center justify-center px-4 sm:px-6"
    >
      {/* Background image with parallax */}
      <motion.div
        aria-hidden
        style={{ scale }}
        className="absolute inset-0 -z-20"
      >
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Vignettes */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.85) 60%, rgba(10,10,10,0.98) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 -z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-3xl text-center pt-20 pb-16"
      >
        {/* Ornate top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-[10px] tracking-[0.5em] uppercase">
            Layali · ليالي
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Animated title */}
        <h1
          className="text-[64px] sm:text-[112px] leading-[0.95] tracking-tight font-light"
          style={{ fontFamily: '"Cormorant Garamond", "SF Pro Display", serif' }}
        >
          {"Taste the".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="inline-block"
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="italic text-gold inline-block"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            night.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 text-[13px] sm:text-sm text-white/65 max-w-md mx-auto leading-relaxed tracking-wide"
        >
          {d.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <a
            href="#menu"
            className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-gold text-black text-[13px] font-medium tracking-wide hover:opacity-90 transition shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)]"
          >
            {d.viewMenu}
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="tel:+9647729507073"
            className="inline-flex items-center h-12 px-6 rounded-full border border-white/15 text-[13px] tracking-wide hover:border-gold/60 hover:text-gold transition"
          >
            +964 772 950 7073
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 inset-x-0 flex justify-center z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

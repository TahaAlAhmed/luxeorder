import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/restaurant/Header";
import { Hero } from "@/components/restaurant/Hero";
import { Marquee } from "@/components/restaurant/Marquee";
import { Signature } from "@/components/restaurant/Signature";
import { Menu } from "@/components/restaurant/Menu";
import { Experience } from "@/components/restaurant/Experience";
import { CartBar } from "@/components/restaurant/CartBar";
import { CartDrawer } from "@/components/restaurant/CartDrawer";
import { WhatsAppFab } from "@/components/restaurant/WhatsAppFab";
import { useLang, t } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: Index,
});

function Footer() {
  const [lang] = useLang();
  return (
    <footer className="relative border-t border-white/5 px-4 sm:px-6 py-14 mt-12 text-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)",
        }}
      />
      <p
        className="text-gold text-2xl font-light italic"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        Layali
      </p>
      <div className="mt-4 flex items-center justify-center gap-2 text-gold/60 text-xs">
        <span>✦</span>
        <span className="tracking-[0.3em] uppercase">Baghdad · Iraq</span>
        <span>✦</span>
      </div>
      <p className="mt-4 text-xs text-white/45">{t[lang].footer}</p>
      <a
        href="tel:+9647729507073"
        className="mt-2 inline-block text-xs text-white/40 hover:text-gold transition"
      >
        +964 772 950 7073
      </a>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f7] pb-28 overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <Signature />
      <Menu />
      <Experience />
      <Footer />
      <CartBar />
      <CartDrawer />
      <WhatsAppFab />
    </main>
  );
}

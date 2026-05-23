import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { WHATSAPP_NUMBER } from "@/lib/restaurant-data";

export function WhatsAppFab() {
  const state = useCart();
  const count = Object.values(state.items).reduce((s, e) => s + e.qty, 0);
  // Hide when cart bar or drawer is visible to avoid overlap
  if (state.isOpen || count > 0) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello Layali, I'd like to ask about your menu.",
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)]"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: "rgba(37,211,102,0.35)", animationDuration: "2.4s" }}
      />
      <MessageCircle className="w-6 h-6 relative" strokeWidth={2} />
    </motion.a>
  );
}

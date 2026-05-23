import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, cart } from "@/lib/cart-store";
import { useLang, t } from "@/lib/i18n";
import { DELIVERY_FEE } from "@/lib/restaurant-data";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

export function CartBar() {
  const state = useCart();
  const [lang] = useLang();
  const d = t[lang];
  const entries = Object.values(state.items);
  const count = entries.reduce((s, e) => s + e.qty, 0);
  const subtotal = entries.reduce((s, e) => s + e.qty * e.item.price, 0);
  const total = subtotal + (count > 0 ? DELIVERY_FEE : 0);

  return (
    <AnimatePresence>
      {count > 0 && !state.isOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed bottom-4 inset-x-4 z-40 sm:max-w-md sm:mx-auto"
        >
          <button
            onClick={() => cart.setOpen(true)}
            className="w-full glass border border-gold/40 rounded-full h-14 px-5 flex items-center justify-between hover:border-gold transition group"
          >
            <span className="flex items-center gap-3">
              <span className="relative w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-gold text-[10px] font-bold flex items-center justify-center border border-gold">
                  {count}
                </span>
              </span>
              <span className="text-sm font-medium">{d.viewCart}</span>
            </span>
            <span className="text-gold text-sm font-medium">
              {fmt(total)} <span className="text-white/50 text-xs">IQD</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

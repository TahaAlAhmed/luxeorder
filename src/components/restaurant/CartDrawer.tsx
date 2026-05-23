import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart, cart } from "@/lib/cart-store";
import { useLang, t } from "@/lib/i18n";
import { DELIVERY_FEE, STORE_NAME, WHATSAPP_NUMBER } from "@/lib/restaurant-data";

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

type Step = "review" | "details";

export function CartDrawer() {
  const state = useCart();
  const [lang] = useLang();
  const d = t[lang];
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState({ name: "", phone: "", neighborhood: "" });

  const entries = Object.values(state.items);
  const count = entries.reduce((s, e) => s + e.qty, 0);
  const subtotal = entries.reduce((s, e) => s + e.qty * e.item.price, 0);
  const total = subtotal + (count > 0 ? DELIVERY_FEE : 0);

  useEffect(() => {
    if (!state.isOpen) setStep("review");
  }, [state.isOpen]);

  useEffect(() => {
    document.body.style.overflow = state.isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  const buildMessage = () => {
    const lines = entries
      .map((e) => `• ${e.qty} x ${e.item.name.en} — ${fmt(e.qty * e.item.price)} IQD`)
      .join("\n");
    const msg = `🌟 *NEW ORDER - ${STORE_NAME}*
--------------------------
👤 *Customer:* ${form.name}
📍 *Location:* ${form.neighborhood}
📞 *Phone:* ${form.phone}
--------------------------
📦 *Items:*
${lines}
--------------------------
💰 *Total Payable:* ${fmt(total)} IQD
--------------------------
⚡ *Please confirm this order!*`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const canSubmit =
    form.name.trim().length > 1 && form.phone.trim().length >= 7 && form.neighborhood.trim().length > 1;

  const waUrl = buildMessage();
  const handleConfirm: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!canSubmit) {
      e.preventDefault();
      return;
    }
    // Robust open: try window.open, fall back to top-level navigation
    e.preventDefault();
    try {
      const w = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!w) window.top!.location.href = waUrl;
    } catch {
      window.location.href = waUrl;
    }
    setTimeout(() => {
      cart.clear();
      cart.setOpen(false);
    }, 250);
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.setOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-[#0c0c0c] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                {step === "details" && (
                  <button
                    onClick={() => setStep("review")}
                    className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center"
                    aria-label={d.back}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <h3 className="text-sm font-medium tracking-wide">
                  {step === "review" ? d.review : d.deliveryDetails}
                </h3>
                <span className="text-xs text-white/40">
                  · {count} {count === 1 ? d.item : d.items}
                </span>
              </div>
              <button
                onClick={() => cart.setOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-white/5 flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step indicator */}
            <div className="px-5 pt-4">
              <div className="flex gap-1.5">
                <span className={`h-0.5 flex-1 rounded-full ${step === "review" ? "bg-gold" : "bg-gold/40"}`} />
                <span className={`h-0.5 flex-1 rounded-full ${step === "details" ? "bg-gold" : "bg-white/10"}`} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {entries.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-5 h-5 text-white/40" />
                  </div>
                  <p className="text-sm font-medium">{d.empty}</p>
                  <p className="text-xs text-white/50 mt-1">{d.addSomething}</p>
                </div>
              ) : step === "review" ? (
                <ul className="space-y-3">
                  {entries.map((e) => (
                    <li
                      key={e.item.id}
                      className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <img
                        src={e.item.image}
                        alt={e.item.name[lang]}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium truncate">{e.item.name[lang]}</p>
                          <button
                            onClick={() => cart.remove(e.item.id)}
                            className="text-white/40 hover:text-red-400 transition"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-gold mt-0.5">
                          {fmt(e.item.price)} <span className="text-white/40">IQD</span>
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-white/10">
                            <button
                              onClick={() => cart.decrement(e.item.id)}
                              className="w-7 h-7 flex items-center justify-center hover:text-gold"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs w-5 text-center">{e.qty}</span>
                            <button
                              onClick={() => cart.add(e.item)}
                              className="w-7 h-7 flex items-center justify-center hover:text-gold"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs font-medium">
                            {fmt(e.item.price * e.qty)}{" "}
                            <span className="text-white/40">IQD</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  <Field
                    label={d.name}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Ahmed Al-Rashid"
                  />
                  <Field
                    label={d.phone}
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="07XX XXX XXXX"
                  />
                  <Field
                    label={d.neighborhood}
                    value={form.neighborhood}
                    onChange={(v) => setForm({ ...form, neighborhood: v })}
                    placeholder="Karrada, Baghdad"
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            {entries.length > 0 && (
              <div className="border-t border-white/10 p-5 space-y-3 bg-[#0a0a0a]">
                <Row label={d.subtotal} value={`${fmt(subtotal)} IQD`} />
                <Row label={d.delivery} value={`${fmt(DELIVERY_FEE)} IQD`} muted />
                <div className="h-px bg-white/10" />
                <Row label={d.total} value={`${fmt(total)} IQD`} big />
                {step === "review" ? (
                  <button
                    onClick={() => setStep("details")}
                    className="w-full h-12 rounded-full bg-gold text-black text-sm font-medium hover:opacity-90 transition"
                  >
                    {d.checkout}
                  </button>
                ) : (
                  <>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleConfirm}
                      aria-disabled={!canSubmit}
                      className={`w-full h-12 rounded-full bg-gold text-black text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2 ${
                        !canSubmit ? "opacity-50" : "shadow-[0_10px_30px_-10px_rgba(212,175,55,0.7)]"
                      }`}
                    >
                      {d.confirm}
                    </a>
                    {!canSubmit && (
                      <p className="text-[11px] text-white/50 text-center">
                        Please fill in your name, phone and neighborhood.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-sm outline-none focus:border-gold/60 transition"
      />
    </label>
  );
}

function Row({
  label,
  value,
  muted,
  big,
}: {
  label: string;
  value: string;
  muted?: boolean;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${big ? "text-sm font-medium" : "text-xs"} ${muted ? "text-white/50" : "text-white/70"}`}>
        {label}
      </span>
      <span className={`${big ? "text-lg text-gold font-medium" : "text-xs"}`}>{value}</span>
    </div>
  );
}

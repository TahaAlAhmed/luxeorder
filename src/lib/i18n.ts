import { useState } from "react";
import { useSyncExternalStore } from "react";

type Lang = "en" | "ar";
let lang: Lang = "en";
const listeners = new Set<() => void>();

export function setLang(l: Lang) {
  lang = l;
  if (typeof document !== "undefined") {
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }
  listeners.forEach((cb) => cb());
}

export function useLang(): [Lang, (l: Lang) => void] {
  const cur = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => lang,
    () => lang,
  );
  return [cur, setLang];
}

export const t = {
  en: {
    tagline: "A modern Iraqi dining experience",
    orderNow: "Order Now",
    viewMenu: "View Menu",
    callUs: "Call Us",
    cart: "Cart",
    viewCart: "View Cart",
    items: "items",
    item: "item",
    empty: "Your cart is empty",
    addSomething: "Add something delicious from our menu",
    subtotal: "Subtotal",
    delivery: "Delivery",
    total: "Total",
    checkout: "Checkout",
    review: "Review Order",
    deliveryDetails: "Delivery Details",
    name: "Full Name",
    phone: "Phone Number",
    neighborhood: "Neighborhood / City",
    back: "Back",
    confirm: "Confirm Order via WhatsApp",
    addToCart: "Add to cart",
    ourMenu: "Our Menu",
    menuSub: "Crafted with passion. Delivered with elegance.",
    footer: "Open daily 9:00 AM – 12:00 AM • Baghdad, Iraq",
  },
  ar: {
    tagline: "تجربة طعام عراقية عصرية",
    orderNow: "اطلب الآن",
    viewMenu: "عرض القائمة",
    callUs: "اتصل بنا",
    cart: "السلة",
    viewCart: "عرض السلة",
    items: "عناصر",
    item: "عنصر",
    empty: "سلتك فارغة",
    addSomething: "أضف شيئاً لذيذاً من قائمتنا",
    subtotal: "المجموع الفرعي",
    delivery: "التوصيل",
    total: "الإجمالي",
    checkout: "إتمام الطلب",
    review: "مراجعة الطلب",
    deliveryDetails: "بيانات التوصيل",
    name: "الاسم الكامل",
    phone: "رقم الهاتف",
    neighborhood: "الحي / المدينة",
    back: "رجوع",
    confirm: "تأكيد الطلب عبر واتساب",
    addToCart: "أضف للسلة",
    ourMenu: "قائمتنا",
    menuSub: "صُنعت بشغف. تُقدَّم بأناقة.",
    footer: "مفتوح يومياً ٩:٠٠ صباحاً – ١٢:٠٠ منتصف الليل • بغداد، العراق",
  },
};

export type Dict = (typeof t)["en"];
export const _u = useState;

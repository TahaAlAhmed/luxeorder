import imgBenedict from "@/assets/dish-benedict.jpg";
import imgHalloumi from "@/assets/dish-halloumi.jpg";
import imgAvocado from "@/assets/dish-avocado.jpg";
import imgQuzi from "@/assets/dish-quzi.jpg";
import imgMasgouf from "@/assets/dish-masgouf.jpg";
import imgMixedGrill from "@/assets/dish-mixedgrill.jpg";
import imgWagyu from "@/assets/dish-wagyu.jpg";
import imgRisotto from "@/assets/dish-risotto.jpg";
import imgSeabass from "@/assets/dish-seabass.jpg";
import imgLatte from "@/assets/drink-latte.jpg";
import imgPomegranate from "@/assets/drink-pomegranate.jpg";
import imgTurkish from "@/assets/drink-turkish.jpg";

export type Category = "breakfast" | "lunch" | "dinner" | "drinks";

export type MenuItem = {
  id: string;
  category: Category;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number; // IQD
  image: string;
  signature?: boolean;
};

export const STORE_NAME = "Layali Restaurant";
export const WHATSAPP_NUMBER = "9647729507073";
export const DELIVERY_FEE = 3000; // IQD

export const MENU: MenuItem[] = [
  {
    id: "b1",
    category: "breakfast",
    name: { en: "Royal Eggs Benedict", ar: "بيض بنديكت الملكي" },
    description: {
      en: "Poached eggs, smoked salmon, hollandaise on toasted brioche.",
      ar: "بيض مسلوق، سلمون مدخّن، صلصة هولانديز على خبز بريوش.",
    },
    price: 18000,
    image: imgBenedict,
  },
  {
    id: "b2",
    category: "breakfast",
    name: { en: "Saj Halloumi Plate", ar: "صحن جبنة الحلوم" },
    description: {
      en: "Grilled halloumi, zaatar, olives, fresh saj bread.",
      ar: "حلوم مشوي، زعتر، زيتون، خبز ساج.",
    },
    price: 14000,
    image: imgHalloumi,
  },
  {
    id: "b3",
    category: "breakfast",
    name: { en: "Avocado Toast Deluxe", ar: "توست الأفوكادو الفاخر" },
    description: {
      en: "Smashed avocado, chili oil, soft egg, sourdough.",
      ar: "أفوكادو مهروس، زيت فلفل، بيض طري، خبز عجين مخمر.",
    },
    price: 12000,
    image: imgAvocado,
  },
  {
    id: "l1",
    category: "lunch",
    name: { en: "Lamb Quzi", ar: "قوزي لحم" },
    description: {
      en: "Slow-roasted lamb, saffron rice, almonds, raisins.",
      ar: "لحم خروف مشوي ببطء، رز زعفران، لوز، زبيب.",
    },
    price: 32000,
    image: imgQuzi,
    signature: true,
  },
  {
    id: "l2",
    category: "lunch",
    name: { en: "Masgouf Tigris", ar: "مسگوف دجلة" },
    description: {
      en: "Iraqi grilled fish, tomato, onion, fresh herbs.",
      ar: "سمك مسگوف عراقي، طماطم، بصل، أعشاب.",
    },
    price: 38000,
    image: imgMasgouf,
    signature: true,
  },
  {
    id: "l3",
    category: "lunch",
    name: { en: "Mixed Grill Platter", ar: "صحن مشاوي مشكّل" },
    description: {
      en: "Lamb chops, kofta, shish tawook, grilled vegetables.",
      ar: "ريش لحم، كفتة، شيش طاووق، خضار مشوية.",
    },
    price: 45000,
    image: imgMixedGrill,
  },
  {
    id: "d1",
    category: "dinner",
    name: { en: "Wagyu Steak", ar: "ستيك واغيو" },
    description: {
      en: "Grade A5 wagyu, truffle butter, pommes purée.",
      ar: "واغيو A5، زبدة كمأة، بطاطس مهروسة.",
    },
    price: 95000,
    image: imgWagyu,
    signature: true,
  },
  {
    id: "d2",
    category: "dinner",
    name: { en: "Saffron Risotto", ar: "ريزوتو الزعفران" },
    description: {
      en: "Arborio rice, saffron, parmesan, gold leaf.",
      ar: "رز أربوريو، زعفران، بارميزان، رقائق ذهب.",
    },
    price: 28000,
    image: imgRisotto,
  },
  {
    id: "d3",
    category: "dinner",
    name: { en: "Sea Bass Acqua Pazza", ar: "قاروص بصلصة الأكوا باتزا" },
    description: {
      en: "Whole sea bass, cherry tomatoes, capers, white wine.",
      ar: "قاروص كامل، طماطم كرزية، كبر، نبيذ أبيض.",
    },
    price: 52000,
    image: imgSeabass,
  },
  {
    id: "dr1",
    category: "drinks",
    name: { en: "Saffron Cardamom Latte", ar: "لاتيه الزعفران والهيل" },
    description: {
      en: "Espresso, steamed milk, saffron, cardamom.",
      ar: "إسبريسو، حليب، زعفران، هيل.",
    },
    price: 8000,
    image: imgLatte,
  },
  {
    id: "dr2",
    category: "drinks",
    name: { en: "Pomegranate Mint Cooler", ar: "مشروب الرمان بالنعناع" },
    description: {
      en: "Fresh pomegranate, mint, lime, sparkling.",
      ar: "رمان طازج، نعناع، ليم، فوارة.",
    },
    price: 7000,
    image: imgPomegranate,
  },
  {
    id: "dr3",
    category: "drinks",
    name: { en: "Turkish Coffee", ar: "قهوة تركية" },
    description: {
      en: "Traditional brew, cardamom, Turkish delight.",
      ar: "تحضير تقليدي، هيل، راحة.",
    },
    price: 5000,
    image: imgTurkish,
  },
];

export const CATEGORIES: { key: Category; en: string; ar: string }[] = [
  { key: "breakfast", en: "Breakfast", ar: "الفطور" },
  { key: "lunch", en: "Lunch", ar: "الغداء" },
  { key: "dinner", en: "Dinner", ar: "العشاء" },
  { key: "drinks", en: "Drinks", ar: "المشروبات" },
];

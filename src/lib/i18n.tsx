import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

export const t: Dict = {
  navHome: { en: "Home", ar: "الرئيسية" },
  navCategories: { en: "Categories", ar: "كل الفئات" },
  navProducts: { en: "Products", ar: "المنتجات" },
  navLocation: { en: "Location", ar: "الموقع" },
  toggle: { en: "العربية", ar: "English" },
  heroTitle: { en: "Everything you need, right around the corner!", ar: "كل ما تحتاجه، بجانبك تماماً!" },
  heroSub: { en: "Daily essentials delivered fresh and fast from your neighborhood grocery.", ar: "مستلزماتك اليومية طازجة وسريعة من بقالة الحي." },
  delivery: { en: "5–10 MIN DELIVERY", ar: "توصيل خلال ٥-١٠ دقائق" },
  shopNow: { en: "Shop Now", ar: "تسوق الآن" },
  callUs: { en: "Call Us", ar: "اتصل بنا" },
  searchPh: { en: "Search categories, products...", ar: "ابحث عن الفئات والمنتجات..." },
  categoriesTitle: { en: "Browse Categories", ar: "تصفح الفئات" },
  categoriesSub: { en: "From snacks to essentials — find it all in one place.", ar: "من الوجبات الخفيفة إلى الأساسيات — اعثر على كل شيء في مكان واحد." },
  filterAll: { en: "All", ar: "الكل" },
  filterFood: { en: "Food", ar: "طعام" },
  filterNonFood: { en: "Non-Food", ar: "غير غذائي" },
  whyTitle: { en: "Why Al Ahebba", ar: "لماذا الأحبة" },
  why1: { en: "Lightning Delivery", ar: "توصيل سريع" },
  why1d: { en: "From our shelves to your door in under 10 minutes.", ar: "من رفوفنا إلى بابك في أقل من ١٠ دقائق." },
  why2: { en: "Fresh Daily", ar: "طازج يومياً" },
  why2d: { en: "Bread, dairy, and produce restocked every morning.", ar: "الخبز والألبان والخضار يتم تجديدها كل صباح." },
  why3: { en: "Everything in One Place", ar: "كل شيء في مكان واحد" },
  why3d: { en: "12+ categories covering food, home, and personal care.", ar: "أكثر من ١٢ فئة تشمل الطعام والمنزل والعناية الشخصية." },
  whatsapp: { en: "Order via WhatsApp", ar: "اطلب عبر واتساب" },
  visit: { en: "Visit Our Store", ar: "زر متجرنا" },
  contact: { en: "Contact", ar: "تواصل معنا" },
  follow: { en: "Follow Us", ar: "تابعنا" },
  address: { en: "Neighborhood Plaza, Main Street", ar: "بلازا الحي، الشارع الرئيسي" },
  tagline: { en: "Daily Essentials, Always Near You", ar: "مستلزماتك اليومية، دائماً بالقرب منك" },
  rights: { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t) => string }>({
  lang: "en", setLang: () => {}, tr: (k) => t[k].en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);
  return (
    <Ctx.Provider value={{ lang, setLang, tr: (k) => t[k][lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export const useI18n = () => useContext(Ctx);

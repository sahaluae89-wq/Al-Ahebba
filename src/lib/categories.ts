export type Category = {
  id: string;
  en: string;
  ar: string;
  image: string;
  type: "food" | "nonfood";
};

export const categories: Category[] = [
  { id: "fresh", en: "Fresh fruits & vegetables", ar: "طازج", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091256/14_hdarzu.png", type: "food" },
  { id: "dairy", en: "Dairy product", ar: "منتجات الألبان", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778840018/Screenshot_2026-05-15_153822_wresqy.png", type: "food" },
  { id: "chips", en: "Chips", ar: "شيبس", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091366/file_0000000025ec71f4ae82654036ae44e5_qiep9l.png", type: "food" },
  { id: "icecream", en: "Ice Cream", ar: "آيس كريم", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091365/2_s6fd22.png", type: "food" },
  { id: "candy", en: "Candy", ar: "حلويات", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091366/3_mr00cf.png", type: "food" },
  { id: "bread", en: "Croissant & Arabic Bread", ar: "كرواسون وخبز عربي", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091366/4_q2pae6.png", type: "food" },
  { id: "drinks", en: "Drinks", ar: "مشروبات", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091362/5_eolh9d.png", type: "food" },
  { id: "cooking", en: "Cooking Items", ar: "مواد طبخ", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091363/7_uf0zte.png", type: "food" },
  { id: "spreads", en: "Spreads", ar: "مربى وشوكولاتة", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778092557/WhatsApp_Image_2026-05-06_at_11.13.32_PM_dr7jd9.jpg", type: "food" },
  { id: "masala", en: "Masala", ar: "بهارات", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091361/10_z0phpp.png", type: "food" },
  { id: "cosmetics", en: "Cosmetics", ar: "مستحضرات تجميل", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091357/8_pnui4z.png", type: "nonfood" },
  { id: "detergent", en: "Detergent", ar: "منظفات", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091358/9_ccjuer.png", type: "nonfood" },
  { id: "toys", en: "Toys", ar: "ألعاب", image: "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778091357/11_alpj0u.png", type: "nonfood" },
];

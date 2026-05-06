export type Category = {
  id: string;
  en: string;
  ar: string;
  emoji: string;
  type: "food" | "nonfood";
};

export const categories: Category[] = [
  { id: "chips", en: "Chips", ar: "شيبس", emoji: "🥔", type: "food" },
  { id: "icecream", en: "Ice Cream", ar: "آيس كريم", emoji: "🍦", type: "food" },
  { id: "cake", en: "Cake", ar: "كيك", emoji: "🍰", type: "food" },
  { id: "candy", en: "Candy", ar: "حلويات", emoji: "🍬", type: "food" },
  { id: "bread", en: "Croissant & Arabic Bread", ar: "كرواسون وخبز عربي", emoji: "🥐", type: "food" },
  { id: "drinks", en: "Drinks", ar: "مشروبات", emoji: "🥤", type: "food" },
  { id: "cooking", en: "Cooking Items", ar: "مواد طبخ", emoji: "🍚", type: "food" },
  { id: "spreads", en: "Spreads", ar: "مربى وشوكولاتة", emoji: "🍯", type: "food" },
  { id: "masala", en: "Masala", ar: "بهارات", emoji: "🌶️", type: "food" },
  { id: "cosmetics", en: "Cosmetics", ar: "مستحضرات تجميل", emoji: "🧴", type: "nonfood" },
  { id: "detergent", en: "Detergent", ar: "منظفات", emoji: "🧼", type: "nonfood" },
  { id: "toys", en: "Toys", ar: "ألعاب", emoji: "🧸", type: "nonfood" },
];

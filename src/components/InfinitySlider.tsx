import { useI18n } from "@/lib/i18n";
import { categories } from "@/lib/categories";

export default function InfinitySlider() {
  const { lang } = useI18n();
  const items = [...categories, ...categories];
  return (
    <div className="slider-mask relative overflow-hidden border-y-4 border-forest bg-cream py-6">
      <div
        className={`flex w-max gap-4 ${lang === "ar" ? "animate-scroll-rtl" : "animate-scroll-ltr"}`}
      >
        {items.map((c, i) => (
          <a
            key={`${c.id}-${i}`}
            href="#categories"
            className="group flex min-w-[180px] items-center gap-3 rounded-full border-2 border-forest bg-white px-5 py-3 shadow-sm transition hover:bg-forest hover:text-sun"
          >
            <span className="text-3xl">{c.emoji}</span>
            <span className="font-display text-sm font-bold text-forest-deep group-hover:text-sun">
              {lang === "ar" ? c.ar : c.en}
            </span>
          </a>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

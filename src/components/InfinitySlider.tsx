import { useI18n } from "@/lib/i18n";
import { categories } from "@/lib/categories";
import { Link } from "@tanstack/react-router";

export default function InfinitySlider() {
  const { lang } = useI18n();
  const items = [...categories, ...categories];
  return (
    <div className="slider-mask relative overflow-hidden border-y-4 border-forest bg-cream py-6">
      <div
        className={`flex w-max ${lang === "ar" ? "animate-scroll-rtl" : "animate-scroll-ltr"}`}
      >
        {items.map((c, i) => (
          <div key={`${c.id}-${i}`} className="px-2">
            <Link
              to="/products"
              search={{ category: c.id }}
              className="group flex min-w-[180px] items-center gap-3 rounded-full border-2 border-forest bg-white px-5 py-3 shadow-sm transition hover:bg-forest hover:text-sun"
            >
              <img src={c.image} alt={c.en} className="h-10 w-10 object-contain" />
              <span className="font-display text-sm font-bold text-forest-deep group-hover:text-sun">
                {lang === "ar" ? c.ar : c.en}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
    </div>
  );
}

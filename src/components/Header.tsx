import { useI18n } from "@/lib/i18n";
import { Languages, MapPin, Menu, ShoppingBasket } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { lang, setLang, tr } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-forest text-primary-foreground shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <a href="#top" className="flex items-center gap-2 font-display font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sun text-forest-deep shadow-md">
            <ShoppingBasket className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="text-lg leading-tight md:text-xl">
            Al Ahebba
            <span className="block text-[10px] font-medium tracking-widest text-sun md:text-xs">GROCERY</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#top" className="text-sm font-semibold transition hover:text-sun">{tr("navHome")}</a>
          <a href="#categories" className="text-sm font-semibold transition hover:text-sun">{tr("navCategories")}</a>
          <a href="#location" className="inline-flex items-center gap-1 text-sm font-semibold transition hover:text-sun">
            <MapPin className="h-4 w-4" />{tr("navLocation")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-sm font-bold text-forest-deep shadow-md transition hover:scale-105 hover:bg-sun-deep"
          >
            <Languages className="h-4 w-4" />
            {tr("toggle")}
          </button>
          <button onClick={() => setOpen(!open)} className="rounded-md p-2 md:hidden" aria-label="menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-forest-deep px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#top" onClick={() => setOpen(false)} className="text-sm font-semibold">{tr("navHome")}</a>
            <a href="#categories" onClick={() => setOpen(false)} className="text-sm font-semibold">{tr("navCategories")}</a>
            <a href="#location" onClick={() => setOpen(false)} className="text-sm font-semibold">{tr("navLocation")}</a>
          </nav>
        </div>
      )}
    </header>
  );
}

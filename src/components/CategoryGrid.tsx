import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { categories } from "@/lib/categories";
import { LayoutGrid } from "lucide-react";

type Filter = "all" | "food" | "nonfood";

export default function CategoryGrid() {
  const { lang, tr } = useI18n();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const results = useMemo(() => {
    return categories.filter((c) => {
      if (filter !== "all" && c.type !== filter) return false;
      const needle = q.trim().toLowerCase();
      if (!needle) return true;
      return c.en.toLowerCase().includes(needle) || c.ar.includes(needle);
    });
  }, [q, filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: tr("filterAll") },
    { id: "food", label: tr("filterFood") },
    { id: "nonfood", label: tr("filterNonFood") },
  ];

  return (
    <section id="categories" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold text-forest-deep md:text-5xl">
            {tr("categoriesTitle")}
          </h2>
          <p className="mt-3 text-muted-foreground">{tr("categoriesSub")}</p>
        </div>

        <div className="mb-6 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground ltr:left-4 rtl:right-4" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr("searchPh")}
              className="w-full rounded-full border-2 border-forest/20 bg-white py-4 text-sm shadow-sm outline-none transition focus:border-forest ltr:pl-12 ltr:pr-5 rtl:pl-5 rtl:pr-12"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  filter === f.id
                    ? "bg-forest text-sun shadow-md"
                    : "bg-muted text-forest-deep hover:bg-forest/10"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <Link
            to="/products"
            search={{ category: "all" }}
            className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-forest/15 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-forest hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 transition group-hover:scale-110">
              <LayoutGrid className="h-8 w-8 text-forest" />
            </div>
            <span className="mt-3 font-display text-sm font-bold leading-tight text-forest-deep">
              {tr("filterAll")}
            </span>
          </Link>

          {results.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id }}
              className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-forest/15 bg-white p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-forest hover:shadow-xl"
            >
              <img src={c.image} alt={c.en} className="h-16 w-16 object-contain transition group-hover:scale-110" />
              <span className="mt-3 font-display text-sm font-bold leading-tight text-forest-deep">
                {lang === "ar" ? c.ar : c.en}
              </span>
              <span className="absolute top-2 rounded-full bg-sun/80 px-2 py-0.5 text-[10px] font-bold uppercase text-forest-deep ltr:right-2 rtl:left-2">
                {c.type === "food" ? tr("filterFood") : tr("filterNonFood")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

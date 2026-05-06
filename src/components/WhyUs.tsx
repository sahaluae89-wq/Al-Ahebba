import { useI18n } from "@/lib/i18n";
import { Clock, Leaf, Store } from "lucide-react";

export default function WhyUs() {
  const { tr } = useI18n();
  const items = [
    { icon: Clock, t: tr("why1"), d: tr("why1d") },
    { icon: Leaf, t: tr("why2"), d: tr("why2d") },
    { icon: Store, t: tr("why3"), d: tr("why3d") },
  ];
  return (
    <section className="bg-forest-deep py-20 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="text-center font-display text-3xl font-extrabold md:text-5xl">
          {tr("whyTitle")}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sun text-forest-deep shadow-md">
                <Icon className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

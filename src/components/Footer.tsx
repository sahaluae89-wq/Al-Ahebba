import { useI18n } from "@/lib/i18n";
import { Facebook, Instagram, MapPin, Phone, ShoppingBasket } from "lucide-react";

export default function Footer() {
  const { tr } = useI18n();
  return (
    <footer id="location" className="bg-forest text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border-4 border-sun shadow-2xl">
            <iframe
              title="map"
              className="h-72 w-full md:h-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=55.27%2C25.19%2C55.30%2C25.21&layer=mapnik"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{tr("visit")}</h2>
            <p className="mt-2 text-sun">{tr("tagline")}</p>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-sun" />
                <span>{tr("address")}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-sun" />
                <a href="tel:+0000000000" className="hover:text-sun">+000 000 0000</a>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-sun">{tr("follow")}</p>
              <div className="mt-3 flex gap-3">
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-sun hover:text-forest-deep"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-sun hover:text-forest-deep"><Facebook className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <div className="inline-flex items-center gap-2">
            <ShoppingBasket className="h-4 w-4 text-sun" />
            <span className="font-bold">Al Ahebba Grocery</span>
          </div>
          <span>© {new Date().getFullYear()} — {tr("rights")}</span>
        </div>
      </div>
    </footer>
  );
}

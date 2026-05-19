import { useI18n } from "@/lib/i18n";
import { MapPin, Phone, ShoppingBasket } from "lucide-react";

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
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sun" />
                <a 
                  href="https://maps.app.goo.gl/ydGYwhJ5e3Dy6tRNA" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-sun transition-colors"
                >
                  41 Ras Abu Al Abyad St - Al Mu'tarid - Hai Suroor - Abu Dhabi - United Arab Emirates.
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-sun" />
                <a href="tel:+971582082900" className="hover:text-sun">+971 58 208 2900</a>
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

import { useI18n } from "@/lib/i18n";
import { Phone, ShoppingBag, Sparkles } from "lucide-react";

export default function Hero() {
  const { tr } = useI18n();
  return (
    <section id="top" className="relative overflow-hidden bg-forest text-primary-foreground">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sun blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sun-deep blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:px-8 md:py-24">
        <div className="flex flex-col justify-center">

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl">
            {tr("heroTitle")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">{tr("heroSub")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-bold text-forest-deep shadow-xl transition hover:scale-[1.03] hover:bg-sun-deep"
            >
              <ShoppingBag className="h-5 w-5" /> {tr("shopNow")}
            </a>
            <a
              href="tel:+971582082900"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" /> {tr("callUs")}
            </a>
          </div>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20">
            <img
              src="https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778092190/ChatGPT_Image_May_6_2026_11_59_09_PM_pfw3bj.png"
              alt="Al Ahebba Grocery"
              className="h-auto w-full max-w-md object-cover"
            />
          </div>
          <div className="animate-float absolute -right-2 -top-2 grid h-32 w-32 place-items-center rounded-full bg-sun text-center font-display font-extrabold text-forest-deep shadow-2xl ring-4 ring-white/30">
            <span className="px-2 text-sm leading-tight">{tr("delivery")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

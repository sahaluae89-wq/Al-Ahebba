import { useI18n } from "@/lib/i18n";
import { Phone, ShoppingBag, Sparkles, Clock3, Bike } from "lucide-react";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function Hero() {
  const { tr } = useI18n();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-forest text-primary-foreground"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sun opacity-20 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sun-deep opacity-20 blur-3xl" />
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-20 w-full md:h-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#13322B"
            fillOpacity="1"
            d="M0,192L60,197.3C120,203,240,213,360,218.7C480,224,600,224,720,208C840,192,960,160,1080,165.3C1200,171,1320,213,1380,234.7L1440,256L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-14 md:grid-cols-2 md:px-10 md:py-24">
        {/* LEFT CONTENT */}
        <div className="z-10">
          {/* Delivery Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <Bike className="h-4 w-4 text-sun" />
            <span>{tr("fastDelivery") || "Fast Grocery Delivery"}</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            Fresh Groceries <br />
            <span className="text-sun">Delivered in Minutes</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Order groceries, fruits, vegetables, and daily essentials with
            lightning-fast doorstep delivery.
          </p>

          {/* Feature Pills */}
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <Clock3 className="h-4 w-4 text-sun" />
              30 Min Delivery
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-sun" />
              Fresh Products
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3 font-bold text-forest-deep shadow-2xl transition duration-300 hover:scale-105 hover:bg-sun-deep"
            >
              <ShoppingBag className="h-5 w-5" />
              {tr("shopNow")}
            </a>

            <a
              href="tel:+971582082900"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-bold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              {tr("callUs")}
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex items-center justify-center">
          {/* Main Image */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <img
              src={optimizeCloudinaryUrl(
                "https://res.cloudinary.com/dbdjjz1kl/image/upload/v1778840980/ChatGPT_Image_May_7_2026_12_46_16_AM_cermny.png",
                800
              )}
              alt="Fast Grocery Delivery"
              className="w-full max-w-lg object-cover"
            />
          </div>

          {/* Floating Card 1 */}
          <div className="absolute left-0 top-10 z-20 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-md md:block">
            <p className="text-sm text-white/70">Delivery Time</p>
            <h3 className="mt-1 text-2xl font-extrabold text-sun">
              30 Min
            </h3>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-5 right-0 z-20 hidden rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-md md:block">
            <p className="text-sm text-white/70">Orders Delivered</p>
            <h3 className="mt-1 text-2xl font-extrabold text-sun">
              10K+
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
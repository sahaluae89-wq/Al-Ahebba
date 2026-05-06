import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfinitySlider from "@/components/InfinitySlider";
import CategoryGrid from "@/components/CategoryGrid";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Al Ahebba Grocery — Daily Essentials, Always Near You" },
      { name: "description", content: "Bilingual neighborhood grocery delivering snacks, fresh bread, drinks, cooking essentials, cosmetics and more in 5–10 minutes." },
    ],
  }),
});

function Index() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-background font-body">
        <Header />
        <main>
          <Hero />
          <InfinitySlider />
          <CategoryGrid />
          <WhyUs />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </I18nProvider>
  );
}

import { useI18n } from "@/lib/i18n";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const { tr } = useI18n();
  return (
    <a
      href="https://wa.me/971582082900"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-2xl ring-4 ring-white/30 transition hover:scale-105 ltr:right-6 rtl:left-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{tr("whatsapp")}</span>
    </a>
  );
}

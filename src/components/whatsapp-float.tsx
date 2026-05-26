import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site-config";
import { useTranslation } from "react-i18next";

export function WhatsAppFloat() {
  const { t } = useTranslation();
  const message = t("whatsapp.prefill", {
    defaultValue: "Hello Aardvark Safaris — I'd like to plan a safari. ",
  });

  return (
    <motion.a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.aria", { defaultValue: "Chat on WhatsApp" })}
      initial={false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/30 sm:h-14 sm:w-14 lg:bottom-7 lg:right-7 lg:flex"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2.1c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.4 3.3 1.2 4.7l-1.3 4.7 4.8-1.3a9.7 9.7 0 005.1 1.4h.1c5.4 0 9.8-4.4 9.8-9.8s-4.4-9.5-9.9-9.5zm0 17.7c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3a8.1 8.1 0 011.2-9.5 8.1 8.1 0 0114 5.7c0 4.5-3.7 7.8-8.1 7.8z" />
      </svg>
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </motion.a>
  );
}

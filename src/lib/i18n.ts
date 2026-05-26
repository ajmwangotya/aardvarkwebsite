import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nResources } from "@/lib/i18n-resources";

export const SUPPORTED_LANGS = ["en", "it", "es", "de", "fr"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: i18nResources,
      fallbackLng: "en",
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator", "htmlTag"],
        lookupQuerystring: "lang",
        caches: ["localStorage"],
        lookupLocalStorage: "lang",
      },
      react: { useSuspense: false },
    });
}

export default i18n;

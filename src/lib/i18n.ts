import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nResources } from "@/lib/i18n-resources";
import { langFromUrl, parseLangParam } from "@/lib/i18n-instance";

export const SUPPORTED_LANGS = ["en", "it", "es", "de", "fr"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

function initialClientLang(): Lang {
  if (typeof window === "undefined") return "en";
  const fromUrl = langFromUrl(window.location.href);
  if (new URL(window.location.href).searchParams.has("lang")) {
    return fromUrl;
  }
  try {
    const stored = localStorage.getItem("lang");
    if (stored) return parseLangParam(stored);
  } catch {
    /* private browsing */
  }
  return fromUrl;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: i18nResources,
    lng: initialClientLang(),
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;

import { createInstance, type i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nResources } from "@/lib/i18n-resources";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

export function parseLangParam(value: string | null | undefined): Lang {
  const code = value?.slice(0, 2).toLowerCase();
  if (code && (SUPPORTED_LANGS as readonly string[]).includes(code)) {
    return code as Lang;
  }
  return "en";
}

export function langFromUrl(url: string | URL): Lang {
  const parsed = typeof url === "string" ? new URL(url) : url;
  return parseLangParam(parsed.searchParams.get("lang"));
}

/** Fresh i18n instance per SSR request (avoids cross-request language bleed on Workers). */
export async function createI18nForLang(lng: Lang): Promise<I18nInstance> {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    resources: i18nResources,
    lng,
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}

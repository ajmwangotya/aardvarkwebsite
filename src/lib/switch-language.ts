import type { i18n as I18nInstance } from "i18next";
import type { NavigateOptions } from "@tanstack/react-router";
import clientI18n, { type Lang } from "@/lib/i18n";

/** Apply language to i18n, localStorage, and document — safe on client only. */
export async function applyLanguage(lng: Lang, i18n: I18nInstance = clientI18n): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lng);
  }
  await i18n.changeLanguage(lng);
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
}

/** Update ?lang= in the URL without a full reload when possible. */
export function buildLanguageSearch(
  prev: Record<string, unknown>,
  lng: Lang,
): Record<string, unknown> {
  const next = { ...prev };
  if (lng === "en") {
    delete next.lang;
  } else {
    next.lang = lng;
  }
  return next;
}

export function languageSearchUrl(lng: Lang, baseUrl = window.location.href): string {
  const url = new URL(baseUrl);
  if (lng === "en") {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", lng);
  }
  return url.toString();
}

/** Same-origin path + query for language links (SSR-safe). */
export function buildLanguagePath(
  pathname: string,
  search: Record<string, unknown>,
  lng: Lang,
): string {
  const params = new URLSearchParams();
  const next = buildLanguageSearch(search, lng);
  for (const [key, value] of Object.entries(next)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/** Last-resort fallback — always changes language via navigation. */
export function hardNavigateLanguage(lng: Lang): void {
  if (typeof window === "undefined") return;
  window.location.replace(languageSearchUrl(lng));
}

type NavigateFn = (opts: NavigateOptions) => Promise<void> | void;

/** Switch language in the live UI and keep the URL in sync. Never silently no-ops. */
export async function switchLanguage(lng: Lang, navigate?: NavigateFn): Promise<void> {
  await applyLanguage(lng, clientI18n);

  if (typeof window === "undefined") return;

  if (navigate) {
    try {
      await navigate({
        to: ".",
        search: (prev: Record<string, unknown>) => buildLanguageSearch(prev, lng),
        replace: true,
      });
      return;
    } catch (error) {
      console.warn("Router language navigation failed, reloading page", error);
    }
  }

  hardNavigateLanguage(lng);
}

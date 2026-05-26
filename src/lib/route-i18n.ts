import type { i18n as I18nInstance } from "i18next";
import en from "@/locales/en.json";

/** Resolve nested i18n keys for SSR loaders when `context.i18n` is available. */
export function tFromContext(
  i18n: I18nInstance | undefined,
  key: string,
  fallback?: string,
): string {
  if (i18n) {
    const value = i18n.t(key, { defaultValue: fallback ?? key });
    if (value !== key) return value;
  }
  const parts = key.split(".");
  let node: unknown = en;
  for (const part of parts) {
    if (node && typeof node === "object" && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return fallback ?? key;
    }
  }
  return typeof node === "string" ? node : (fallback ?? key);
}

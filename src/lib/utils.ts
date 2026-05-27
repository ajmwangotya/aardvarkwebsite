import { clsx, type ClassValue } from "clsx";
import type { TFunction } from "i18next";
import { twMerge } from "tailwind-merge";
import en from "@/locales/en.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getNested(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** i18n `returnObjects` can yield non-arrays when a key is missing — avoid blank sections. */
export function asObjectArray<T extends Record<string, unknown>>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const numericKeys = Object.keys(record)
      .filter((key) => /^\d+$/.test(key))
      .sort((a, b) => Number(a) - Number(b));
    if (numericKeys.length > 0) {
      return numericKeys.map((key) => record[key] as T);
    }
  }
  return [];
}

/** Object copy from i18n with English fallback when locale data is missing or malformed. */
export function i18nObject<T extends Record<string, unknown>>(t: TFunction, key: string): T {
  const raw = t(key, { returnObjects: true });
  if (isPlainObject(raw) && Object.keys(raw).length > 0) {
    return raw as T;
  }
  const fallback = getNested(en, key);
  return (isPlainObject(fallback) ? fallback : {}) as T;
}

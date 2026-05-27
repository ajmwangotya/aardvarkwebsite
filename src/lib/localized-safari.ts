import type { TFunction } from "i18next";
import { getSafari, type Safari, type SafariDay } from "@/data/safaris";
import { asObjectArray, i18nObject } from "@/lib/utils";

type SafariLocaleContent = Partial<
  Pick<
    Safari,
    | "title"
    | "duration"
    | "intro"
    | "route"
    | "days"
    | "highlights"
    | "lodges"
    | "fromPrice"
    | "priceNote"
    | "bestSeason"
    | "included"
    | "excluded"
  >
>;

function pickString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function pickOptionalString(value: unknown, fallback: string | undefined): string | undefined {
  const next = pickString(value, fallback ?? "");
  return next || fallback;
}

function pickStringList(value: unknown, fallback: string[] | undefined): string[] | undefined {
  const items = asObjectArray<string>(value)
    .map((item) => String(item).trim())
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function pickDays(value: unknown, fallback: SafariDay[]): SafariDay[] {
  const items = asObjectArray<SafariDay>(value);
  if (items.length === 0) return fallback;
  const merged = items
    .map((day, index) => ({
      title: pickString(day.title, fallback[index]?.title ?? ""),
      body: pickString(day.body, fallback[index]?.body ?? ""),
    }))
    .filter((day) => day.title || day.body);
  return merged.length > 0 ? merged : fallback;
}

/** Full safari for detail pages — canonical `safaris.ts` + locale `safarisContent` overlay. */
export function getLocalizedSafari(slug: string, t: TFunction): Safari | undefined {
  const base = getSafari(slug);
  if (!base) return undefined;

  const locale = i18nObject<SafariLocaleContent>(t, `safarisContent.${slug}`);

  return {
    ...base,
    title: pickString(locale.title, base.title),
    duration: pickString(locale.duration, base.duration),
    intro: pickString(locale.intro, base.intro),
    route: pickString(locale.route, base.route),
    days: pickDays(locale.days, base.days),
    waypoints: base.waypoints,
    highlights: pickStringList(locale.highlights, base.highlights),
    lodges: pickStringList(locale.lodges, base.lodges),
    fromPrice: pickOptionalString(locale.fromPrice, base.fromPrice),
    priceNote: pickOptionalString(locale.priceNote, base.priceNote),
    bestSeason: pickOptionalString(locale.bestSeason, base.bestSeason),
    included: pickStringList(locale.included, base.included),
    excluded: pickStringList(locale.excluded, base.excluded),
  };
}

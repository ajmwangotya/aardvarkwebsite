import type { TFunction } from "i18next";
import { getSafari, type Safari, type SafariDay } from "@/data/safaris";

export type LocalizedSafariFields = {
  title?: string;
  duration?: string;
  intro?: string;
  route?: string;
  days?: SafariDay[];
  highlights?: string[];
  fromPrice?: string;
  priceNote?: string;
  bestSeason?: string;
  included?: string[];
  excluded?: string[];
};

/** Overlay translated copy from `safarisContent.{slug}` onto static safari data. */
export function getLocalizedSafari(slug: string, t: TFunction): Safari | undefined {
  const base = getSafari(slug);
  if (!base) return undefined;

  const localized = t(`safarisContent.${slug}`, {
    returnObjects: true,
    defaultValue: null,
  }) as LocalizedSafariFields | null;

  if (!localized || typeof localized !== "object") {
    return base;
  }

  return {
    ...base,
    title: localized.title ?? base.title,
    duration: localized.duration ?? base.duration,
    intro: localized.intro ?? base.intro,
    route: localized.route ?? base.route,
    days: localized.days?.length ? localized.days : base.days,
    highlights: localized.highlights ?? base.highlights,
    fromPrice: localized.fromPrice ?? base.fromPrice,
    priceNote: localized.priceNote ?? base.priceNote,
    bestSeason: localized.bestSeason ?? base.bestSeason,
    included: localized.included ?? base.included,
    excluded: localized.excluded ?? base.excluded,
  };
}

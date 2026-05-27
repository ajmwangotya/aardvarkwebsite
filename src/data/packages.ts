/** Safari package categories and sample offerings — links to `/safaris/$slug` when `safariSlug` is set. */
export const PACKAGE_CATEGORIES = [
  "luxury-safaris",
  "mid-range-safaris",
  "honeymoon-safaris",
  "family-adventures",
  "migration-safaris",
  "gorilla-trekking",
  "beach-safari-combos",
  "kilimanjaro-climbs",
  "cultural-tours",
] as const;

export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];

/** Grouped layout for /packages — keeps related offerings together. */
export const PACKAGE_PAGE_SECTIONS: {
  id: string;
  categories: PackageCategory[];
}[] = [
  {
    id: "tanzaniaSafaris",
    categories: ["luxury-safaris", "mid-range-safaris", "migration-safaris", "family-adventures"],
  },
  {
    id: "primatesPeaks",
    categories: ["gorilla-trekking", "kilimanjaro-climbs", "cultural-tours"],
  },
  {
    id: "beachRomance",
    categories: ["honeymoon-safaris", "beach-safari-combos"],
  },
];

export type SafariPackage = {
  slug: string;
  category: PackageCategory;
  /** i18n key under packages.items.{slug} */
  i18nKey: string;
  safariSlug?: string;
  durationKey: string;
};

export const PACKAGES: SafariPackage[] = [
  { slug: "serengeti-luxury-migration", category: "luxury-safaris", i18nKey: "serengetiLuxuryMigration", safariSlug: "serengeti-northern-migration", durationKey: "12d" },
  { slug: "wildlife-wonders-luxury", category: "luxury-safaris", i18nKey: "wildlifeWondersLuxury", safariSlug: "wildlife-wonders-of-tanzania", durationKey: "11d" },
  { slug: "classic-northern-mid", category: "mid-range-safaris", i18nKey: "classicNorthernMid", safariSlug: "classic-northern-circuit-safari", durationKey: "10d" },
  { slug: "iconic-tanzania-mid", category: "mid-range-safaris", i18nKey: "iconicTanzaniaMid", safariSlug: "iconic-tanzania", durationKey: "4d" },
  { slug: "serengeti-zanzibar-honeymoon", category: "honeymoon-safaris", i18nKey: "serengetiZanzibarHoneymoon", safariSlug: "serengeti-southern-migration-zanzibar", durationKey: "8d" },
  { slug: "crater-romance", category: "honeymoon-safaris", i18nKey: "craterRomance", safariSlug: "crater-savannah", durationKey: "3d" },
  { slug: "family-northern-circuit", category: "family-adventures", i18nKey: "familyNorthern", safariSlug: "wildlife-wonders-of-tanzania", durationKey: "11d" },
  { slug: "quick-family-escape", category: "family-adventures", i18nKey: "quickFamily", safariSlug: "quick-escape", durationKey: "2d" },
  { slug: "northern-migration", category: "migration-safaris", i18nKey: "northernMigration", safariSlug: "serengeti-northern-migration", durationKey: "12d" },
  { slug: "southern-calving", category: "migration-safaris", i18nKey: "southernCalving", safariSlug: "serengeti-southern-migration-zanzibar", durationKey: "8d" },
  { slug: "uganda-gorilla", category: "gorilla-trekking", i18nKey: "ugandaGorilla", safariSlug: "uganda-extension", durationKey: "6d" },
  { slug: "northern-tanzania-wildlife", category: "migration-safaris", i18nKey: "northernTanzaniaWildlife", safariSlug: "northern-tanzania-wildlife-safari", durationKey: "9d" },
  { slug: "uganda-gorillas-chimps-7", category: "gorilla-trekking", i18nKey: "ugandaGorillasChimps7", safariSlug: "uganda-gorillas-chimps-7-day", durationKey: "7d" },
  { slug: "uganda-holiday-8", category: "gorilla-trekking", i18nKey: "ugandaHoliday8", safariSlug: "uganda-holiday-8-day", durationKey: "8d" },
  { slug: "zanzibar-extension-4", category: "beach-safari-combos", i18nKey: "zanzibarExtension4", safariSlug: "zanzibar-extension-4-day", durationKey: "4d" },
  { slug: "rwanda-gorilla", category: "gorilla-trekking", i18nKey: "rwandaGorilla", durationKey: "4d" },
  { slug: "safari-beach-combo", category: "beach-safari-combos", i18nKey: "safariBeachCombo", safariSlug: "serengeti-southern-migration-zanzibar", durationKey: "8d" },
  { slug: "kili-northern-circuit", category: "kilimanjaro-climbs", i18nKey: "kiliNorthern", safariSlug: "northern-circuit-route", durationKey: "10d" },
  { slug: "cultural-northern", category: "cultural-tours", i18nKey: "culturalNorthern", safariSlug: "classic-northern-circuit-safari", durationKey: "10d" },
  { slug: "maasai-hadzabe", category: "cultural-tours", i18nKey: "maasaiHadzabe", safariSlug: "iconic-tanzania", durationKey: "4d" },
];

export function getPackagesByCategory(category: PackageCategory) {
  return PACKAGES.filter((p) => p.category === category);
}

export function getPackage(slug: string) {
  return PACKAGES.find((p) => p.slug === slug);
}

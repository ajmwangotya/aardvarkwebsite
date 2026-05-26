/** Country destination slugs — used for routes and i18n keys under `countryPages`. */
export const COUNTRY_SLUGS = [
  "tanzania",
  "kenya",
  "uganda",
  "rwanda",
  "zanzibar",
] as const;

export type CountrySlug = (typeof COUNTRY_SLUGS)[number];

export function isCountrySlug(slug: string): slug is CountrySlug {
  return (COUNTRY_SLUGS as readonly string[]).includes(slug);
}

export const FEATURED_PARKS = [
  { slug: "serengeti", country: "tanzania" as CountrySlug, i18nKey: "serengeti" },
  { slug: "ngorongoro", country: "tanzania" as CountrySlug, i18nKey: "ngorongoro" },
  { slug: "kilimanjaro", country: "tanzania" as CountrySlug, i18nKey: "kilimanjaro" },
  { slug: "masai-mara", country: "kenya" as CountrySlug, i18nKey: "masaiMara" },
  { slug: "bwindi", country: "uganda" as CountrySlug, i18nKey: "bwindi" },
  { slug: "volcanoes", country: "rwanda" as CountrySlug, i18nKey: "volcanoes" },
] as const;

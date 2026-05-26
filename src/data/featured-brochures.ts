/** Curated itineraries sourced from official Aardvark tour brochures. */
export const FEATURED_BROCHURE_SLUGS = [
  "northern-tanzania-wildlife-safari",
  "uganda-gorillas-chimps-7-day",
  "uganda-holiday-8-day",
  "zanzibar-extension-4-day",
] as const;

export type FeaturedBrochureSlug = (typeof FEATURED_BROCHURE_SLUGS)[number];

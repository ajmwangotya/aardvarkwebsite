import { FEATURED_BROCHURE_SLUGS } from "@/data/featured-brochures";
import { PACKAGES, type SafariPackage } from "@/data/packages";

/** Single source for homepage and featured-trip sections — safari slugs from official brochures. */
export const CURATED_TRIP_SAFARI_SLUGS = FEATURED_BROCHURE_SLUGS;

export type CuratedTripSafariSlug = (typeof CURATED_TRIP_SAFARI_SLUGS)[number];

export function getPackageBySafariSlug(safariSlug: string): SafariPackage | undefined {
  return PACKAGES.find((p) => p.safariSlug === safariSlug);
}

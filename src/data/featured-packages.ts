import type { SafariPackage } from "@/data/packages";
import { CURATED_TRIP_SAFARI_SLUGS, getPackageBySafariSlug } from "@/data/curated-trips";

/** Package slugs aligned with {@link CURATED_TRIP_SAFARI_SLUGS}. */
export const FEATURED_PACKAGE_SLUGS = CURATED_TRIP_SAFARI_SLUGS.map(
  (safariSlug) => getPackageBySafariSlug(safariSlug)?.slug,
).filter((slug): slug is string => Boolean(slug)) as readonly string[];

export type FeaturedPackageSlug = (typeof FEATURED_PACKAGE_SLUGS)[number];

export function isFeaturedPackageSlug(slug: string): slug is FeaturedPackageSlug {
  return (FEATURED_PACKAGE_SLUGS as readonly string[]).includes(slug);
}

export function getFeaturedPackages(): SafariPackage[] {
  return CURATED_TRIP_SAFARI_SLUGS.map((s) => getPackageBySafariSlug(s)).filter(
    (p): p is SafariPackage => Boolean(p),
  );
}

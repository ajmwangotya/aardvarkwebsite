import type { SafariPackage } from "@/data/packages";

/** Homepage featured package slugs */
export const FEATURED_PACKAGE_SLUGS = [
  "northern-tanzania-wildlife",
  "serengeti-luxury-migration",
  "uganda-holiday-8",
  "zanzibar-extension-4",
] as const satisfies readonly string[];

export type FeaturedPackageSlug = (typeof FEATURED_PACKAGE_SLUGS)[number];

export function isFeaturedPackageSlug(slug: string): slug is FeaturedPackageSlug {
  return (FEATURED_PACKAGE_SLUGS as readonly string[]).includes(slug);
}

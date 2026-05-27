/** Legacy / mistyped URLs → canonical safari slugs in `safaris.ts`. */
export const SAFARI_SLUG_ALIASES: Record<string, string> = {
  "exploring-cape-town-victoria-falls-botswana-wildlife-safari":
    "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit",
};

export function resolveSafariSlug(slug: string): string {
  return SAFARI_SLUG_ALIASES[slug] ?? slug;
}

/** Tanzania safari circuit slugs — used for routes, anchors, and i18n under `destPage.circuits.items`. */
export const CIRCUIT_SLUGS = [
  "northern",
  "southern",
  "western",
  "coastal",
] as const;

export type CircuitSlug = (typeof CIRCUIT_SLUGS)[number];

export function isCircuitSlug(slug: string): slug is CircuitSlug {
  return (CIRCUIT_SLUGS as readonly string[]).includes(slug);
}

export function circuitAnchor(slug: CircuitSlug) {
  return `circuit-${slug}`;
}

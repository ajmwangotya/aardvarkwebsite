import type { SafariRegion } from "@/data/safaris";
import type { Waypoint } from "@/components/maps/safari-route-stops";

/** Opens the full route in Google Maps (directions). */
export function googleMapsDirectionsUrl(waypoints: Waypoint[]): string {
  if (waypoints.length === 0) return "https://www.google.com/maps";
  const points = waypoints.map((w) => `${w.lat},${w.lng}`);
  if (points.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(points[0])}`;
  }
  const origin = points[0];
  const destination = points[points.length - 1];
  const middle = points.slice(1, -1);
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: "driving",
  });
  if (middle.length > 0) params.set("waypoints", middle.join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function getGoogleMapsApiKey(): string | undefined {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return typeof key === "string" && key.trim() ? key.trim() : undefined;
}

const REGION_QUERY: Record<SafariRegion, string> = {
  Tanzania: "Northern Tanzania safari circuit",
  Uganda: "Bwindi Impenetrable Forest, Uganda",
  Rwanda: "Volcanoes National Park, Rwanda",
  Zanzibar: "Zanzibar, Tanzania",
  "Southern Africa": "Victoria Falls and Okavango Delta, Southern Africa",
};

function zoomForSpan(span: number): number {
  if (span < 0.8) return 9;
  if (span < 2) return 8;
  if (span < 5) return 7;
  if (span < 12) return 6;
  if (span < 20) return 5;
  return 4;
}

/** Google Maps iframe embed — no API key required. */
export function googleMapsEmbedUrl(
  waypoints: Waypoint[],
  routeLabel?: string,
  region?: SafariRegion,
): string {
  const key = getGoogleMapsApiKey();

  if (waypoints.length > 0 && key) {
    const origin = `${waypoints[0].lat},${waypoints[0].lng}`;
    const destination = `${waypoints[waypoints.length - 1].lat},${waypoints[waypoints.length - 1].lng}`;
    const middle = waypoints.slice(1, -1).map((w) => `${w.lat},${w.lng}`).join("|");
    const params = new URLSearchParams({
      key,
      origin,
      destination,
      mode: "driving",
    });
    if (middle) params.set("waypoints", middle);
    return `https://www.google.com/maps/embed/v1/directions?${params.toString()}`;
  }

  if (waypoints.length > 0) {
    const lats = waypoints.map((w) => w.lat);
    const lngs = waypoints.map((w) => w.lng);
    const lat = ((Math.min(...lats) + Math.max(...lats)) / 2).toFixed(5);
    const lng = ((Math.min(...lngs) + Math.max(...lngs)) / 2).toFixed(5);
    const span = Math.max(
      Math.max(...lats) - Math.min(...lats),
      Math.max(...lngs) - Math.min(...lngs),
    );
    const z = zoomForSpan(span);
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${z}&hl=en&output=embed`;
  }

  const query = encodeURIComponent(
    routeLabel ? `${routeLabel}, East Africa` : region ? REGION_QUERY[region] : "East Africa safari",
  );
  return `https://maps.google.com/maps?q=${query}&z=6&hl=en&output=embed`;
}

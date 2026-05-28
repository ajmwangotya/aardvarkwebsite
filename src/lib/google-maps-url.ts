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

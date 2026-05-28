import type { Waypoint } from "@/components/maps/safari-route-stops";

type OsrmResponse = {
  routes?: { geometry?: { coordinates?: [number, number][] } }[];
};

/** Fetch a driving-route polyline (GeoJSON lng/lat pairs) from OSRM. */
export async function fetchOsrmRoute(waypoints: Waypoint[]): Promise<[number, number][] | null> {
  if (waypoints.length < 2) return null;
  const coordPath = waypoints.map((w) => `${w.lng},${w.lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordPath}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as OsrmResponse;
    const coords = data.routes?.[0]?.geometry?.coordinates;
    return coords && coords.length > 1 ? coords : null;
  } catch {
    return null;
  }
}

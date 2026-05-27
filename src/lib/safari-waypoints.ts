import type { Waypoint } from "@/components/maps/safari-route-stops";

/** Collapse back-to-back identical coordinates so the route line draws cleanly. */
export function waypointsForMap(waypoints: Waypoint[]): Waypoint[] {
  return waypoints.filter((wp, i, arr) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    return wp.lat !== prev.lat || wp.lng !== prev.lng;
  });
}

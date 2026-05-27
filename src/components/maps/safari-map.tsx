import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMapHeight } from "@/lib/use-map-height";
import { waypointsForMap } from "@/lib/safari-waypoints";
import { SafariRouteStops, type Waypoint } from "@/components/maps/safari-route-stops";

export type { Waypoint };

export function SafariMap({
  waypoints,
  height,
  drawRoute = true,
  routeLabel,
}: {
  waypoints: Waypoint[];
  height?: number;
  drawRoute?: boolean;
  routeLabel?: string;
}) {
  const { t } = useTranslation();
  const mapHeight = useMapHeight(height ?? 480);
  const [ready, setReady] = useState<{
    SafariMapCanvas: typeof import("@/components/maps/safari-map-canvas")["SafariMapCanvas"];
    buildMapBounds: typeof import("@/components/maps/safari-map-canvas")["buildMapBounds"];
    L: typeof import("leaflet");
  } | null>(null);
  const [loadError, setLoadError] = useState(false);

  const mapWaypoints = useMemo(() => waypointsForMap(waypoints), [waypoints]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await import("leaflet/dist/leaflet.css");
        const L = await import("leaflet");
        const canvas = await import("@/components/maps/safari-map-canvas");
        if (!cancelled) {
          setLoadError(false);
          setReady({ SafariMapCanvas: canvas.SafariMapCanvas, buildMapBounds: canvas.buildMapBounds, L });
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setReady(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fallback = (
    <div
      className="relative overflow-hidden rounded-sm border border-ink/10 bg-[#e8dfd0] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
      style={{ minHeight: mapHeight }}
    >
      <div className="flex min-h-[inherit] flex-col items-center justify-center gap-6 px-6 py-10">
        <SafariRouteStops waypoints={waypoints} />
        <p className="text-center text-xs uppercase tracking-eyebrow text-muted-foreground">
          {loadError ? t("safariDetail.mapUnavailable") : t("safariDetail.mapLoading")}
        </p>
      </div>
    </div>
  );

  if (!ready || loadError || mapWaypoints.length === 0) {
    return fallback;
  }

  const { SafariMapCanvas, buildMapBounds, L } = ready;
  const bounds = buildMapBounds(L, mapWaypoints);

  return (
    <div className="safari-map group relative overflow-hidden rounded-sm border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
      <SafariMapCanvas
        waypoints={mapWaypoints}
        mapHeight={mapHeight}
        bounds={bounds}
        drawRoute={drawRoute}
        routeLabel={routeLabel}
        routeMapLabel={t("safariDetail.routeMap")}
        stopLabel={(num) => t("safariDetail.mapStop", { num })}
        L={L}
      />
      <SafariRouteStops waypoints={waypoints} variant="strip" />
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { useMapHeight } from "@/lib/use-map-height";
import { waypointsForMap } from "@/lib/safari-waypoints";
import { googleMapsDirectionsUrl } from "@/lib/google-maps-url";
import { SafariRouteStops, type Waypoint } from "@/components/maps/safari-route-stops";

export type { Waypoint };

type SafariLeafletMapComponent = typeof import("@/components/maps/safari-leaflet-map")["SafariLeafletMap"];

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
  const mapHeight = useMapHeight(height ?? 500);
  const [mounted, setMounted] = useState(false);
  const [LeafletMap, setLeafletMap] = useState<SafariLeafletMapComponent | null>(null);
  const [failed, setFailed] = useState(false);

  const mapWaypoints = useMemo(() => waypointsForMap(waypoints), [waypoints]);
  const gmapsUrl = useMemo(() => googleMapsDirectionsUrl(waypoints), [waypoints]);

  useEffect(() => {
    setMounted(true);
    if (mapWaypoints.length === 0) {
      setFailed(true);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const mod = await import("@/components/maps/safari-leaflet-map");
        if (!cancelled) setLeafletMap(() => mod.SafariLeafletMap);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mapWaypoints.length]);

  const routeMapLabel = t("safariDetail.routeMap");
  const stopLabel = (num: number) => t("safariDetail.mapStop", { num });

  const mapBody =
    mounted && LeafletMap && mapWaypoints.length > 0 ? (
      <LeafletMap
        waypoints={mapWaypoints}
        mapHeight={mapHeight}
        drawRoute={drawRoute}
        routeLabel={routeLabel}
        routeMapLabel={routeMapLabel}
        stopLabel={stopLabel}
      />
    ) : failed ? (
      <div
        className="flex items-center justify-center bg-[#e8dfd0] px-6"
        style={{ minHeight: mapHeight }}
        role="status"
      >
        <p className="text-center text-xs uppercase tracking-eyebrow text-muted-foreground">
          {t("safariDetail.mapUnavailable")}
        </p>
      </div>
    ) : (
      <div
        className="w-full animate-pulse bg-[#e8dfd0]"
        style={{ height: mapHeight }}
        role="status"
        aria-live="polite"
        aria-label={t("safariDetail.mapLoading")}
      />
    );

  return (
    <div className="safari-map group relative overflow-hidden rounded-sm border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
      {mapBody}

      <div className="flex flex-col gap-3 border-t border-ink/8 bg-[#faf7f2] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <SafariRouteStops waypoints={waypoints} />
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 border border-ink/15 bg-background px-3 py-2 text-[10px] uppercase tracking-eyebrow text-ink transition-colors hover:border-gold hover:text-gold"
        >
          {t("safariDetail.openInGoogleMaps")}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}

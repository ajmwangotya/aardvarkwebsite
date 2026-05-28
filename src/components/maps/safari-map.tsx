import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { useMapHeight } from "@/lib/use-map-height";
import { waypointsForMap } from "@/lib/safari-waypoints";
import { getGoogleMapsApiKey, googleMapsDirectionsUrl } from "@/lib/google-maps-url";
import { SafariRouteStops, type Waypoint } from "@/components/maps/safari-route-stops";

export type { Waypoint };

type LeafletBundle = {
  SafariLeafletMap: typeof import("@/components/maps/safari-leaflet-map")["SafariLeafletMap"];
  buildMapBounds: typeof import("@/components/maps/safari-leaflet-map")["buildMapBounds"];
  L: typeof import("leaflet");
};

type GoogleBundle = {
  SafariGoogleMap: typeof import("@/components/maps/safari-google-map")["SafariGoogleMap"];
};

type MapEngine = "loading" | "google" | "leaflet" | "error";

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
  const googleKey = getGoogleMapsApiKey();

  const [engine, setEngine] = useState<MapEngine>("loading");
  const [leaflet, setLeaflet] = useState<LeafletBundle | null>(null);
  const [google, setGoogle] = useState<GoogleBundle | null>(null);

  const mapWaypoints = useMemo(() => waypointsForMap(waypoints), [waypoints]);
  const gmapsUrl = useMemo(() => googleMapsDirectionsUrl(waypoints), [waypoints]);

  const loadLeaflet = useCallback(async () => {
    await import("leaflet/dist/leaflet.css");
    const L = await import("leaflet");
    const mod = await import("@/components/maps/safari-leaflet-map");
    setLeaflet({
      SafariLeafletMap: mod.SafariLeafletMap,
      buildMapBounds: mod.buildMapBounds,
      L,
    });
    setEngine("leaflet");
  }, []);

  const loadGoogle = useCallback(async () => {
    const mod = await import("@/components/maps/safari-google-map");
    setGoogle({ SafariGoogleMap: mod.SafariGoogleMap });
    setEngine("google");
  }, []);

  useEffect(() => {
    if (mapWaypoints.length === 0) {
      setEngine("error");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        if (googleKey) {
          await loadGoogle();
        } else {
          await loadLeaflet();
        }
      } catch {
        if (!cancelled) setEngine("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [googleKey, mapWaypoints.length, loadGoogle, loadLeaflet]);

  const handleGoogleError = useCallback(() => {
    loadLeaflet().catch(() => setEngine("error"));
  }, [loadLeaflet]);

  const routeMapLabel = t("safariDetail.routeMap");
  const stopLabel = (num: number) => t("safariDetail.mapStop", { num });

  const mapBody =
    engine === "google" && google ? (
      <google.SafariGoogleMap
        waypoints={mapWaypoints}
        mapHeight={mapHeight}
        routeLabel={routeLabel}
        routeMapLabel={routeMapLabel}
        stopLabel={stopLabel}
        onError={handleGoogleError}
      />
    ) : engine === "leaflet" && leaflet ? (
      <leaflet.SafariLeafletMap
        waypoints={mapWaypoints}
        mapHeight={mapHeight}
        bounds={leaflet.buildMapBounds(leaflet.L, mapWaypoints)}
        drawRoute={drawRoute}
        routeLabel={routeLabel}
        routeMapLabel={routeMapLabel}
        stopLabel={stopLabel}
        L={leaflet.L}
      />
    ) : (
      <div
        className="flex flex-col items-center justify-center gap-6 bg-[#e8dfd0] px-6 py-10"
        style={{ minHeight: mapHeight }}
      >
        <SafariRouteStops waypoints={waypoints} />
        <p className="text-center text-xs uppercase tracking-eyebrow text-muted-foreground">
          {engine === "error" ? t("safariDetail.mapUnavailable") : t("safariDetail.mapLoading")}
        </p>
      </div>
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

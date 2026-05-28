import { useEffect, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { fetchOsrmRoute } from "@/lib/osrm-route";
import type { Waypoint } from "@/components/maps/safari-route-stops";

const STREET_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
const SATELLITE_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const LABELS_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";

const MAP_STYLES = `
  @keyframes safari-map-pulse {
    0% { transform: scale(0.85); opacity: 0.85; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  .safari-map-marker { background: transparent !important; border: none !important; }
  .safari-map .leaflet-container { background: #e8dfd0; font-family: inherit; z-index: 0; }
  .safari-map .leaflet-popup-content-wrapper {
    border-radius: 2px; background: #FAF7F2;
    box-shadow: 0 20px 40px -20px rgba(0,0,0,0.4);
  }
  .safari-map .leaflet-control-layers {
    border: none !important;
    box-shadow: 0 8px 24px -8px rgba(0,0,0,0.25) !important;
    border-radius: 2px !important;
  }
  .safari-map .leaflet-control-layers-toggle {
    width: 36px !important; height: 36px !important;
    background: #FAF7F2 !important;
  }
  .safari-map .leaflet-control-zoom a {
    background: #FAF7F2 !important; color: #3D3832 !important;
    border-color: rgba(61,56,50,0.12) !important;
  }
  .safari-map .leaflet-control-zoom a:hover {
    background: #f0e8dc !important; color: #C8634E !important;
  }
`;

function createNumberedMarkerIcon(L: typeof import("leaflet"), index: number, total: number) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const fill = isFirst ? "#D4A574" : isLast ? "#C8634E" : "#3D3832";
  const ring = isFirst || isLast ? "rgba(212,165,116,0.45)" : "rgba(61,56,50,0.2)";

  return L.divIcon({
    className: "safari-map-marker",
    html: `<div style="position:relative;width:36px;height:36px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:${ring};animation:safari-map-pulse 2.4s ease-out infinite;"></span>
      <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:${fill};color:#FAF7F2;font:600 13px/1 Georgia,serif;box-shadow:0 3px 12px rgba(0,0,0,0.28),0 0 0 2.5px #FAF7F2;">${index + 1}</span>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

export function buildMapBounds(L: typeof import("leaflet"), waypoints: Waypoint[]) {
  const lats = waypoints.map((w) => w.lat);
  const lngs = waypoints.map((w) => w.lng);
  const span = Math.max(
    Math.max(...lats) - Math.min(...lats),
    Math.max(...lngs) - Math.min(...lngs),
  );
  const pad = span < 0.5 ? 0.14 : span < 2 ? 0.24 : 0.34;
  return L.latLngBounds(
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ).pad(pad);
}

function MapBoundsFitter({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [56, 56], maxZoom: 10, animate: false });
    const timer = window.setTimeout(() => map.invalidateSize(), 150);
    return () => window.clearTimeout(timer);
  }, [map, bounds]);
  return null;
}

function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 250);
    return () => window.clearTimeout(timer);
  }, [map]);
  return null;
}

function OsrmRouteLayer({
  waypoints,
  fallbackPositions,
}: {
  waypoints: Waypoint[];
  fallbackPositions: [number, number][];
}) {
  const [positions, setPositions] = useState<[number, number][]>(fallbackPositions);

  useEffect(() => {
    let cancelled = false;
    fetchOsrmRoute(waypoints).then((coords) => {
      if (cancelled || !coords) return;
      setPositions(coords.map(([lng, lat]) => [lat, lng]));
    });
    return () => {
      cancelled = true;
    };
  }, [waypoints]);

  if (positions.length < 2) return null;

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{ color: "#FAF7F2", weight: 6, opacity: 0.95, lineCap: "round", lineJoin: "round" }}
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#C8634E",
          weight: 3,
          opacity: 0.9,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
    </>
  );
}

export function SafariLeafletMap({
  waypoints,
  mapHeight,
  bounds,
  drawRoute,
  routeLabel,
  routeMapLabel,
  stopLabel,
  L,
}: {
  waypoints: Waypoint[];
  mapHeight: number;
  bounds: L.LatLngBounds;
  drawRoute: boolean;
  routeLabel?: string;
  routeMapLabel: string;
  stopLabel: (num: number) => string;
  L: typeof import("leaflet");
}) {
  const straightLine = waypoints.map((w) => [w.lat, w.lng] as [number, number]);

  return (
    <>
      <style>{MAP_STYLES}</style>
      {routeLabel && (
        <div
          className="pointer-events-none absolute left-4 top-4 z-[1000] max-w-[min(90%,320px)] border border-ink/10 bg-bone/95 px-3 py-2 shadow-sm backdrop-blur-sm"
          aria-hidden
        >
          <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {routeMapLabel}
          </span>
          <span className="mt-0.5 block font-serif text-sm leading-snug text-ink">{routeLabel}</span>
        </div>
      )}
      <MapContainer
        bounds={bounds}
        scrollWheelZoom
        zoomControl
        style={{ height: `${mapHeight}px`, width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url={STREET_TILES}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <LayerGroup>
              <TileLayer url={SATELLITE_TILES} />
              <TileLayer url={LABELS_TILES} />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
        <MapBoundsFitter bounds={bounds} />
        <MapResizeHandler />
        {drawRoute && straightLine.length > 1 && (
          <OsrmRouteLayer waypoints={waypoints} fallbackPositions={straightLine} />
        )}
        {waypoints.map((d, i) => (
          <Marker
            key={`${d.name}-${i}`}
            position={[d.lat, d.lng]}
            icon={createNumberedMarkerIcon(L, i, waypoints.length)}
          >
            <Popup>
              <div className="text-center">
                <span className="block font-serif text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  {stopLabel(i + 1)}
                </span>
                <strong className="mt-1 block font-serif text-base text-ink">{d.name}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

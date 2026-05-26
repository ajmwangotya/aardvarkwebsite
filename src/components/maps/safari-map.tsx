import { useEffect, useState } from "react";
import { useMapHeight } from "@/lib/use-map-height";

export type Waypoint = { name: string; lat: number; lng: number };

export function SafariMap({
  waypoints,
  height,
  drawRoute = true,
}: {
  waypoints: Waypoint[];
  height?: number;
  drawRoute?: boolean;
}) {
  const mapHeight = useMapHeight(height ?? 460);
  const [Comps, setComps] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      const rl = await import("react-leaflet");
      await import("leaflet/dist/leaflet.css");

      const icon = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:24px;height:24px;">
          <span style="position:absolute;inset:0;border-radius:9999px;background:rgba(212,165,116,0.35);animation:pulse-ring-s 2.2s ease-out infinite;"></span>
          <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:9999px;background:linear-gradient(135deg,#D4A574,#C8634E);box-shadow:0 2px 8px rgba(0,0,0,0.35), 0 0 0 2px #FAF7F2;"></span>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      if (!cancelled) setComps({ ...rl, icon, L });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Comps) {
    return (
      <div
        className="w-full animate-pulse rounded-sm bg-ink/5"
        style={{ height: mapHeight }}
      />
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Polyline, L } = Comps;

  const lats = waypoints.map((w) => w.lat);
  const lngs = waypoints.map((w) => w.lng);
  const bounds = L.latLngBounds(
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ).pad(0.35);

  return (
    <div className="relative overflow-hidden rounded-sm border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
      <style>{`
        @keyframes pulse-ring-s {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-container { background: #f4ecdf; font-family: inherit; }
        .leaflet-popup-content-wrapper { border-radius: 2px; background: #FAF7F2; box-shadow: 0 20px 40px -20px rgba(0,0,0,0.4); padding: 2px; }
        .leaflet-popup-tip { background: #FAF7F2; }
        .leaflet-popup-content { margin: 8px 12px; font-family: inherit; }
        .leaflet-control-attribution { font-size: 10px; background: rgba(250,247,242,0.85) !important; }
      `}</style>
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={false}
        style={{ height: `${mapHeight}px`, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {drawRoute && waypoints.length > 1 && (
          <Polyline
            positions={waypoints.map((w) => [w.lat, w.lng])}
            pathOptions={{ color: "#C8634E", weight: 2.5, dashArray: "6 8", opacity: 0.85 }}
          />
        )}
        {waypoints.map((d, i) => (
          <Marker key={`${d.name}-${i}`} position={[d.lat, d.lng]} icon={Comps.icon}>
            <Popup>
              <div className="text-center">
                <span className="block font-serif text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  Stop {i + 1}
                </span>
                <strong className="mt-1 block font-serif text-base text-ink">
                  {d.name}
                </strong>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

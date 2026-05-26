import { useEffect, useState } from "react";
import { useMapHeight } from "@/lib/use-map-height";

const destinations = [
  { name: "Serengeti", tag: "National Park", lat: -2.3333, lng: 34.8333 },
  { name: "Ngorongoro", tag: "Crater", lat: -3.1667, lng: 35.5833 },
  { name: "Tarangire", tag: "National Park", lat: -3.8333, lng: 36.0 },
  { name: "Kilimanjaro", tag: "Mountain", lat: -3.0674, lng: 37.3556 },
  { name: "Zanzibar", tag: "Island", lat: -6.165, lng: 39.2026 },
  { name: "Lake Manyara", tag: "National Park", lat: -3.5833, lng: 35.8333 },
  { name: "Arusha", tag: "Gateway City", lat: -3.3869, lng: 36.683 },
  { name: "Dar es Salaam", tag: "City", lat: -6.7924, lng: 39.2083 },
];

export function TanzaniaMap() {
  const mapHeight = useMapHeight(520);
  const [mounted, setMounted] = useState(false);
  const [Comps, setComps] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      const rl = await import("react-leaflet");
      await import("leaflet/dist/leaflet.css");

      const icon = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:28px;height:28px;">
          <span style="position:absolute;inset:0;border-radius:9999px;background:rgba(212,165,116,0.35);animation:pulse-ring 2.2s ease-out infinite;"></span>
          <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:14px;height:14px;border-radius:9999px;background:linear-gradient(135deg,#D4A574,#C8634E);box-shadow:0 2px 8px rgba(0,0,0,0.35), 0 0 0 2px #FAF7F2;"></span>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      if (!cancelled) setComps({ ...rl, icon });
    })();
    setMounted(true);
    return () => {
      cancelled = true;
    };
  }, []);

  if (!mounted || !Comps) {
    return (
      <div className="w-full animate-pulse rounded-sm bg-ink/5" style={{ height: mapHeight }} />
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = Comps;

  return (
    <div className="relative overflow-hidden rounded-sm border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-container { background: #f4ecdf; font-family: inherit; }
        .leaflet-popup-content-wrapper {
          border-radius: 2px;
          background: #FAF7F2;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.4);
          padding: 2px;
        }
        .leaflet-popup-tip { background: #FAF7F2; }
        .leaflet-popup-content { margin: 10px 14px; font-family: inherit; }
        .leaflet-control-attribution { font-size: 10px; background: rgba(250,247,242,0.85) !important; }
      `}</style>
      <MapContainer
        center={[-6.0, 35.5]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: `${mapHeight}px`, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {destinations.map((d) => (
          <Marker key={d.name} position={[d.lat, d.lng]} icon={Comps.icon}>
            <Popup>
              <div className="text-center">
                <span className="block font-serif text-[10px] uppercase tracking-[0.2em] text-ink/50">
                  {d.tag}
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

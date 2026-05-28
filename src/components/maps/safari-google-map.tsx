import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { AARDVARK_MAP_STYLES } from "@/lib/google-maps-styles";
import { getGoogleMapsApiKey } from "@/lib/google-maps-url";
import type { Waypoint } from "@/components/maps/safari-route-stops";

function markerFill(index: number, total: number) {
  if (index === 0) return "#D4A574";
  if (index === total - 1) return "#C8634E";
  return "#3D3832";
}

export function SafariGoogleMap({
  waypoints,
  mapHeight,
  routeLabel,
  routeMapLabel,
  stopLabel,
  onError,
}: {
  waypoints: Waypoint[];
  mapHeight: number;
  routeLabel?: string;
  routeMapLabel: string;
  stopLabel: (num: number) => string;
  onError?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = getGoogleMapsApiKey();
    const el = containerRef.current;
    if (!apiKey || !el || waypoints.length === 0) {
      onError?.();
      return;
    }

    let cancelled = false;
    let markers: google.maps.Marker[] = [];
    let renderer: google.maps.DirectionsRenderer | null = null;

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["maps", "routes"],
    });

    loader
      .load()
      .then((google) => {
        if (cancelled) return;

        const map = new google.maps.Map(el, {
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: ["roadmap", "satellite", "hybrid"],
          },
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: AARDVARK_MAP_STYLES,
          mapTypeId: "roadmap",
        });

        const bounds = new google.maps.LatLngBounds();
        for (const w of waypoints) bounds.extend({ lat: w.lat, lng: w.lng });
        map.fitBounds(bounds, { top: routeLabel ? 88 : 56, right: 48, bottom: 48, left: 48 });

        markers = waypoints.map((w, i) => {
          const pin = new google.maps.Marker({
            map,
            position: { lat: w.lat, lng: w.lng },
            title: w.name,
            label: {
              text: String(i + 1),
              color: "#FAF7F2",
              fontWeight: "700",
              fontSize: "12px",
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 14,
              fillColor: markerFill(i, waypoints.length),
              fillOpacity: 1,
              strokeColor: "#FAF7F2",
              strokeWeight: 2.5,
            },
          });
          const info = new google.maps.InfoWindow({
            content: `<div style="font-family:Georgia,serif;text-align:center;padding:4px 2px;">
              <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8278;">${stopLabel(i + 1)}</div>
              <strong style="display:block;margin-top:4px;font-size:15px;color:#2c2825;">${w.name}</strong>
            </div>`,
          });
          pin.addListener("click", () => info.open({ map, anchor: pin }));
          return pin;
        });

        if (waypoints.length > 1) {
          const directionsService = new google.maps.DirectionsService();
          renderer = new google.maps.DirectionsRenderer({
            map,
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
              strokeColor: "#C8634E",
              strokeWeight: 5,
              strokeOpacity: 0.92,
            },
          });

          const origin = waypoints[0];
          const destination = waypoints[waypoints.length - 1];
          const middle = waypoints.slice(1, -1);

          directionsService.route(
            {
              origin: { lat: origin.lat, lng: origin.lng },
              destination: { lat: destination.lat, lng: destination.lng },
              waypoints: middle.map((w) => ({
                location: { lat: w.lat, lng: w.lng },
                stopover: true,
              })),
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (!cancelled && status === google.maps.DirectionsStatus.OK && result) {
                renderer?.setDirections(result);
              }
            },
          );
        }
      })
      .catch(() => {
        if (!cancelled) onError?.();
      });

    return () => {
      cancelled = true;
      for (const m of markers) m.setMap(null);
      renderer?.setMap(null);
    };
  }, [waypoints, routeLabel, stopLabel, onError]);

  return (
    <>
      {routeLabel && (
        <div
          className="pointer-events-none absolute left-4 top-4 z-10 max-w-[min(90%,320px)] border border-ink/10 bg-bone/95 px-3 py-2 shadow-sm backdrop-blur-sm"
          aria-hidden
        >
          <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {routeMapLabel}
          </span>
          <span className="mt-0.5 block font-serif text-sm leading-snug text-ink">{routeLabel}</span>
        </div>
      )}
      <div ref={containerRef} style={{ height: mapHeight, width: "100%" }} className="bg-[#e8dfd0]" />
    </>
  );
}

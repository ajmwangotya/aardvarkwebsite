/** Warm, muted map styling aligned with Aardvark brand (used with Google Maps JS). */
export const AARDVARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f4ecdf" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5c5348" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#faf7f2" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#d4c4b0" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#ebe3d4" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e5ddd0" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d8e8d0" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d8cfc2" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f5efe6" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#c8634e", lightness: 40 }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#b8d4e8" }] },
];

import * as React from "react";

/** Matches Tailwind `lg` — phones and tablets use compact layout. */
export const COMPACT_LAYOUT_MAX_PX = 1023;

const QUERY = `(max-width: ${COMPACT_LAYOUT_MAX_PX}px)`;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type Waypoint = { name: string; lat: number; lng: number };

export function SafariRouteStops({
  waypoints,
  variant = "inline",
}: {
  waypoints: Waypoint[];
  variant?: "inline" | "strip";
}) {
  if (waypoints.length === 0) return null;

  if (variant === "strip") {
    return (
      <div className="border-t border-ink/8 bg-[#faf7f2] px-4 py-4 sm:px-6 sm:py-5">
        <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-1 sm:gap-y-2">
          {waypoints.map((wp, i) => (
            <li key={`${wp.name}-${i}`} className="flex items-center gap-2 sm:contents">
              <span className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold font-serif text-sm text-ink tabular-nums shadow-sm"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{wp.name}</span>
              </span>
              {i < waypoints.length - 1 && (
                <span className="ml-9 text-gold/50 sm:ml-0 sm:px-1" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-3">
      {waypoints.map((wp, i) => (
        <li key={`${wp.name}-${i}`} className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 font-serif text-sm text-gold tabular-nums"
            aria-hidden
          >
            {i + 1}
          </span>
          <span className="text-sm font-medium text-ink sm:text-base">{wp.name}</span>
          {i < waypoints.length - 1 && (
            <span className="mx-1 hidden text-gold/60 sm:inline" aria-hidden>
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

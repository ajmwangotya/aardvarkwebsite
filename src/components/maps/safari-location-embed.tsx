import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import type { SafariRegion } from "@/data/safaris";
import { googleMapsDirectionsUrl, googleMapsEmbedUrl } from "@/lib/google-maps-url";
import type { Waypoint } from "@/components/maps/safari-route-stops";

const MAP_HEIGHT = 440;

export function ItineraryLocationSection({
  waypoints = [],
  routeLabel,
  region,
}: {
  waypoints?: Waypoint[];
  routeLabel?: string;
  region?: SafariRegion;
}) {
  const { t } = useTranslation();

  const embedUrl = useMemo(
    () => googleMapsEmbedUrl(waypoints, routeLabel, region),
    [waypoints, routeLabel, region],
  );

  const mapsUrl = useMemo(() => {
    if (waypoints.length > 0) return googleMapsDirectionsUrl(waypoints);
    if (region) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(region + " safari")}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(routeLabel ?? "East Africa safari")}`;
  }, [waypoints, region, routeLabel]);

  const iframeTitle = routeLabel
    ? `${t("safariDetail.routeMap")}: ${routeLabel}`
    : t("safariDetail.routeMap");

  return (
    <section>
      <span className="eyebrow">{t("safariDetail.routeMap")}</span>
      <h2 className="mt-4 font-serif text-[clamp(1.5rem,4vw,3rem)]">
        <Trans i18nKey="safariDetail.yourJourney" components={{ i: <span className="gradient-text italic" /> }} />
      </h2>
      <p className="mt-4 max-w-xl text-muted-foreground">{t("safariDetail.mapDesc")}</p>

      <div className="mt-8 overflow-hidden rounded-sm border border-ink/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
        <iframe
          title={iframeTitle}
          src={embedUrl}
          width="100%"
          height={MAP_HEIGHT}
          style={{ border: 0, display: "block", minHeight: MAP_HEIGHT }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        <div className="flex items-center justify-end border-t border-ink/8 bg-[#faf7f2] px-4 py-4 sm:px-5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 border border-ink/15 bg-background px-3 py-2 text-[10px] uppercase tracking-eyebrow text-ink transition-colors hover:border-gold hover:text-gold"
          >
            {t("safariDetail.openInGoogleMaps")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

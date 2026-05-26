import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { SITE } from "@/lib/site-config";

/** Prominent SLA callout for plan-trip and other high-intent forms. */
export function FormSlaBanner() {
  const { t } = useTranslation();
  return (
    <div
      className="flex items-start gap-4 border border-gold/35 bg-secondary/50 px-5 py-4 sm:items-center sm:px-6 sm:py-5"
      role="status"
    >
      <Clock className="h-9 w-9 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
      <div className="min-w-0">
        <p className="font-serif text-lg text-ink">{t("planTripPage.trustPanel.slaTitle")}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {t("planTripPage.trustPanel.slaBody")}{" "}
          <a href={`mailto:${SITE.formsEmail}`} className="underline hover:text-gold">
            {SITE.formsEmail}
          </a>
        </p>
      </div>
    </div>
  );
}

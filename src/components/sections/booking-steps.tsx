import { useTranslation } from "react-i18next";
import { BOOKING } from "@/lib/site-config";

export function BookingSteps({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={`grid gap-6 sm:grid-cols-3 ${className}`}>
      {BOOKING.steps.map((step, i) => (
        <div key={step.titleKey} className="border border-border bg-background p-5 sm:p-6">
          <span className="font-serif text-3xl text-gold/80">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-serif text-lg text-ink">{t(step.titleKey)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
        </div>
      ))}
    </div>
  );
}

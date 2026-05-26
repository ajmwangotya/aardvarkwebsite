import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion";
import { MIGRATION_CALENDAR } from "@/data/migration-calendar";

const intensityClass: Record<string, string> = {
  low: "bg-muted",
  medium: "bg-gold/30",
  high: "bg-gold/55",
  peak: "bg-gradient-to-br from-gold to-coral text-ink",
};

export function MigrationCalendar() {
  const { t } = useTranslation();
  const [active, setActive] = useState(7);
  const month = MIGRATION_CALENDAR.find((m) => m.month === active) ?? MIGRATION_CALENDAR[6];

  return (
    <section className="bg-ink text-bone" aria-labelledby="migration-calendar-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-6 md:px-12 md:py-24">
        <Reveal className="text-center">
          <span className="eyebrow text-gold">{t("migration.eyebrow")}</span>
          <h2 id="migration-calendar-heading" className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.25rem)]">
            {t("migration.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-bone/75 sm:text-base">{t("migration.desc")}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div
            className="scroll-hint-x flex gap-1 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1"
            role="tablist"
            aria-label={t("migration.monthPicker")}
          >
            {MIGRATION_CALENDAR.map((m) => (
              <button
                key={m.month}
                type="button"
                role="tab"
                aria-selected={active === m.month}
                onClick={() => setActive(m.month)}
                className={`min-w-[3.25rem] shrink-0 px-2 py-3 text-center text-[0.65rem] uppercase tracking-[0.2em] transition-all sm:min-w-0 sm:flex-1 sm:px-3 ${
                  active === m.month
                    ? "bg-bone text-ink font-medium"
                    : `${intensityClass[m.intensity]} text-bone/90 hover:opacity-90`
                }`}
              >
                {t(m.labelKey)}
              </button>
            ))}
          </div>

          <div className="mt-8 border border-bone/20 bg-bone/5 p-6 sm:p-10" role="tabpanel">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">{t(month.labelKey)}</p>
            <h3 className="mt-3 font-serif text-2xl sm:text-3xl">{t(month.locationKey)}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/85 sm:text-base">
              {t(month.highlightKey)}
            </p>
            <Link
              to="/faq"
              className="btn-line mt-8 inline-flex border-bone/40 text-bone hover:border-gold hover:text-gold"
            >
              {t("migration.readGuide")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

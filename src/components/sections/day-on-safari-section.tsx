import { Trans, useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import en from "@/locales/en.json";
import dayOnSafari from "@/assets/editorial/day-on-safari.jpg";
import { asObjectArray } from "@/lib/utils";

type ScheduleSlot = { time: string; title: string; body: string };

function getSchedule(t: TFunction): ScheduleSlot[] {
  const items = asObjectArray<ScheduleSlot>(t("home.schedule", { returnObjects: true }));
  return items.length > 0 ? items : (en.home.schedule as ScheduleSlot[]);
}

export function DayOnSafariSection({ dark = false, showCta = true }: { dark?: boolean; showCta?: boolean }) {
  const { t } = useTranslation();
  const schedule = getSchedule(t);

  return (
    <section className={dark ? "bg-ink text-bone" : "border-y border-border bg-card"}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Photo — left column (was invisible due to scroll-reveal + layout) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="image-zoom gold-border-glow relative aspect-[4/5] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/5]">
              <img
                src={dayOnSafari}
                alt="Early morning game drive on the Tanzanian savannah"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Intro + daily schedule — right column */}
          <div className="lg:col-span-7">
            <span className={`eyebrow ${dark ? "text-gold" : ""}`}>{t("home.inTheField")}</span>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.1]">
              <Trans i18nKey="home.dayOnSafariTitle" components={{ i: <span className="shimmer-text italic" /> }} />
            </h2>
            <p className={`mt-6 text-sm italic leading-relaxed ${dark ? "text-bone/70" : "text-muted-foreground"}`}>
              {t("home.peterBeardQuote")}
            </p>
            <blockquote
              className={`mt-8 border-l-2 pl-6 font-serif text-lg italic leading-relaxed ${dark ? "border-gold text-bone/90" : "border-gold text-ink/80"}`}
            >
              {t("home.servicesQuote")}
            </blockquote>
            {showCta && (
              <Link
                to="/experiences"
                className={`btn-line mt-8 ${dark ? "border-bone/30 text-bone hover:border-gold" : ""}`}
              >
                {t("home.philosophyCta")}
              </Link>
            )}

            <ol className="mt-12 space-y-6 border-t border-border/60 pt-10">
              {schedule.map((slot) => (
                <li key={slot.time} className="grid gap-3 border-t border-border/60 pt-6 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr]">
                  <span className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-gold" : "text-gold"}`}>
                    {slot.time}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl">{slot.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-bone/75" : "text-muted-foreground"}`}>
                      {slot.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

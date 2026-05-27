import { Trans, useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Reveal, blurIn } from "@/components/motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import dayOnSafari from "@/assets/editorial/day-on-safari.jpg";
import { asObjectArray } from "@/lib/utils";

export function DayOnSafariSection({ dark = false, showCta = true }: { dark?: boolean; showCta?: boolean }) {
  const { t } = useTranslation();
  const schedule = asObjectArray<{ time: string; title: string; body: string }>(
    t("home.schedule", { returnObjects: true }),
  );

  return (
    <section className={dark ? "bg-ink text-bone" : "border-y border-border bg-card"}>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variants={blurIn} className="lg:col-span-5">
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
              <Link to="/experiences" className={`btn-line mt-8 ${dark ? "border-bone/30 text-bone hover:border-gold" : ""}`}>
                {t("home.philosophyCta")}
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="image-zoom gold-border-glow mb-10 aspect-[16/9] overflow-hidden">
              <OptimizedImage
                src={dayOnSafari}
                alt="Early morning game drive on the Tanzanian savannah"
                className="h-full w-full object-cover"
              />
            </div>
            <ol className="space-y-6">
              {schedule.map((slot) => (
                <li key={slot.time} className="grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-[5rem_1fr]">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}

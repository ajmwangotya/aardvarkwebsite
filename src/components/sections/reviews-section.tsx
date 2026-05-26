import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { Reveal, stagger, fadeUp } from "@/components/motion";
import { TripAdvisorLogo } from "@/components/brand/trip-advisor-logo";
import { SITE, TRIPADVISOR } from "@/lib/site-config";

function reviewerInitials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ReviewsSection() {
  const { t } = useTranslation();

  const reviewItems = t("reviews.items", { returnObjects: true }) as {
    name: string;
    location: string;
    trip: string;
    date: string;
    title: string;
    body: string;
  }[];

  const reviews = reviewItems.map((r) => ({
    ...r,
    rating: 5,
    initials: reviewerInitials(r.name),
  }));

  return (
    <section className="relative border-y border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-36">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span className="eyebrow">{t("reviews.eyebrow")}</span>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.08] sm:mt-6">
                <Trans i18nKey="reviews.title" components={{ i: <span className="gradient-text italic" /> }} />
              </h2>
              <span className="gold-rule mt-8" />
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("reviews.subdesc")}
              </p>
            </div>

            <div className="md:col-span-5">
              <a
                href={SITE.tripAdvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-5 border border-border bg-card p-6 transition-colors hover:border-gold/50"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <TripAdvisorLogo className="h-7 w-auto text-[#00AF87]" />
                  <span className="text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
                    {t("reviews.verified")}
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl text-ink">{TRIPADVISOR.rating}</span>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{t("reviews.basedOn")}</span>
                  </div>
                </div>
                <p className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">{TRIPADVISOR.ranking}</p>
                <span className="text-xs uppercase tracking-eyebrow text-coral transition-colors group-hover:text-gold">
                  {t("reviews.readOnTripadvisor")}
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-14 grid gap-5 sm:mt-20 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {reviews.map((r) => (
            <motion.article
              key={`${r.name}-${r.date}`}
              variants={fadeUp}
              className="group flex flex-col border border-border bg-card p-7 transition-colors duration-500 hover:border-gold/40 sm:p-8"
            >
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>

              <span className="mt-5 inline-flex w-fit border border-gold/35 bg-gold/10 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold">
                {r.trip}
              </span>

              <h3 className="mt-4 font-serif text-xl leading-snug text-ink md:text-2xl">
                &ldquo;{r.title}&rdquo;
              </h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-muted-foreground">{r.body}</p>

              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-secondary font-serif text-sm text-ink"
                  aria-hidden
                >
                  {r.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-serif text-base text-ink">{r.name}</div>
                  <div className="text-[0.68rem] uppercase tracking-eyebrow text-muted-foreground">{r.location}</div>
                </div>
              </div>

              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-coral/90">{r.date}</p>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-12">
            <a href={SITE.tripAdvisor} target="_blank" rel="noopener noreferrer" className="btn-line">
              {t("reviews.readAll")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

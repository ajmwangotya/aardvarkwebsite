import { Link } from "@tanstack/react-router";
import { Star, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import { TripAdvisorLogo } from "@/components/brand/trip-advisor-logo";
import { Reveal } from "@/components/motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { SITE, TRIPADVISOR, TRUST_CREDENTIALS } from "@/lib/site-config";
import { asObjectArray, cn } from "@/lib/utils";

const PREVIEW_COUNT = 3;

type TrustCredentialId = (typeof TRUST_CREDENTIALS)[number]["id"];

function CredentialMark({ id }: { id: TrustCredentialId }) {
  if (id === "tato") {
    return (
      <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-ink sm:text-[1.65rem]">
        TATO
      </span>
    );
  }

  const icons: Record<"license" | "insured", LucideIcon> = {
    license: BadgeCheck,
    insured: ShieldCheck,
  };

  const Icon = icons[id as keyof typeof icons];
  return <Icon className="h-9 w-9 text-gold sm:h-10 sm:w-10" strokeWidth={1.15} aria-hidden />;
}

function reviewerInitials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

type SocialProofSectionProps = {
  className?: string;
  /** Merged homepage CTA — plan trip + contact (desktop plan uses footer/mobile bar elsewhere). */
  showPlanCta?: boolean;
};

const CREDENTIALS_WITHOUT_TA = TRUST_CREDENTIALS.filter((c) => c.id !== "tripadvisor");

export function SocialProofSection({ className = "", showPlanCta = false }: SocialProofSectionProps) {
  const { t } = useTranslation();

  const reviewItems = asObjectArray<{
    name: string;
    location: string;
    trip: string;
    date: string;
    title: string;
    body: string;
  }>(t("reviews.items", { returnObjects: true }));

  const preview = reviewItems.slice(0, PREVIEW_COUNT).map((r) => ({
    ...r,
    rating: 5,
    initials: reviewerInitials(r.name),
  }));

  return (
    <section className={cn("border-y border-border bg-background", className)} aria-labelledby="social-proof-heading">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-6 sm:py-20 md:px-12 md:py-24">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <span className="eyebrow">{t("reviews.eyebrow")}</span>
              <h2
                id="social-proof-heading"
                className="mt-4 font-serif text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.08] sm:mt-6"
              >
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

        <Reveal className="mt-10 md:mt-12">
          <Carousel
            opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
            className="w-full border border-border bg-card"
            aria-label={t("trust.swipeHint")}
          >
            <CarouselContent className="-ml-0">
              {CREDENTIALS_WITHOUT_TA.map((c, index) => {
                const isExternal = c.href.startsWith("http");
                const linkClass = cn(
                  "group flex h-full min-h-[7rem] flex-col items-center justify-center px-6 py-4 text-center transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                  index > 0 && "border-l border-border/70",
                );

                const slide = (
                  <>
                    <div className="flex h-12 items-center justify-center">
                      <CredentialMark id={c.id} />
                    </div>
                    <p className="mt-3 font-serif text-sm leading-tight text-ink">{t(c.nameKey)}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {t(c.tagKey)}
                    </p>
                  </>
                );

                return (
                  <CarouselItem
                    key={c.id}
                    className="basis-[70%] pl-0 sm:basis-[45%] md:basis-[32%] lg:basis-1/3"
                  >
                    {isExternal ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {slide}
                      </a>
                    ) : (
                      <a href={c.href} className={linkClass}>
                        {slide}
                      </a>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((r) => (
            <article
              key={`${r.name}-${r.date}`}
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
              <h3 className="mt-4 font-serif text-xl leading-snug text-ink md:text-2xl">&ldquo;{r.title}&rdquo;</h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-muted-foreground line-clamp-4">{r.body}</p>
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
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12">
          <a href={SITE.tripAdvisor} target="_blank" rel="noopener noreferrer" className="btn-line">
            {t("reviews.readMore")}
          </a>
          <Link to="/about" className="btn-line">
            {t("socialProof.guestStories")}
          </Link>
        </div>

        {showPlanCta && (
          <Reveal className="mt-14 border-t border-border pt-12 text-center md:mt-16 md:pt-14">
            <span className="eyebrow">{t("home.tailorMade")}</span>
            <h3 className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)] leading-tight">
              <Trans i18nKey="home.ctaTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("home.ctaDesc")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/plan-trip" className="btn-fill hidden lg:inline-flex">
                {t("home.planTrip")}
              </Link>
              <Link to="/contact" className="btn-line">
                {t("home.contactUs")}
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

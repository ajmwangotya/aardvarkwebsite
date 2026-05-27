import { useTranslation } from "react-i18next";
import { BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { TRUST_CREDENTIALS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type TrustCredentialId = (typeof TRUST_CREDENTIALS)[number]["id"];

function CredentialMark({ id }: { id: TrustCredentialId }) {
  if (id === "tato") {
    return (
      <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-ink sm:text-[1.65rem]">
        TATO
      </span>
    );
  }

  if (id === "tripadvisor") {
    return null;
  }

  const icons: Record<"license" | "insured", LucideIcon> = {
    license: BadgeCheck,
    insured: ShieldCheck,
  };

  const Icon = icons[id as keyof typeof icons];
  return Icon ? <Icon className="h-9 w-9 text-gold sm:h-10 sm:w-10" strokeWidth={1.15} aria-hidden /> : null;
}

const CREDENTIALS_WITHOUT_TA = TRUST_CREDENTIALS.filter((c) => c.id !== "tripadvisor");

/** Compact credentials strip — prefer {@link SocialProofSection} on the homepage. */
export function TrustCredentials({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="trust-credentials-heading" className={cn("border-y border-border bg-card", className)}>
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-6 md:px-12 md:py-20">
        <Reveal className="text-center">
          <span className="eyebrow">{t("trust.eyebrow")}</span>
          <h2 id="trust-credentials-heading" className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.75rem)]">
            {t("trust.title")}
          </h2>
        </Reveal>

        <Reveal className="scroll-hint-x mt-10 md:mt-14">
          <Carousel
            opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}
            className="w-full"
            aria-label={t("trust.swipeHint")}
          >
            <CarouselContent className="-ml-0">
              {CREDENTIALS_WITHOUT_TA.map((c, index) => {
                const isExternal = c.href.startsWith("http");
                const linkClass = cn(
                  "group flex h-full min-h-[7.5rem] flex-col items-center justify-center px-6 py-4 text-center transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:min-h-[8rem] sm:px-8",
                  index > 0 && "border-l border-border/70",
                );

                const slide = (
                  <>
                    <div className="flex h-12 items-center justify-center sm:h-14">
                      <CredentialMark id={c.id} />
                    </div>
                    <p className="mt-4 font-serif text-sm leading-tight text-ink sm:text-[0.95rem]">
                      {t(c.nameKey)}
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {t(c.tagKey)}
                    </p>
                  </>
                );

                return (
                  <CarouselItem
                    key={c.id}
                    className="basis-[52%] pl-0 sm:basis-[38%] md:basis-[28%] lg:basis-1/3"
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
      </div>
    </section>
  );
}

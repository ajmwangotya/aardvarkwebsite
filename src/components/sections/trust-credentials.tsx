import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";
import { TRUST_CREDENTIALS, TRIPADVISOR } from "@/lib/site-config";
import { Shield, Award, Heart, Star } from "lucide-react";

const icons = [Shield, Award, Heart, Star];

export function TrustCredentials({ className = "" }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="trust-credentials-heading" className={`border-y border-border bg-card ${className}`}>
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-6 md:px-12 md:py-20">
        <Reveal className="text-center">
          <span className="eyebrow">{t("trust.eyebrow")}</span>
          <h2 id="trust-credentials-heading" className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.75rem)]">
            {t("trust.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("trust.desc")}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_CREDENTIALS.map((c, i) => {
            const Icon = icons[i] ?? Shield;
            const isExternal = "href" in c && c.href.startsWith("http");
            const inner = (
              <>
                <Icon className="h-8 w-8 text-gold" strokeWidth={1.2} />
                <h3 className="mt-4 font-serif text-lg">{t(c.nameKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(c.descKey)}</p>
                {c.id === "tripadvisor" && (
                  <p className="mt-3 text-xs uppercase tracking-eyebrow text-gold">
                    {TRIPADVISOR.rating} · {t("reviews.basedOn")}
                  </p>
                )}
              </>
            );

            const cardClass =
              "block h-full border border-border bg-background p-6 transition-colors hover:border-gold/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

            return (
              <Reveal key={c.id} delay={i * 0.06}>
                {isExternal ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {inner}
                  </a>
                ) : (
                  <a href={c.href} className={cardClass}>
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

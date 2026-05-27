import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { Reveal } from "@/components/motion";
import augustinePhoto from "@/assets/team/team-augustine.jpg";
import waltPhoto from "@/assets/team/team-walt.jpg";
import deborahPhoto from "@/assets/team/team-deborah.jpg";

const team = [
  { src: augustinePhoto, nameKey: "planTripPage.trustPanel.augustineName", roleKey: "planTripPage.trustPanel.augustineRole" },
  { src: waltPhoto, nameKey: "planTripPage.trustPanel.waltName", roleKey: "planTripPage.trustPanel.waltRole" },
  { src: deborahPhoto, nameKey: "planTripPage.trustPanel.deborahName", roleKey: "planTripPage.trustPanel.deborahRole" },
] as const;

export function PlanTripHumanTrust() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="plan-trip-trust-heading" className="border-y border-border bg-secondary/25">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 md:px-12 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">{t("planTripPage.trustPanel.eyebrow")}</span>
              <h2 id="plan-trip-trust-heading" className="mt-4 font-serif text-2xl md:text-3xl">
                {t("planTripPage.trustPanel.title")}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("planTripPage.trustPanel.subtitle")}</p>
              <Link to="/about" className="btn-line mt-6 inline-flex">
                {t("planTripPage.trustPanel.aboutLink")}
              </Link>
            </div>

            <div
              className="flex items-center gap-3 rounded-sm border border-gold/30 bg-card px-4 py-3 sm:gap-4 sm:px-5 sm:py-4 lg:max-w-md lg:shrink-0"
              role="status"
            >
              <Clock className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
              <div>
                <p className="font-serif text-base text-ink">{t("planTripPage.trustPanel.slaTitle")}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("planTripPage.trustPanel.slaBody")}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:justify-start">
          {team.map((member, i) => (
            <Reveal key={member.nameKey} delay={i * 0.06} className="text-center">
              <img
                src={member.src}
                alt={t(member.nameKey)}
                loading="lazy"
                className="mx-auto h-20 w-20 rounded-full border-2 border-gold/40 object-cover sm:h-24 sm:w-24"
              />
              <p className="mt-3 font-serif text-sm text-ink">{t(member.nameKey)}</p>
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-muted-foreground">{t(member.roleKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

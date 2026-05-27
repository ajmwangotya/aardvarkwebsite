import { Link } from "@tanstack/react-router";
import { BookOpen, Mail, Map } from "lucide-react";
import { useTranslation } from "react-i18next";

const steps = [
  { key: "guide", step: 1, to: "/blog/first-timer-guide" as const, icon: BookOpen },
  { key: "circuit", step: 2, to: "/safaris/classic-northern-circuit-safari" as const, icon: Map },
  { key: "contact", step: 3, to: "/contact" as const, icon: Mail },
] as const;

export function HomeStartHere() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="start-here-heading" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 md:px-12">
        <div className="text-center md:text-left">
          <span className="eyebrow">{t("home.startHere.eyebrow")}</span>
          <h2 id="start-here-heading" className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)]">
            {t("home.startHere.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mx-0">
            {t("home.startHere.desc")}
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map(({ key, step, to, icon: Icon }) => (
            <li key={key}>
              <Link
                to={to}
                className="group flex h-full flex-col border border-border bg-card p-5 transition-colors hover:border-gold/40 sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                    {t("home.startHere.stepLabel", { n: step })}
                  </span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-ink transition-colors group-hover:text-gold">
                  {t(`home.startHere.${key}Title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.startHere.${key}Desc`)}
                </p>
                <span className="mt-4 text-[0.65rem] uppercase tracking-eyebrow text-coral group-hover:text-gold">
                  {t(`home.startHere.${key}Cta`)} →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

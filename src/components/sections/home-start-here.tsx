import { Link } from "@tanstack/react-router";
import { Calendar, Compass, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";

const paths = [
  { key: "plan", href: "/plan-trip", icon: Calendar, primary: true },
  { key: "packages", href: "/packages", icon: Compass, primary: false },
  { key: "destinations", href: "/destinations", icon: MapPin, primary: false },
] as const;

export function HomeStartHere() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="start-here-heading" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 md:px-12">
        <Reveal className="text-center md:text-left">
          <span className="eyebrow">{t("home.startHere.eyebrow")}</span>
          <h2 id="start-here-heading" className="mt-4 font-serif text-[clamp(1.5rem,4vw,2.5rem)]">
            {t("home.startHere.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:mx-0">{t("home.startHere.desc")}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {paths.map(({ key, href, icon: Icon, primary }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <Link
                to={href}
                className={`group flex h-full flex-col border p-5 transition-colors sm:p-6 ${
                  primary
                    ? "border-gold/50 bg-card hover:border-gold"
                    : "border-border bg-card hover:border-gold/40"
                }`}
              >
                <span
                  className={`flex h-20 w-20 items-center justify-center rounded-full border sm:h-[5.5rem] sm:w-[5.5rem] ${
                    primary
                      ? "border-gold/40 bg-gold/10"
                      : "border-border bg-secondary group-hover:border-gold/40"
                  }`}
                  aria-hidden
                >
                  <Icon
                    className={`h-11 w-11 sm:h-12 sm:w-12 ${primary ? "text-gold" : "text-muted-foreground group-hover:text-gold"}`}
                    strokeWidth={1.75}
                  />
                </span>
                <h3 className="mt-4 font-serif text-lg text-ink group-hover:text-gold transition-colors">
                  {t(`home.startHere.${key}Title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{t(`home.startHere.${key}Desc`)}</p>
                <span className="mt-4 text-[0.65rem] uppercase tracking-eyebrow text-coral group-hover:text-gold">
                  {t("home.startHere.explore")} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Trans, useTranslation } from "react-i18next";
import { Reveal } from "@/components/motion";
import { asObjectArray } from "@/lib/utils";
import destCulturalEncounter from "@/assets/destinations/dest-cultural-encounter.jpg";

export function ConservationImpactSection() {
  const { t } = useTranslation();
  const projects = asObjectArray<{ title: string; desc: string }>(t("about.conservationProjects", { returnObjects: true }));

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-6 sm:py-24 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">{t("about.conservationEyebrow")}</span>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(1.75rem,5vw,3.25rem)]">
              <Trans i18nKey="about.conservationTitle" components={{ i: <span className="gradient-text italic" /> }} />
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.conservationIntro")}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="image-zoom gold-border-glow mb-10 aspect-[16/10] overflow-hidden">
              <img src={destCulturalEncounter} alt="Community cultural encounter on safari" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <div key={p.title} className="border border-border bg-background p-6 gold-border-glow">
                  <h3 className="font-serif text-xl">{p.title}</h3>
                  <span className="mt-3 block h-px w-10 bg-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

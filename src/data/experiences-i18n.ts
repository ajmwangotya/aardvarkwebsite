import type { TFunction } from "i18next";
import en from "@/locales/en.json";
import { asObjectArray } from "@/lib/utils";

const enExperiences = en.experiences;

export type ExperienceItem = { title: string; desc: string };
export type ExperienceCraft = ExperienceItem;
export type ExperienceCuisine = ExperienceItem;
export type ExperienceSeason = { title: string; items: string[] };
export type ExperienceAirport = { code: string; name: string; desc: string };

function withFallback<T extends Record<string, unknown>>(value: unknown, fallback: T[]): T[] {
  const items = asObjectArray<T>(value);
  return items.length > 0 ? items : fallback;
}

function normalizeSeasons(value: unknown): ExperienceSeason[] {
  return withFallback<ExperienceSeason>(value, enExperiences.seasons as ExperienceSeason[]).map(
    (season, index) => {
      const fallback = (enExperiences.seasons as ExperienceSeason[])[index];
      const items = asObjectArray<string>(season.items);
      return {
        title: season.title?.trim() || fallback?.title || "",
        items: items.length > 0 ? items : (fallback?.items ?? []),
      };
    },
  );
}

export function getExperiencesContent(t: TFunction) {
  return {
    items: withFallback<ExperienceItem>(t("experiences.items", { returnObjects: true }), enExperiences.items),
    crafts: withFallback<ExperienceCraft>(t("experiences.crafts", { returnObjects: true }), enExperiences.crafts),
    cuisine: withFallback<ExperienceCuisine>(t("experiences.cuisine", { returnObjects: true }), enExperiences.cuisine),
    seasons: normalizeSeasons(t("experiences.seasons", { returnObjects: true })),
    airports: withFallback<ExperienceAirport>(
      t("experiences.airports", { returnObjects: true }),
      enExperiences.airports,
    ),
  };
}

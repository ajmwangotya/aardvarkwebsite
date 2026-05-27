import type { TFunction } from "i18next";
import en from "@/locales/en.json";
import { asObjectArray } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

const englishItems = en.faq.items as FaqItem[];

/**
 * FAQ Q&A — questions from locale; answers from English master copy (company profile & terms).
 * Other locale files may lag; answers always match the Arusha profile / terms of business.
 */
export function getFaqItems(t: TFunction): FaqItem[] {
  const localized = asObjectArray<FaqItem>(t("faq.items", { returnObjects: true }));
  const questions = localized.length > 0 ? localized : englishItems;

  return questions
    .map((item, i) => ({
      q: (item.q ?? englishItems[i]?.q ?? "").trim(),
      a: (englishItems[i]?.a ?? item.a ?? "").trim(),
    }))
    .filter((item) => item.q.length > 0 && item.a.length > 0);
}

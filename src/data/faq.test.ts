import assert from "node:assert/strict";
import { describe, it } from "node:test";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json" with { type: "json" };
import { getFaqItems } from "./faq-i18n";

await i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: { en: { translation: en } },
  interpolation: { escapeValue: false },
});

describe("FAQ content", () => {
  it("returns items with non-empty questions and answers", () => {
    const items = getFaqItems(i18n.t.bind(i18n));
    assert.ok(items.length >= 10, `expected at least 10 FAQ items, got ${items.length}`);
    for (const item of items) {
      assert.ok(item.q.length > 20, `question too short: ${item.q}`);
      assert.ok(item.a.length > 40, `answer too short for: ${item.q}`);
    }
  });
});

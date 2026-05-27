import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildLanguagePath, buildLanguageSearch, languageSearchUrl } from "./switch-language.ts";
import { parseLangParam } from "./i18n-instance.ts";

describe("switch-language", () => {
  it("buildLanguageSearch removes lang for English", () => {
    assert.deepEqual(buildLanguageSearch({ lang: "de", foo: "bar" }, "en"), { foo: "bar" });
  });

  it("buildLanguageSearch sets lang for non-English", () => {
    assert.deepEqual(buildLanguageSearch({ foo: "bar" }, "fr"), { foo: "bar", lang: "fr" });
  });

  it("buildLanguagePath updates the query string", () => {
    assert.equal(buildLanguagePath("/packages", { foo: "bar" }, "de"), "/packages?foo=bar&lang=de");
    assert.equal(buildLanguagePath("/packages", { lang: "de" }, "en"), "/packages");
  });

  it("languageSearchUrl updates the query string", () => {
    assert.equal(
      languageSearchUrl("de", "https://www.aardvarktanzania.com/packages"),
      "https://www.aardvarktanzania.com/packages?lang=de",
    );
    assert.equal(
      languageSearchUrl("en", "https://www.aardvarktanzania.com/packages?lang=de"),
      "https://www.aardvarktanzania.com/packages",
    );
  });

  it("parseLangParam falls back to English for invalid codes", () => {
    assert.equal(parseLangParam("xx"), "en");
    assert.equal(parseLangParam(undefined), "en");
    assert.equal(parseLangParam("de"), "de");
  });
});

/**
 * Exports safari copy from safaris.ts into en.json → safarisContent.{slug}
 * Run: npx tsx scripts/export-safaris-content.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const safarisModuleUrl = pathToFileURL(join(root, "src/data/safaris.ts")).href;
const { safaris } = await import(safarisModuleUrl);

const enPath = join(root, "src/locales/en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

const safarisContent = {};
for (const s of safaris) {
  safarisContent[s.slug] = {
    title: s.title,
    duration: s.duration,
    intro: s.intro,
    route: s.route,
    days: s.days,
    highlights: s.highlights,
    fromPrice: s.fromPrice,
    priceNote: s.priceNote,
    bestSeason: s.bestSeason,
    included: s.included,
    excluded: s.excluded,
  };
}

en.safarisContent = safarisContent;
writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`, "utf8");
console.log(`Exported ${Object.keys(safarisContent).length} safaris to en.json → safarisContent`);

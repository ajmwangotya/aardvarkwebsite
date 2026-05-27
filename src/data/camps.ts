/**
 * Featured camps & lodges shown on `/camps`.
 * Order must match `campImages` in `destination-images.ts`.
 * Translations: `camps.items` in `src/locales/*.json` (run `npm run sync-locales` after edits).
 */
export type FeaturedCamp = {
  name: string;
  region: string;
  desc: string;
};

export const FEATURED_CAMPS: FeaturedCamp[] = [
  {
    name: "Serengeti Northern Camp",
    region: "Northern Serengeti",
    desc: "Mobile tented camp following the migration along the Mara River.",
  },
  {
    name: "Ngorongoro Lodge",
    region: "Ngorongoro Crater",
    desc: "Crater-rim views, fireplaces, and sunrise game drives into the caldera.",
  },
  {
    name: "Tarangire Tented Camp",
    region: "Tarangire River",
    desc: "Classic safari tents under ancient baobabs, watching elephants drink at the river.",
  },
  {
    name: "Manyara Treehouse",
    region: "Lake Manyara",
    desc: "Stilted treehouse retreat above the groundwater forest.",
  },
  {
    name: "Selous Wilderness",
    region: "Selous Reserve",
    desc: "Remote bush camp deep in one of Africa's largest reserves.",
  },
  {
    name: "Mount Meru Retreat",
    region: "Arusha",
    desc: "Coffee-plantation retreat — the perfect bookend before and after safari.",
  },
];

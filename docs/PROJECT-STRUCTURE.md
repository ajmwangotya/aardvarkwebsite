# Project structure

```
aardvark-safari-dreams/
├── public/                 # Static files served as-is
│   ├── brochures/          # Downloadable PDF itineraries
│   ├── videos/             # Local dev only (*.mp4 gitignored)
│   ├── robots.txt, sitemap.xml, og-default.jpg
│   └── guest-notes/
├── scripts/                # Node maintenance scripts
├── docs/                   # Documentation (not shipped to users)
│   ├── content/            # Content workflow notes
│   ├── reference/          # Source PDFs and reference material
│   └── EXTERNAL-VIDEOS.md
├── src/
│   ├── assets/             # Images imported by Vite (compressed for web)
│   │   ├── brand/          # Logos
│   │   ├── heroes/         # Homepage hero slides
│   │   ├── destinations/   # dest-* safari imagery
│   │   ├── editorial/      # Blog, accents, shared photos
│   │   └── team/           # Team headshots
│   ├── components/
│   │   ├── layout/         # Header, footer, nav, cookie bar
│   │   ├── sections/       # Homepage / marketing sections
│   │   ├── forms/          # Enquiry and plan-trip forms
│   │   ├── media/          # Video modal, OptimizedImage
│   │   ├── maps/           # Leaflet maps
│   │   └── ui/             # shadcn/ui primitives
│   ├── data/               # Static content catalogs (safaris, packages, …)
│   ├── hooks/
│   ├── lib/                # SEO, i18n, security, enquiry API helpers
│   ├── locales/            # Translation JSON
│   └── routes/             # TanStack Router file-based pages
├── wetransfer__*/           # Original photo delivery (gitignored, local only)
└── package.json
```

## Conventions

- **Routes:** One file per URL under `src/routes/`; do not move without updating the router plugin.
- **Images:** Import from `@/assets/<folder>/<file>`; run `npm run compress-images` after adding large JPGs.
- **Components:** Import from `@/components/<group>/<name>` (e.g. `@/components/layout/site-header`).
- **i18n:** User-facing copy in `src/locales/*.json`; use `useTranslation()` in components.

## Adding a new destination photo

1. Drop the file in `src/assets/destinations/` as `dest-your-name.jpg`.
2. Import it in `src/data/destination-images.ts` and wire it to the right slug.
3. Run `npm run compress-images`.

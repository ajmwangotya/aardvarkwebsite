# Aardvark Safari Dreams

Marketing site for **Aardvark Safaris Tanzania Ltd** — tailor-made safaris across Tanzania and East Africa.

Built with [TanStack Start](https://tanstack.com/start), React 19, Tailwind CSS 4, and i18n (EN, IT, ES, DE, FR).

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (often `http://localhost:8080`).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run deploy` | Build then deploy to Cloudflare Workers |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Enquiry form schema tests |
| `npm run compress-images` | Re-compress `src/assets` for web (requires sharp) |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |
| `npm run upload-videos` | Upload MP4s to Cloudflare R2 (see docs) |

## Project layout

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for the full folder guide.

## Media & deploy

- **Images:** `src/assets/` (organized by type)
- **Videos:** Not in Git — use `public/videos/` locally and a CDN in production ([docs/EXTERNAL-VIDEOS.md](docs/EXTERNAL-VIDEOS.md))

**Hero video on the live site:** After deploy, set **Cloudflare → Workers → Settings → Variables** (build-time):

```env
VITE_VIDEO_CDN_BASE=https://pub-xxxxxxxx.r2.dev
```

Upload films first: `npm run link-videos` then `npm run upload-videos` (R2). Or set `VITE_VIDEO_WILD_REEL` to a YouTube URL. Redeploy after changing env vars.
- **Deploy:** Cloudflare Workers (see `wrangler.jsonc`) or Vercel (`vercel.json`)

### Cloudflare Workers Builds

TanStack Start must be compiled with Vite before Wrangler deploys. In the Cloudflare dashboard (**Workers → your project → Settings → Builds**), set:

- **Deploy command:** `bun run deploy` (or `npm run deploy`)

Do **not** use `npx wrangler deploy` alone — it skips the Vite build and fails on TanStack virtual modules.

## Environment

Copy `.env.example` to `.env` and set Turnstile, video CDN, and optional R2 credentials.

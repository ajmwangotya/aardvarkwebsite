# Host videos outside GitHub

Large MP4s should **not** live in Git. This project loads them from a **CDN URL** in production and from `public/videos/` on your machine during development.

## Quick start (Cloudflare R2 — recommended)

You already deploy with Cloudflare. R2 gives a public URL for static files.

### 1. Create an R2 bucket

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2** → **Create bucket** (e.g. `aardvark-media`).
2. **Settings** → enable **Public access** (R2.dev subdomain or connect a custom domain).
3. Note the public base URL, e.g. `https://pub-xxxxxxxx.r2.dev`.

### 2. Upload the three files

From the project root (with videos in `public/videos/`):

```bash
npx wrangler login
npm run upload-videos
```

Set in `.env` (local) or in **Vercel / Cloudflare** project env:

```env
R2_BUCKET_NAME=aardvark-media
```

Optional if wrangler isn’t logged in via dashboard:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

Files are stored as `videos/aardvark-film.mp4`, etc., matching the site paths.

### 3. Point the site at the CDN

**Vercel** → Project → Settings → Environment Variables:

```env
VITE_VIDEO_CDN_BASE=https://pub-xxxxxxxx.r2.dev
```

Redeploy. The site will request films from the CDN, not from Git.

### 4. Stop tracking videos in Git

One-time (keeps files on your disk):

```bash
npm run untrack-videos
git add -A
git commit -m "Serve brand films from CDN; stop tracking MP4s in Git"
git push origin main
```

After this, `git push` is fast (code only).

---

## Other hosts (same env pattern)

| Provider | Set `VITE_VIDEO_CDN_BASE` to |
|----------|------------------------------|
| **Bunny CDN** | `https://your-zone.b-cdn.net` |
| **AWS S3 + CloudFront** | `https://d123.cloudfront.net` |
| **Any HTTPS folder** | Base URL where `videos/*.mp4` are uploaded |

Upload the three files into a `videos/` folder on that host.

Per-file overrides (optional):

```env
VITE_VIDEO_FEATURE_FILM=https://example.com/film.mp4
VITE_VIDEO_WILD_REEL=https://example.com/wild.mp4
VITE_VIDEO_GORILLA=https://example.com/gorilla.mp4
```

---

## Local development

1. Put compressed MP4s in `public/videos/` (see `scripts/compress-videos.ps1`).
2. **Do not** set `VITE_VIDEO_CDN_BASE` in `.env` — the app uses `/videos/...` locally.
3. Run `npm run dev`.

---

## Compress before upload

```powershell
powershell -File scripts/compress-videos.ps1
```

Target: each file ideally **under ~50 MB** for web and cheap bandwidth.

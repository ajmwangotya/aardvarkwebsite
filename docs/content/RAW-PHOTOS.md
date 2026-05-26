# Raw photo library

The folder `wetransfer__dsc1010-jpeg_2026-05-17_1737/` at the project root is the **original client delivery** (~800 MB). It is **gitignored** and not deployed.

## Workflow

1. Pick images from the wetransfer folder.
2. Copy chosen files into the correct `src/assets/` subfolder:
   - `destinations/` — `dest-*.jpg` slots used on destination and package pages
   - `heroes/` — homepage carousel
   - `editorial/` — blog and general marketing
   - `team/` — about page portraits
3. Register imports in `src/data/destination-images.ts` (for destination slots).
4. Run `npm run compress-images` before committing.

## Source brochure PDF

The full company profile PDF lives at `docs/reference/aardvark-safariprofileV14.pdf` (not used by the live site build).

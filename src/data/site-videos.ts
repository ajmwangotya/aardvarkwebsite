import { videoUrl } from "@/lib/video-url";

/** Brand films — URLs from CDN env in production, /public/videos locally. See docs/EXTERNAL-VIDEOS.md */
const WATCH_FILM = "aardvark-film.mp4" as const;

export const SITE_VIDEOS = {
  /** Hero “Watch the Film” play button → media.aardvarktanzania.com/videos/aardvark-film.mp4 */
  watchFilm: videoUrl(WATCH_FILM),
  watchFilmPoster: "/og-default.jpg",
  /** @deprecated Use watchFilm — kept for any legacy imports */
  featureFilm: videoUrl(WATCH_FILM),
  featureFilmPoster: "/og-default.jpg",
  /** Brand / field reel — About page */
  wildReel: videoUrl("aardvark-wild.mp4"),
  wildReelPoster: "/og-default.jpg",
  /** Uganda gorilla encounter — Uganda destination */
  gorillaUganda: videoUrl("gorilla-uganda.mp4"),
  gorillaUgandaPoster: "/og-default.jpg",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;

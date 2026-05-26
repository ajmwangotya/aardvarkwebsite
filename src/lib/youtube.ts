/** Parse a YouTube watch/share URL or bare 11-char video id. */
export function parseYouTubeId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const watchId = url.searchParams.get("v");
      if (watchId) return watchId;
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") {
        return parts[1] ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function isYouTubeSource(src: string): boolean {
  return parseYouTubeId(src) !== null;
}

type EmbedOptions = {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
};

/** Privacy-enhanced embed (no cookies until play). */
export function youtubeEmbedUrl(src: string, options: EmbedOptions = {}): string | null {
  const id = parseYouTubeId(src);
  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: options.autoplay ? "1" : "0",
    mute: options.mute ? "1" : "0",
    controls: options.controls !== false ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    iv_load_policy: "3",
  });

  if (options.loop) {
    params.set("loop", "1");
    params.set("playlist", id);
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

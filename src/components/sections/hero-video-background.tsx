import { useEffect, useRef, useState } from "react";
import { preloadImage } from "@/lib/preload-image";

type HeroVideoBackgroundProps = {
  /** Full MP4 URL from R2 (via VITE_VIDEO_CDN_BASE). */
  src: string;
  poster?: string;
  paused?: boolean;
};

/** Hero background — video is always in the DOM (SSR + client) so autoplay works without waiting for React. */
export function HeroVideoBackground({ src, poster, paused = false }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (poster) preloadImage(poster);
  }, [poster]);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (paused || failed) return;
    const el = videoRef.current;
    if (!el) return;

    const ensurePlaying = () => {
      el.muted = true;
      el.defaultMuted = true;
      void el.play().catch(() => {
        /* Blocked until gesture — one-time retry below. */
      });
    };

    ensurePlaying();

    const onGesture = () => ensurePlaying();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });

    const onVisible = () => {
      if (document.visibilityState === "visible") ensurePlaying();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [paused, failed, src]);

  if (paused || failed) {
    return poster ? (
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center"
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        aria-hidden
      />
    ) : null;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      data-video-fill
      className="absolute inset-0 z-0 h-full w-full object-cover object-[center_38%] md:object-center"
      aria-hidden
      onError={() => setFailed(true)}
    />
  );
}

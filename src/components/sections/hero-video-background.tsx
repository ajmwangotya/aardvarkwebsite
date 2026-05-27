import { useCallback, useEffect, useRef, useState } from "react";
import { preloadImage } from "@/lib/preload-image";

type HeroVideoBackgroundProps = {
  /** MP4 URL — typically same-origin /videos/* (proxied to R2 in production). */
  src: string;
  poster?: string;
  paused?: boolean;
};

/** Hero background — SSR <video> + aggressive play retries (iOS autoplay, slow networks). */
export function HeroVideoBackground({ src, poster, paused = false }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (poster) preloadImage(poster);
  }, [poster]);

  useEffect(() => {
    setFailed(false);
    setPlaying(false);
  }, [src]);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || paused || failed) return;
    el.defaultMuted = true;
    el.muted = true;
    try {
      await el.play();
    } catch {
      /* Autoplay blocked until gesture — listeners below retry. */
    }
  }, [paused, failed]);

  useEffect(() => {
    if (paused || failed) return;
    const el = videoRef.current;
    if (!el) return;

    void tryPlay();

    const onGesture = () => void tryPlay();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });

    const onVisible = () => {
      if (document.visibilityState === "visible") void tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void tryPlay();
      },
      { threshold: 0.05 },
    );
    observer.observe(el);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
      observer.disconnect();
    };
  }, [paused, failed, src, tryPlay]);

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
      poster={playing ? undefined : poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      data-video-fill
      className="absolute inset-0 z-0 h-full w-full object-cover object-[center_38%] md:object-center"
      aria-hidden
      onLoadedData={() => void tryPlay()}
      onCanPlay={() => void tryPlay()}
      onPlaying={() => setPlaying(true)}
      onError={() => setFailed(true)}
    />
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { preloadImage } from "@/lib/preload-image";

type HeroVideoBackgroundProps = {
  /** Full MP4 URL from R2 (via VITE_VIDEO_CDN_BASE). */
  src: string;
  poster?: string;
  paused?: boolean;
};

const MAX_LOAD_RETRIES = 2;

export function HeroVideoBackground({ src, poster, paused = false }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const fallbackImage = poster;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    retryRef.current = 0;
    setFailed(false);
    setPlaying(false);
  }, [src]);

  useEffect(() => {
    if (fallbackImage) preloadImage(fallbackImage);
  }, [fallbackImage]);

  const playVideo = useCallback(async () => {
    if (!mounted || paused || failed) return;
    const el = videoRef.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      // Autoplay blocked until user gesture — listener below retries.
    }
  }, [mounted, paused, failed]);

  useEffect(() => {
    if (!mounted || paused || failed) return;
    const el = videoRef.current;
    if (!el) return;

    void playVideo();

    const onGesture = () => void playVideo();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });
    window.addEventListener("touchstart", onGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, [mounted, playVideo, paused, failed, src]);

  const onVideoError = useCallback(() => {
    const el = videoRef.current;
    if (!el) {
      setFailed(true);
      return;
    }
    if (retryRef.current < MAX_LOAD_RETRIES) {
      retryRef.current += 1;
      el.load();
      void playVideo();
      return;
    }
    setFailed(true);
  }, [playVideo]);

  const posterClass =
    "absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center transition-opacity duration-700";

  if (!mounted) {
    return fallbackImage ? (
      <img
        src={fallbackImage}
        alt=""
        className={`${posterClass} opacity-100`}
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        aria-hidden
      />
    ) : null;
  }

  if ((paused || failed) && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt=""
        className={`${posterClass} opacity-100`}
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className={`${posterClass} z-[1] ${playing ? "opacity-0" : "opacity-100"}`}
          decoding="sync"
          fetchPriority="high"
          loading="eager"
          aria-hidden
        />
      )}
      <video
        ref={videoRef}
        src={src}
        poster={fallbackImage}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        data-video-fill
        className="absolute inset-0 z-0 h-full w-full object-cover object-[center_38%] md:object-center"
        aria-hidden
        onLoadedData={() => void playVideo()}
        onCanPlay={() => void playVideo()}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={onVideoError}
      />
    </div>
  );
}

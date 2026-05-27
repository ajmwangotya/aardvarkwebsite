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
  const [failed, setFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const fallbackImage = poster;

  useEffect(() => {
    retryRef.current = 0;
    setFailed(false);
    setVideoReady(false);
  }, [src]);

  useEffect(() => {
    if (fallbackImage) preloadImage(fallbackImage);
  }, [fallbackImage]);

  const revealFrame = useCallback(() => {
    const el = videoRef.current;
    if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setVideoReady(true);
    }
  }, []);

  const playVideo = useCallback(async () => {
    if (paused || failed) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    revealFrame();
    try {
      await el.play();
      setVideoReady(true);
    } catch {
      // Autoplay may be blocked until the user interacts with the page.
    }
  }, [paused, failed, revealFrame]);

  useEffect(() => {
    void playVideo();
  }, [playVideo, src]);

  useEffect(() => {
    if (paused || failed) return;
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void playVideo();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    const onGesture = () => void playVideo();
    window.addEventListener("pointerdown", onGesture, { once: true, passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", onGesture);
    };
  }, [playVideo, paused, failed]);

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

  if ((paused || failed) && fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt=""
        className="h-full w-full object-cover object-[center_38%] md:object-center"
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0">
      {fallbackImage && (
        <img
          src={fallbackImage}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-[center_38%] transition-opacity duration-700 md:object-center ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
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
        fetchPriority="high"
        data-video-fill
        className={`absolute inset-0 h-full w-full object-cover object-[center_38%] transition-opacity duration-700 md:object-center ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
        onLoadedMetadata={() => {
          revealFrame();
          void playVideo();
        }}
        onLoadedData={() => {
          revealFrame();
          void playVideo();
        }}
        onCanPlay={() => void playVideo()}
        onPlaying={() => setVideoReady(true)}
        onError={onVideoError}
      />
    </div>
  );
}

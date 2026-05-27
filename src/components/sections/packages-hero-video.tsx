import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useTranslation } from "react-i18next";

type PackagesHeroVideoProps = {
  src: string;
  poster: string;
  caption: string;
};

export function PackagesHeroVideo({ src, poster, caption }: PackagesHeroVideoProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || failed) return;
    el.defaultMuted = true;
    el.muted = true;
    try {
      await el.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  }, [failed]);

  useEffect(() => {
    setFailed(false);
    setNeedsTap(false);
  }, [src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;

    void tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void tryPlay();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [failed, src, tryPlay]);

  if (failed) {
    return (
      <figure className="relative w-full overflow-hidden rounded-sm border border-border bg-ink shadow-lg lg:ml-auto">
        <img src={poster} alt="" className="aspect-[4/3] w-full object-cover sm:aspect-video" loading="eager" />
        <figcaption className="bg-ink px-4 py-3 text-[0.65rem] uppercase tracking-[0.18em] text-bone/85 sm:text-xs">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="group relative w-full overflow-hidden rounded-sm border border-border bg-ink shadow-lg lg:ml-auto">
      <div className="relative aspect-[4/3] bg-ink sm:aspect-video">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          controls
          className="h-full w-full object-cover object-center"
          onLoadedData={() => void tryPlay()}
          onCanPlay={() => void tryPlay()}
          onPlaying={() => setNeedsTap(false)}
          onError={() => setFailed(true)}
        />
        {needsTap && (
          <button
            type="button"
            onClick={() => void tryPlay()}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-ink/45 text-bone backdrop-blur-[2px] transition-colors hover:bg-ink/55"
            aria-label={t("home.watchFilm")}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/60 bg-ink/60">
              <Play className="h-4 w-4 fill-current" aria-hidden />
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.2em]">{t("home.watchFilm")}</span>
          </button>
        )}
      </div>
      <figcaption className="bg-ink px-4 py-3 text-[0.65rem] uppercase tracking-[0.18em] text-bone/85 sm:text-xs">
        {caption}
      </figcaption>
    </figure>
  );
}

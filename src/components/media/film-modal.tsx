import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type FilmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Full MP4 URL from R2 (via VITE_VIDEO_CDN_BASE). */
  src: string;
  poster?: string;
  titleKey?: string;
};

export function FilmModal({ open, onOpenChange, src, poster, titleKey = "home.filmTitle" }: FilmModalProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [src, open]);

  useEffect(() => {
    if (!open) return;
    const el = videoRef.current;
    if (!el) return;

    const play = async () => {
      if (el.readyState < HTMLMediaElement.HAVE_METADATA) {
        el.load();
      }
      try {
        await el.play();
      } catch {
        // User can press play via native controls.
      }
    };

    void play();
    return () => {
      el.pause();
      el.currentTime = 0;
    };
  }, [open, src]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(96vw,72rem)] gap-0 overflow-hidden border-ink/40 bg-ink p-0 sm:rounded-sm"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{t(titleKey)}</DialogTitle>
        <DialogDescription className="sr-only">{t("home.filmDesc")}</DialogDescription>
        <div className="relative aspect-video w-full bg-black">
          {loadError ? (
            <p className="flex h-full items-center justify-center px-6 text-center text-sm text-bone/80">
              {t("home.filmUnsupported")}
            </p>
          ) : (
            <video
              key={src}
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              preload="auto"
              className="h-full w-full object-contain"
              onError={() => setLoadError(true)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useRef } from "react";
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
  src: string;
  poster?: string;
  titleKey?: string;
};

export function FilmModal({ open, onOpenChange, src, poster, titleKey = "home.filmTitle" }: FilmModalProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (open) {
      el.load();
      void el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(96vw,72rem)] gap-0 overflow-hidden border-ink/40 bg-ink p-0 sm:rounded-sm"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{t(titleKey)}</DialogTitle>
        <DialogDescription className="sr-only">{t("home.filmDesc")}</DialogDescription>
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={open ? src : undefined}
            poster={poster}
            controls
            playsInline
            preload="none"
            className="h-full w-full object-contain"
          >
            {t("home.filmUnsupported")}
          </video>
        </div>
      </DialogContent>
    </Dialog>
  );
}

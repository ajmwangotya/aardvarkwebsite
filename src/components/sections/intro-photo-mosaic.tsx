import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { OptimizedImage } from "@/components/media/optimized-image";
import { preloadImage } from "@/lib/preload-image";

export type MosaicPhoto = {
  src: string;
  alt: string;
};

const ROTATE_MS = 5000;
const MOBILE_ROTATE_MS = 4500;

type IntroPhotoMosaicProps = {
  photos: MosaicPhoto[];
  layout: [number, number, number, number];
  aspects: [string, string, string, string];
};

function MosaicCell({
  photo,
  aspectClass,
  priority = false,
}: {
  photo: MosaicPhoto;
  aspectClass: string;
  priority?: boolean;
}) {
  return (
    <div className={`image-zoom ${aspectClass} gold-border-glow relative overflow-hidden bg-muted`}>
      <OptimizedImage
        src={photo.src}
        alt={photo.alt}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function MosaicCellRotating({
  photos,
  startIndex,
  aspectClass,
  staggerMs,
  enabled,
  priority = false,
}: {
  photos: MosaicPhoto[];
  startIndex: number;
  aspectClass: string;
  staggerMs: number;
  enabled: boolean;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (!enabled || photos.length < 2) return;
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((i) => (i + 1) % photos.length);
      }, ROTATE_MS);
    }, staggerMs);
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [enabled, photos.length, staggerMs]);

  const photo = photos[index % photos.length];
  const nextPhoto = photos[(index + 1) % photos.length];

  useEffect(() => {
    preloadImage(nextPhoto.src);
  }, [nextPhoto.src]);

  return <MosaicCell photo={photo} aspectClass={aspectClass} priority={priority} />;
}

export function IntroPhotoMosaic({ photos, layout, aspects }: IntroPhotoMosaicProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-12% 0px", amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);
  const [syncIndex, setSyncIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!inView || photos.length === 0) return;
    for (let i = 0; i < 4; i++) {
      preloadImage(photos[(layout[i] ?? 0) % photos.length].src);
    }
  }, [inView, photos, layout]);

  useEffect(() => {
    if (!isMobile || !inView || photos.length < 2) return;
    const id = window.setInterval(() => {
      setSyncIndex((i) => (i + 1) % photos.length);
    }, MOBILE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isMobile, inView, photos.length]);

  if (photos.length === 0) return null;

  const cells: { startIndex: number; aspect: string; staggerMs: number }[] = [
    { startIndex: layout[0], aspect: aspects[0], staggerMs: 0 },
    { startIndex: layout[1], aspect: aspects[1], staggerMs: 800 },
    { startIndex: layout[2], aspect: aspects[2], staggerMs: 1600 },
    { startIndex: layout[3], aspect: aspects[3], staggerMs: 2400 },
  ];

  return (
    <div ref={rootRef} className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        {isMobile ? (
          <>
            <MosaicCell
              photo={photos[(syncIndex + cells[0].startIndex) % photos.length]}
              aspectClass={cells[0].aspect}
              priority
            />
            <MosaicCell
              photo={photos[(syncIndex + cells[1].startIndex) % photos.length]}
              aspectClass={cells[1].aspect}
            />
          </>
        ) : (
          <>
            <MosaicCellRotating
              photos={photos}
              startIndex={cells[0].startIndex}
              aspectClass={cells[0].aspect}
              staggerMs={cells[0].staggerMs}
              enabled={inView}
              priority
            />
            <MosaicCellRotating
              photos={photos}
              startIndex={cells[1].startIndex}
              aspectClass={cells[1].aspect}
              staggerMs={cells[1].staggerMs}
              enabled={inView}
            />
          </>
        )}
      </div>
      <div className="space-y-4 md:pt-12">
        {isMobile ? (
          <>
            <MosaicCell
              photo={photos[(syncIndex + cells[2].startIndex) % photos.length]}
              aspectClass={cells[2].aspect}
            />
            <MosaicCell
              photo={photos[(syncIndex + cells[3].startIndex) % photos.length]}
              aspectClass={cells[3].aspect}
            />
          </>
        ) : (
          <>
            <MosaicCellRotating
              photos={photos}
              startIndex={cells[2].startIndex}
              aspectClass={cells[2].aspect}
              staggerMs={cells[2].staggerMs}
              enabled={inView}
            />
            <MosaicCellRotating
              photos={photos}
              startIndex={cells[3].startIndex}
              aspectClass={cells[3].aspect}
              staggerMs={cells[3].staggerMs}
              enabled={inView}
            />
          </>
        )}
      </div>
    </div>
  );
}

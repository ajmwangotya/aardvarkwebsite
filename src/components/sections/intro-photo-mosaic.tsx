import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { OptimizedImage } from "@/components/media/optimized-image";

export type MosaicPhoto = {
  src: string;
  alt: string;
};

const ROTATE_MS = 5000;
const MOBILE_ROTATE_MS = 4500;

type IntroPhotoMosaicProps = {
  photos: MosaicPhoto[];
  /** Four starting indices into `photos` (one per cell). */
  layout: [number, number, number, number];
  aspects: [string, string, string, string];
};

function MosaicCell({
  photos,
  index,
  aspectClass,
}: {
  photos: MosaicPhoto[];
  index: number;
  aspectClass: string;
}) {
  const active = photos[index % photos.length];

  return (
    <div className={`image-zoom ${aspectClass} gold-border-glow relative overflow-hidden`}>
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className="intro-mosaic__slide absolute inset-0"
          style={{
            opacity: i === index % photos.length ? 1 : 0,
            zIndex: i === index % photos.length ? 1 : 0,
          }}
          aria-hidden={i !== index % photos.length}
        >
          <OptimizedImage src={photo.src} alt={photo.alt} className="h-full w-full object-cover" />
        </div>
      ))}
      <span className="sr-only">{active.alt}</span>
    </div>
  );
}

function MosaicCellRotating({
  photos,
  startIndex,
  aspectClass,
  staggerMs,
  enabled,
}: {
  photos: MosaicPhoto[];
  startIndex: number;
  aspectClass: string;
  staggerMs: number;
  enabled: boolean;
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

  return <MosaicCell photos={photos} index={index} aspectClass={aspectClass} />;
}

/** Four-up mosaic under the hero — crossfades through the photo pool (synced on mobile). */
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
              photos={photos}
              index={(syncIndex + cells[0].startIndex) % photos.length}
              aspectClass={cells[0].aspect}
            />
            <MosaicCell
              photos={photos}
              index={(syncIndex + cells[1].startIndex) % photos.length}
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
              photos={photos}
              index={(syncIndex + cells[2].startIndex) % photos.length}
              aspectClass={cells[2].aspect}
            />
            <MosaicCell
              photos={photos}
              index={(syncIndex + cells[3].startIndex) % photos.length}
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

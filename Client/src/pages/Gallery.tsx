import React, { useEffect, useMemo, useState } from 'react';
import { galleryImages } from '../data/galleryImages';

const srOnly = 'sr-only';

const Gallery: React.FC = () => {
  const images = useMemo(() => galleryImages, []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const MOBILE_PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState<number>(MOBILE_PAGE_SIZE);

  const open = (idx: number) => setLightboxIndex(idx);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, images.length]);

  // Track mobile viewport (Tailwind sm breakpoint is 640px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mq.matches);
    update();
    // Modern browsers
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    // Fallback
    // @ts-ignore
    mq.addListener?.(update);
    return () => {
      // @ts-ignore
      mq.removeListener?.(update);
    };
  }, []);

  // Reset visible count when switching between mobile and larger screens
  useEffect(() => {
    if (isMobile) {
      setVisibleCount(MOBILE_PAGE_SIZE);
    } else {
      setVisibleCount(images.length);
    }
  }, [isMobile, images.length]);

  const displayImages = isMobile ? images.slice(0, visibleCount) : images;
  const canLoadMore = isMobile && visibleCount < images.length;
  const loadMore = () =>
    setVisibleCount((c) => Math.min(c + MOBILE_PAGE_SIZE, images.length));

  return (
    <div className="min-h-[60vh] bg-white">
      {/* Hero similar to Services */}
  <section className="relative h-[20dvh] sm:h-[20dvh] lg:h-[34dvh] overflow-hidden">
        <img
          src="/Carousel.png"
          alt="Gallery banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--color-primary-blue)]/70 via-[var(--color-primary-blue)]/60 to-transparent backdrop-blur-[2px] sm:backdrop-blur" />
        <div className="relative h-full w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center pb-6 sm:pb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading leading-tight">Gallery</h1>
            <p className="text-white/90 max-w-2xl mt-2 text-sm sm:text-base">
              A curated look at our field work, equipment, and facilities.
              <br className="hidden sm:block" />
              From on-site PWHT and preheating to shop furnaces and large vessel projects.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-14">
        {/* Parent wrapper with slight greyish background */}
        <div className="rounded-lg bg-[var(--color-neutral-gray)]/80 border border-[var(--color-light-gray)] p-3 sm:p-4">
          {/* Masonry using CSS columns for a Pinterest-like layout 
              - Mobile: 2 columns
              - md: 3 columns
              - xl: 4 columns
          */}
          <div className="masonry columns-2 md:columns-3 xl:columns-4 gap-x-4">
            {displayImages.map((img) => {
              const globalIdx = images.findIndex((i) => i.src === img.src);
              return (
              <div
                key={img.src}
                className="masonry-item inline-block w-full align-top break-inside-avoid"
              >
                <button
                  className="group relative w-full overflow-hidden rounded-lg bg-[var(--color-neutral-gray)] shadow hover:shadow-lg transition-shadow"
                  onClick={() => open(globalIdx)}
                  aria-label={`Open image ${globalIdx + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-auto block group-hover:opacity-95 transition-opacity duration-300"
                  />
                  <span className="absolute inset-0 ring-1 ring-black/5 rounded-lg pointer-events-none" />
                </button>
              </div>
            );})}
          </div>

          {/* Mobile pagination: Load 10 more at a time */}
          {canLoadMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 rounded-md bg-[var(--color-primary-orange)] text-white shadow hover:shadow-md hover:bg-[var(--color-primary-blue)]/90 active:scale-[0.99] transition"
              >
                Load 10 more
              </button>
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button className={srOnly} aria-label="Close" onClick={close} />
          <div className="relative max-w-6xl w-full">
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
            />
            {/* Controls */}
            <div className="absolute inset-x-0 -bottom-12 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="bg-white/90 hover:bg-white text-[var(--color-dark)] px-4 py-2 rounded shadow"
              >
                Prev
              </button>
              <button
                onClick={close}
                className="bg-white/90 hover:bg-white text-[var(--color-dark)] px-4 py-2 rounded shadow"
              >
                Close
              </button>
              <button
                onClick={next}
                className="bg-white/90 hover:bg-white text-[var(--color-dark)] px-4 py-2 rounded shadow"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

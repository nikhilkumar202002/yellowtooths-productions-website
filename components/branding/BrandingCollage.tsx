"use client";

import { useEffect, useState } from "react";

type BrandingCollageProps = {
  images: string[];
  projectName: string;
};

const tileClasses = [
  "col-span-2 sm:col-span-8",
  "col-span-1 sm:col-span-4",
  "col-span-1 sm:col-span-4",
  "col-span-2 sm:col-span-6",
  "col-span-1 sm:col-span-3",
  "col-span-1 sm:col-span-3",
  "col-span-2 sm:col-span-5",
  "col-span-2 sm:col-span-7",
];

const BrandingCollage = ({
  images,
  projectName,
}: BrandingCollageProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  };

  return (
    <>
      <div className="grid auto-flow-dense grid-cols-2 gap-2 sm:grid-cols-12 sm:gap-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative self-start overflow-hidden rounded-lg bg-white/5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fec52d] sm:rounded-2xl ${
              tileClasses[index % tileClasses.length]
            }`}
            aria-label={`Open ${projectName} branding image ${index + 1}`}
          >
            {/* The source collection does not expose image dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${projectName} branding design ${index + 1}`}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="font-description absolute right-3 bottom-3 rounded-full bg-black/65 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm sm:right-5 sm:bottom-5 sm:text-xs">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${projectName} image viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="font-description absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-xl text-white/70 transition-colors hover:border-white hover:text-white sm:top-7 sm:right-7"
            aria-label="Close image viewer"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-colors hover:border-white hover:text-white sm:left-7"
                aria-label="Previous image"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-5"
                >
                  <path
                    d="m15 5-7 7 7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 transition-colors hover:border-white hover:text-white sm:right-7"
                aria-label="Next image"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-5"
                >
                  <path
                    d="m9 5 7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </>
          )}

          <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={images[activeIndex]}
              src={images[activeIndex]}
              alt={`${projectName} branding design ${activeIndex + 1}`}
              className="max-h-[82vh] max-w-full rounded-lg object-contain"
            />
            <p className="font-description text-xs uppercase tracking-[0.14em] text-white/45">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandingCollage;

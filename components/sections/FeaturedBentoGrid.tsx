"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllFilmPosterDesigns } from "@/api/axios";
import Container from "@/components/common/Container";
import styles from "./FeaturedBentoGrid.module.css";

const imageGroups = [
  [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    "https://images.unsplash.com/photo-1484981184820-2e84ea0f445a",
  ],
  [
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
  ],
  [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262",
  ],
  [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ],
  [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
  ],
  [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7",
  ],
  [
    "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  ],
];

const intervals = [4700, 6200, 5300, 7100, 5800, 6600, 7500];
const delays = [900, 1800, 2700, 1300, 3400, 2200, 3000];
const youtubeVideoIds = ["ZAVjO5GLFI4", "CLqWPaA_PJM"];
const youtubePlaylist = youtubeVideoIds.join(",");

const getImageUrl = (src: string) =>
  src.includes("images.unsplash.com")
    ? `${src}?auto=format&fit=crop&w=1600&q=85`
    : src;

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const image = new window.Image();
    image.src = getImageUrl(src);
  });
};

const useRotatingImage = (
  images: string[],
  interval: number,
  delay: number,
) => {
  const [index, setIndex] = useState(0);
  const [hasAdvanced, setHasAdvanced] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = window.setTimeout(() => {
      setHasAdvanced(true);
      setIndex((current) => (current + 1) % images.length);
      intervalId = setInterval(() => {
        setHasAdvanced(true);
        setIndex((current) => (current + 1) % images.length);
      }, interval);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, images.length, interval]);

  const previousIndex = (index - 1 + images.length) % images.length;

  return {
    src: images[index],
    previousSrc: hasAdvanced ? images[previousIndex] : null,
    index,
    animate: hasAdvanced,
  };
};

const FeaturedImage = ({
  src,
  previousSrc,
  index,
  alt,
  animate,
}: {
  src: string;
  previousSrc: string | null;
  index: number;
  alt: string;
  animate: boolean;
}) => (
  <div className={styles.imageStage}>
    {previousSrc && (
      <Image
        key={`previous-${previousSrc}-${index}`}
        src={getImageUrl(previousSrc)}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
        className={`${styles.image} ${styles.imageOutgoing}`}
      />
    )}
    <Image
      key={`current-${src}-${index}`}
      src={getImageUrl(src)}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
      className={`${styles.image} ${animate ? styles.imageIncoming : ""}`}
    />
  </div>
);

const FeaturedBentoGrid = () => {
  const [posterImages, setPosterImages] = useState(imageGroups[0]);
  const [posterNames, setPosterNames] = useState<string[]>([]);

  useEffect(() => {
    preloadImages(imageGroups.flat());
  }, []);

  useEffect(() => {
    let isActive = true;

    getAllFilmPosterDesigns()
      .then((posters) => {
        if (!isActive) return;

        const postersWithImages = posters
          .filter((poster) => poster.main_image)
          .sort(
            (first, second) =>
              (second.position_number ?? second.id) -
              (first.position_number ?? first.id),
          )
          .slice(0, 5);

        if (postersWithImages.length > 0) {
          const latestPosterImages = postersWithImages.map(
            (poster) => poster.main_image as string,
          );

          preloadImages(latestPosterImages);
          setPosterImages(latestPosterImages);
          setPosterNames(
            postersWithImages.map((poster) => poster.film_name),
          );
        }
      })
      .catch(() => {
        // Keep the local fallback images when the API is unavailable.
      });

    return () => {
      isActive = false;
    };
  }, []);

  const imageOne = useRotatingImage(posterImages, intervals[0], delays[0]);
  const imageTwo = useRotatingImage(imageGroups[1], intervals[1], delays[1]);
  const imageFour = useRotatingImage(imageGroups[3], intervals[3], delays[3]);
  const imageFive = useRotatingImage(imageGroups[4], intervals[4], delays[4]);
  const imageSeven = useRotatingImage(imageGroups[6], intervals[6], delays[6]);
  const images = [
    imageOne,
    imageTwo,
    null,
    imageFour,
    imageFive,
    null,
    imageSeven,
  ];

  const areas = [
    styles.digital,
    styles.showreel,
    styles.branding,
    styles.poster,
    styles.campaign,
    styles.experience,
    styles.palette,
  ];

  return (
    <section className="border-b border-white/15 bg-black py-16 text-white sm:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-heading max-w-2xl text-2xl uppercase leading-none tracking-[-0.05em] sm:text-4xl">
            Featured Works
          </h2>

          <Link
            href="/works"
            className="font-description group flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-white"
          >
            View all work
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M5 12h14m-5-5 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {images.map((image, index) => {
            if (index === 5) {
              return (
                <div
                  key={areas[index]}
                  className={`${styles.card} ${areas[index]}`}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeVideoIds[0]}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&modestbranding=1&playlist=${youtubePlaylist}&playsinline=1&rel=0`}
                    title="Yellowtooths featured videos"
                    className={styles.youtubeFrame}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    tabIndex={-1}
                  />
                </div>
              );
            }

            return (
              <Link
                key={areas[index]}
                href="/works"
                className={`${styles.card} ${areas[index]}`}
                aria-label={`View featured work ${index + 1}`}
              >
                {image ? (
                  <FeaturedImage
                    {...image}
                    alt={
                      index === 0
                        ? posterNames[image.index] || "Yellowtooths film poster"
                        : `Yellowtooths featured work ${index + 1}`
                    }
                  />
                ) : (
                  <div className={styles.logoCard}>
                    <Image
                      src="/toot_Logo.svg"
                      alt="Yellowtooths Productions"
                      width={240}
                      height={240}
                      className="h-auto w-[45%] max-w-48"
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedBentoGrid;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllFilmPosterDesigns } from "@/api/axios";
import Container from "@/components/common/Container";
import styles from "./FeaturedBentoGrid.module.css";

const imageGroups = [
  ["/Images/1.jpg", "/Images/2.jpg", "/Images/3.jpg"],
  ["/Images/tech-mockup.jpg"],
  [
    "/Images/fasion opticals.jpg.jpeg",
    "/Images/meduselle.jpg.jpeg",
    "/Images/mendiary.jpg.jpeg",
    "/Images/viscara.jpg.jpeg",
  ],
  ["/Images/1.jpg", "/Images/2.jpg", "/Images/3.jpg"],
];

const intervals = [4700, 6200, 5600, 7100];
const delays = [900, 1800, 1200, 2300];
const youtubeVideoIds = ["ZAVjO5GLFI4", "CLqWPaA_PJM"];
const youtubePlaylist = youtubeVideoIds.join(",");

const preloadImages = (images: string[]) => {
  images.forEach((src) => {
    const image = new window.Image();
    image.src = src;
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
        src={previousSrc}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
        className={`${styles.image} ${styles.imageOutgoing}`}
      />
    )}
    <Image
      key={`current-${src}-${index}`}
      src={src}
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
  const imageThree = useRotatingImage(imageGroups[2], intervals[2], delays[2]);
  const imageFour = useRotatingImage(imageGroups[3], intervals[3], delays[3]);

  return (
    <section className="border-b border-white/15 bg-black py-16 text-white sm:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-heading max-w-2xl text-2xl capitalize leading-none tracking-[-0.05em] sm:text-4xl">
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
          <div className={styles.leftGrid}>
            <Link
              href="/works"
              className={`${styles.card} ${styles.leftTall}`}
              aria-label="View featured film poster"
            >
              <FeaturedImage
                {...imageOne}
                alt={
                  posterNames[imageOne.index] || "Yellowtooths film poster"
                }
              />
            </Link>

            <div
              className={`${styles.card} ${styles.centerTop}`}
              aria-hidden="true"
            />

            <Link
              href="/works"
              className={`${styles.card} ${styles.centerMiddle}`}
              aria-label="View featured UI design project"
            >
              <FeaturedImage
                {...imageTwo}
                alt="Yellowtooths featured UI design project"
              />
            </Link>

            <div className={`${styles.card} ${styles.bottomVideo}`}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoIds[0]}?autoplay=1&mute=1&controls=0&disablekb=1&fs=0&iv_load_policy=3&loop=1&modestbranding=1&playlist=${youtubePlaylist}&playsinline=1&rel=0`}
                title="Yellowtooths featured videos"
                className={styles.youtubeFrame}
                allow="autoplay; encrypted-media; picture-in-picture"
                tabIndex={-1}
              />
            </div>
          </div>

          <div className={styles.rightGrid}>
            <Link
              href="/works"
              className={`${styles.card} ${styles.rightTop}`}
              aria-label="View featured branding project"
            >
              <FeaturedImage
                {...imageThree}
                alt="Yellowtooths featured branding project"
              />
            </Link>

            <Link
              href="/works"
              className={`${styles.card} ${styles.rightBottom}`}
              aria-label="View Yellowtooths studio"
            >
              <FeaturedImage
                {...imageFour}
                alt="Yellowtooths production studio"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedBentoGrid;

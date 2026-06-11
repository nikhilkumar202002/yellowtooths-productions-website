"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllFilmPosterDesigns, type FilmPosterDesign } from "@/api/axios";
import Container from "@/components/common/Container";
import styles from "./FeaturedBentoGrid.module.css";

const imageGroups = [
  ["/Images/2.jpg", "/Images/3.jpg"],
  ["/Images/tech-mockup.jpg"],
  [
    "/Images/fasion opticals.jpg.jpeg",
    "/Images/meduselle.jpg.jpeg",
    "/Images/mendiary.jpg.jpeg",
    "/Images/viscara.jpg.jpeg",
  ],
];

const intervals = [4700, 6200, 5600];
const delays = [900, 1800, 1200];

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
    if (!images || images.length === 0) return;
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
  }, [delay, images, interval]);

  const previousIndex = images && images.length ? (index - 1 + images.length) % images.length : 0;

  return {
    src: images && images.length ? images[index] : "",
    previousSrc: hasAdvanced && images && images.length ? images[previousIndex] : null,
    index: images && images.length ? index : 0,
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
  src?: string;
  previousSrc: string | null;
  index: number;
  alt: string;
  animate: boolean;
}) => {
  if (!src) return <div className={styles.imageStage} />;

  return (
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
};

const CardLabel = ({
  title,
  className,
  eyebrow,
  detail,
}: {
  title: React.ReactNode;
  className: string;
  eyebrow?: React.ReactNode;
  detail?: React.ReactNode;
}) => (
  <div className={`${styles.cardLabel} ${className}`} aria-hidden="true">
    {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
    <span className={styles.cardTitle}>{title}</span>
    {detail && <span className={styles.detail}>{detail}</span>}
  </div>
);

const FeaturedBentoGrid = () => {
  const [posterImages, setPosterImages] = useState<string[]>([]);
  const [posterNames, setPosterNames] = useState<string[]>([]);


  useEffect(() => {
    let isActive = true;

    getAllFilmPosterDesigns()
      .then((posters) => {
        if (!isActive) return;

        const getPosterImage = (poster: FilmPosterDesign) =>
          poster.main_image || poster.images?.[0]?.file_path || null;

        const postersWithImages = posters
          .filter((poster) => getPosterImage(poster))
          .sort(
            (first, second) =>
              (second.position_number ?? second.id) -
              (first.position_number ?? first.id),
          )
          .slice(0, 5);

        if (postersWithImages.length > 0) {
          const latestPosterImages = postersWithImages.map((poster) =>
            getPosterImage(poster) as string,
          );

          preloadImages(latestPosterImages);
          setPosterImages(latestPosterImages);
          setPosterNames(postersWithImages.map((poster) => poster.film_name));
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
              href="/services/film-poster"
              className={`${styles.card} ${styles.leftTall}`}
              aria-label="View Film Poster service"
            >
              <FeaturedImage
                {...imageOne}
                alt={
                  posterNames[imageOne.index] || "Yellowtooths film poster"
                }
              />
              <CardLabel
                title="Movies."
                className={styles.moviesLabel}
                eyebrow={
                  <>
                    Featuring
                    <br />
                    Movie Poster
                    <br />
                    Keyarts
                  </>
                }
                detail="#12"
              />
            </Link>

            <Link
              href="/services/global-academy-of-artistry"
              className={`${styles.card} ${styles.centerTop}`}
              aria-label="View Global Academy of Artistry service"
            >
              <video
                className={styles.localVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Yellowtooths Global Academy of Artistry project"
              >
                <source src="/Videos/gaa-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <CardLabel
                title="GAA."
                className={styles.gaaLabel}
                eyebrow="Testimonials / 2025"
                detail="Global Academy of Artistry"
              />
            </Link>

            <Link
              href="/services/technology-experience-design"
              className={`${styles.card} ${styles.centerMiddle}`}
              aria-label="View Technology and Experience Design service"
            >
              <FeaturedImage
                {...imageTwo}
                alt="Yellowtooths featured website project"
              />
              <CardLabel
                title="Website."
                className={styles.websiteLabel}
              />
            </Link>

            <Link
              href="/services/video-production"
              className={`${styles.card} ${styles.bottomVideo}`}
              aria-label="View Video Production service"
            >
              <video
                className={styles.localVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Yellowtooths motion work"
              >
                <source
                  src="/Videos/motion_works slideshow final.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <CardLabel
                title="Motion."
                className={styles.motionLabel}
                eyebrow={
                  <>
                    Motion Posters
                    <br />
                    Lyric Videos
                    <br />
                    Animations
                    <br />
                    Ads
                  </>
                }
                detail="Official Motion Space."
              />
            </Link>
          </div>

          <div className={styles.rightGrid}>
            <Link
              href="/services/branding"
              className={`${styles.card} ${styles.rightTop}`}
              aria-label="View Branding service"
            >
              <FeaturedImage
                {...imageThree}
                alt="Yellowtooths featured branding project"
              />
              <CardLabel
                title={
                  <>
                    Br
                    <br />
                    an
                    <br />
                    di
                    <br />
                    ng.
                  </>
                }
                className={styles.brandingLabel}
                detail={
                  <>
                    Leading
                    <br />
                    Branding
                    <br />
                    Portfolio
                  </>
                }
              />
            </Link>

            <Link
              href="/services/thinkery"
              className={`${styles.card} ${styles.rightBottom}`}
              aria-label="View Thinkery service"
            >
              <video
                className={styles.localVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Yellowtooths Thinkery project"
              >
                <source src="/Videos/thinkery-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <CardLabel
                title="Thinkery."
                className={styles.thinkeryLabel}
                eyebrow={
                  <>
                    Shoots
                    <br />
                    Ads
                    <br />
                    Promos
                  </>
                }
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedBentoGrid;

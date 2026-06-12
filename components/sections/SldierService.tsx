"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllFilmPosterDesigns } from "@/api/axios";
import Container from "@/components/common/Container";
import styles from "./SliderService.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    category: "Cinema",
    title: "Film Poster",
    href: "/services/film-poster",
    image: "/Images/fasion opticals.jpg.jpeg",
    mediaType: "image",
  },
  {
    category: "Campaigns",
    title: "Film Promotion",
    href: "/services/film-promotion",
    image: "/Videos/motion_works slideshow final.mp4",
    mediaType: "video",
  },
  {
    category: "Identity",
    title: "Branding",
    href: "/services/branding",
    image: "/Images/fasion opticals.jpg.jpeg",
    mediaType: "image",
  },
  {
    category: "Growth",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    image: "/Images/viscara.jpg.jpeg",
    mediaType: "image",
  },
  {
    category: "Digital",
    title: "Web Technology",
    href: "/services/technology-experience-design",
    image: "/Images/tech-mockup.jpg",
    mediaType: "image",
  },
  {
    category: "Ideas",
    title: "Thinkery",
    href: "/services/thinkery",
    image: "/Videos/thinkery-video.mp4",
    mediaType: "video",
  },
  {
    category: "Education",
    title: "GAA",
    href: "/services/global-academy-of-artistry",
    image: "/Videos/gaa-video.mp4",
    mediaType: "video",
  },
] as const;

const SliderService = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filmPosterImage, setFilmPosterImage] = useState<string>(
    services[0].image,
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackInnerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    let isActive = true;

    getAllFilmPosterDesigns()
      .then((posters) => {
        if (!isActive) return;

        const poster = posters
          .filter((item) => item.main_image || item.images[0]?.file_path)
          .sort(
            (first, second) =>
              (second.position_number ?? second.id) -
              (first.position_number ?? first.id),
          )[0];
        const image = poster?.main_image || poster?.images[0]?.file_path;

        if (image) setFilmPosterImage(image);
      })
      .catch(() => {
        // Keep the same local fallback used by the featured work imagery.
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const trackInner = trackInnerRef.current;
    if (!section || !pin || !track || !trackInner) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = cardRefs.current.filter(Boolean);
    let reveal: gsap.core.Tween | undefined;

    const context = gsap.context(() => {
      reveal = gsap.fromTo(
        cards,
        { autoAlpha: 0, y: reduceMotion ? 0 : 64, rotate: reduceMotion ? 0 : 2 },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          duration: reduceMotion ? 0.01 : 1.1,
          stagger: reduceMotion ? 0 : 0.08,
          ease: "power3.out",
          paused: true,
          id: "service-cards-reveal",
          onComplete: () => {
            gsap.set(cards, { clearProps: "transform,opacity,visibility" });
          },
        },
      );

      if (!reduceMotion) {
        const getMaxScroll = () =>
          Math.max(0, trackInner.scrollWidth - track.clientWidth);

        const horizontalTween = gsap.to(trackInner, {
          x: () => -getMaxScroll(),
          ease: "none",
          overwrite: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(getMaxScroll(), window.innerHeight * 0.75)}`,
            pin,
            pinSpacing: true,
            scrub: 0.15,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        scrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;
      }
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal?.play();
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(refreshFrame);
      scrollTriggerRef.current?.kill(true);
      scrollTriggerRef.current = null;
      context.revert();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const scrollTrigger = scrollTriggerRef.current;
    if (
      !track ||
      !scrollTrigger ||
      !["ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      return;
    }

    event.preventDefault();
    const trackInner = trackInnerRef.current;
    if (!trackInner) return;

    const maxScroll = trackInner.scrollWidth - track.clientWidth;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const currentScroll =
      maxScroll > 0 ? scrollTrigger.progress * maxScroll : 0;
    const nextScroll = Math.min(
      maxScroll,
      Math.max(0, currentScroll + direction * track.clientWidth * 0.62),
    );
    const nextProgress = maxScroll > 0 ? nextScroll / maxScroll : 0;
    const nextPagePosition =
      scrollTrigger.start +
      (scrollTrigger.end - scrollTrigger.start) * nextProgress;

    window.scrollTo({
      top: nextPagePosition,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden border-b border-white/15 bg-[#050505] text-white"
      aria-labelledby="service-showcase-title"
    >
      <div
        ref={pinRef}
        className="flex min-h-[100svh] flex-col justify-center overflow-x-hidden bg-[#050505] py-14 sm:py-20"
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2
              id="service-showcase-title"
              className="font-heading max-w-2xl text-2xl capitalize leading-none tracking-[-0.05em] sm:text-4xl"
            >
              Our Services
            </h2>

            <Link
              href="/#hero-services"
              className="font-description group flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-white"
            >
              Explore services
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
        </Container>

        <div
          ref={trackRef}
          className={styles.track}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Service showcase"
        >
          <div ref={trackInnerRef} className={styles.trackInner}>
            <div className={styles.leadingSpace} aria-hidden="true" />

            {services.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={service.href}
                  ref={(card) => {
                    cardRefs.current[index] = card;
                  }}
                  className={`${styles.card} ${
                    isActive ? styles.activeCard : ""
                  }`}
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerLeave={() => setActiveIndex(null)}
                  onFocusCapture={() => setActiveIndex(index)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setActiveIndex(null);
                    }
                }}
              >
                <div className={styles.imageWrap}>
                  {service.mediaType === "video" ? (
                    <video
                      className={styles.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={`${service.title} service`}
                    >
                      <source src={service.image} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={index === 0 ? filmPosterImage : service.image}
                      alt={`${service.title} service`}
                      fill
                      unoptimized={index === 0}
                      sizes="(max-width: 639px) 82vw, (max-width: 1023px) 52vw, 38vw"
                      className={styles.image}
                    />
                  )}
                  </div>
                  <div className={styles.scrim} aria-hidden="true" />

                  <div className={styles.content}>
                    <div className={styles.topline}>
                      <span>{service.category}</span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <div className={styles.copy}>
                      <h3>{service.title}</h3>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className={styles.trailingSpace} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderService;

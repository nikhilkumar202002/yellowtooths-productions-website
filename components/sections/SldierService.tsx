"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/common/Container";
import styles from "./SliderService.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    category: "Cinema",
    title: "Film Poster",
    description:
      "Distinctive key art and campaign systems that give every story an unforgettable visual identity.",
    href: "/services/film-poster",
    image: "/Images/fasion opticals.jpg.jpeg",
    accent: "#fec52d",
  },
  {
    category: "Campaigns",
    title: "Film Promotion",
    description:
      "Integrated launch campaigns built to turn attention into anticipation across every audience touchpoint.",
    href: "/services/film-promotion",
    image: "/Images/meduselle.jpg.jpeg",
    accent: "#f18c68",
  },
  {
    category: "Identity",
    title: "Branding",
    description:
      "Strategic identities, visual languages, and brand worlds designed for clarity, character, and longevity.",
    href: "/services/branding",
    image: "/Images/mendiary.jpg.jpeg",
    accent: "#d8a7ff",
  },
  {
    category: "Growth",
    title: "Digital Marketing",
    description:
      "Creative performance systems that connect brand storytelling with measurable digital growth.",
    href: "/services/digital-marketing",
    image: "/Images/viscara.jpg.jpeg",
    accent: "#8fd9c4",
  },
  {
    category: "Digital",
    title: "Web Technology",
    description:
      "Expressive websites and digital products where thoughtful interaction meets reliable engineering.",
    href: "/services/technology-experience-design",
    image: "/Images/tech-mockup.jpg",
    accent: "#80aaff",
  },
  {
    category: "Ideas",
    title: "Thinkery",
    description:
      "A creative lab for original concepts, experimental formats, and ideas that deserve room to evolve.",
    href: "/services/thinkery",
    image: "/Images/hero-overlay-texture.avif",
    accent: "#ff9ab4",
  },
  {
    category: "Education",
    title: "GAA",
    description:
      "Learning experiences and artistic programs that help emerging talent develop craft and confidence.",
    href: "/services/global-academy-of-artistry",
    image: "/Images/fasion opticals.jpg.jpeg",
    accent: "#b7e875",
  },
];

const SliderService = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

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
          Math.max(0, track.scrollWidth - track.clientWidth);
        const syncTrack = (scrollTrigger: ScrollTrigger) => {
          track.scrollLeft = getMaxScroll() * scrollTrigger.progress;
        };

        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.max(getMaxScroll(), window.innerHeight * 0.75)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: syncTrack,
          onRefresh: syncTrack,
        });
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

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(section);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
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
    const maxScroll = track.scrollWidth - track.clientWidth;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextScroll = Math.min(
      maxScroll,
      Math.max(0, track.scrollLeft + direction * track.clientWidth * 0.62),
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
      className="flex min-h-[100svh] flex-col justify-center overflow-x-hidden border-b border-white/15 bg-[#050505] py-14 text-white sm:py-20"
      aria-labelledby="service-showcase-title"
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
        <div className={styles.leadingSpace} aria-hidden="true" />

        {services.map((service, index) => {
          const isActive = activeIndex === index;
          const isDimmed = activeIndex !== null && !isActive;

          return (
            <article
              key={service.href}
              ref={(card) => {
                cardRefs.current[index] = card;
              }}
              className={`${styles.card} ${
                isActive ? styles.activeCard : ""
              } ${isDimmed ? styles.dimmedCard : ""}`}
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
                <Image
                  src={service.image}
                  alt={`${service.title} service`}
                  fill
                  sizes="(max-width: 639px) 82vw, (max-width: 1023px) 52vw, 38vw"
                  className={styles.image}
                />
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
    </section>
  );
};

export default SliderService;

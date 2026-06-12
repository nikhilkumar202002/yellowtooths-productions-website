"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import Container from "@/components/common/Container";
import styles from "./HeroBanner.module.css";

const services = [
  {
    label: "Film Poster",
    href: "/services/film-poster",
    position: "top-[4%] left-0 sm:left-[12%]",
  },
  {
    label: "Film Promotion",
    href: "/services/film-promotion",
    position: "top-[4%] right-0 sm:right-[12%]",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    position: "top-[39%] left-0",
  },
  {
    label: "Branding",
    href: "/services/branding",
    position: "top-[39%] right-0",
  },
  {
    label: "Thinkery",
    href: "/services/thinkery",
    position: "bottom-[30%] left-0 sm:bottom-[4%] sm:left-[43%]",
  },
  {
    label: "Web Technology",
    href: "/services/technology-experience-design",
    position: "bottom-[4%] left-0 sm:left-[8%]",
  },
  {
    label: "GAA",
    href: "/services/global-academy-of-artistry",
    position: "right-0 bottom-[4%] sm:right-[8%]",
  },
];

type Position = {
  x: number;
  y: number;
};

type DragState = {
  href: string;
  pointerId: number;
  startX: number;
  startY: number;
  initialPosition: Position;
  itemBounds: DOMRect;
  hasMoved: boolean;
};

type MotionState = Position & {
  velocityX: number;
  velocityY: number;
  resetting: boolean;
};

const motionSeeds = [
  { velocityX: 14, velocityY: 10 },
  { velocityX: -17, velocityY: 12 },
  { velocityX: 16, velocityY: -13 },
  { velocityX: -13, velocityY: 16 },
  { velocityX: 18, velocityY: -11 },
  { velocityX: 12, velocityY: -17 },
  { velocityX: -16, velocityY: -14 },
];

const FLOAT_RESUME_DELAY = 20_000;

const HeroBanner = () => {
  const [draggedService, setDraggedService] = useState<string | null>(null);
  const servicesRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const motionStates = useRef<Map<string, MotionState>>(new Map());
  const dragState = useRef<DragState | null>(null);
  const suppressClick = useRef<string | null>(null);
  const floatingPaused = useRef(false);
  const resumeTimer = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    services.forEach((service, index) => {
      const seed = motionSeeds[index];
      motionStates.current.set(service.href, {
        x: 0,
        y: 0,
        velocityX: reduceMotion ? 0 : seed.velocityX,
        velocityY: reduceMotion ? 0 : seed.velocityY,
        resetting: false,
      });
    });

    const restartFloating = () => {
      motionStates.current.forEach((motion, href) => {
        const index = services.findIndex((service) => service.href === href);
        const seed = motionSeeds[index];
        motion.velocityX = reduceMotion ? 0 : seed.velocityX;
        motion.velocityY = reduceMotion ? 0 : seed.velocityY;
      });
    };

    window.addEventListener(
      "yellowtooths:preloader-complete",
      restartFloating,
    );

    let animationFrame = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const container = servicesRef.current;
      const deltaTime = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      if (container) {
        const containerBounds = container.getBoundingClientRect();
        const isDragging = dragState.current?.hasMoved === true;

        motionStates.current.forEach((motion, href) => {
          const item = itemRefs.current.get(href);
          if (!item || isDragging) return;
          if (floatingPaused.current && !motion.resetting) return;

          if (motion.resetting) {
            const returnSpeed = Math.min(1, deltaTime * 4.5);
            motion.x += (0 - motion.x) * returnSpeed;
            motion.y += (0 - motion.y) * returnSpeed;

            if (Math.hypot(motion.x, motion.y) < 0.5) {
              motion.x = 0;
              motion.y = 0;
              motion.resetting = false;
            }
          } else {
            const previousX = motion.x;
            const previousY = motion.y;
            motion.x += motion.velocityX * deltaTime;
            motion.y += motion.velocityY * deltaTime;

            const itemBounds = item.getBoundingClientRect();
            const baseLeft = itemBounds.left - previousX;
            const baseTop = itemBounds.top - previousY;
            const minX = containerBounds.left - baseLeft;
            const maxX = containerBounds.right - baseLeft - itemBounds.width;
            const minY = containerBounds.top - baseTop;
            const maxY = containerBounds.bottom - baseTop - itemBounds.height;

            if (motion.x <= minX || motion.x >= maxX) {
              motion.x = Math.min(maxX, Math.max(minX, motion.x));
              motion.velocityX *= -1;
            }

            if (motion.y <= minY || motion.y >= maxY) {
              motion.y = Math.min(maxY, Math.max(minY, motion.y));
              motion.velocityY *= -1;
            }

          }

          item.style.transform = `translate3d(${motion.x}px, ${motion.y}px, 0)`;
        });
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (resumeTimer.current) {
        window.clearTimeout(resumeTimer.current);
      }
      window.removeEventListener(
        "yellowtooths:preloader-complete",
        restartFloating,
      );
    };
  }, []);

  const handlePointerDown = (
    event: PointerEvent<HTMLLIElement>,
    href: string,
  ) => {
    const container = servicesRef.current;
    if (!container) return;

    const itemBounds = event.currentTarget.getBoundingClientRect();
    const motion = motionStates.current.get(href);
    const initialPosition = motion
      ? { x: motion.x, y: motion.y }
      : { x: 0, y: 0 };

    dragState.current = {
      href,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialPosition,
      itemBounds,
      hasMoved: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    const drag = dragState.current;
    const container = servicesRef.current;
    if (!drag || !container || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.hasMoved && Math.hypot(deltaX, deltaY) > 4) {
      drag.hasMoved = true;
      floatingPaused.current = true;
      if (resumeTimer.current) {
        window.clearTimeout(resumeTimer.current);
        resumeTimer.current = null;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      setDraggedService(drag.href);
    }

    if (!drag.hasMoved) return;

    const containerBounds = container.getBoundingClientRect();
    const boundedDeltaX = Math.min(
      containerBounds.right - drag.itemBounds.right,
      Math.max(containerBounds.left - drag.itemBounds.left, deltaX),
    );
    const boundedDeltaY = Math.min(
      containerBounds.bottom - drag.itemBounds.bottom,
      Math.max(containerBounds.top - drag.itemBounds.top, deltaY),
    );
    const nextPosition = {
      x: drag.initialPosition.x + boundedDeltaX,
      y: drag.initialPosition.y + boundedDeltaY,
    };
    const motion = motionStates.current.get(drag.href);
    if (motion) {
      motion.x = nextPosition.x;
      motion.y = nextPosition.y;
      motion.resetting = false;
    }

    event.currentTarget.style.transform = `translate3d(${nextPosition.x}px, ${nextPosition.y}px, 0)`;
  };

  const finishDrag = (event: PointerEvent<HTMLLIElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.hasMoved) {
      suppressClick.current = drag.href;
      window.setTimeout(() => {
        if (suppressClick.current === drag.href) suppressClick.current = null;
      }, 0);

      resumeTimer.current = window.setTimeout(() => {
        floatingPaused.current = false;
        resumeTimer.current = null;
      }, FLOAT_RESUME_DELAY);
    }

    dragState.current = null;
    setDraggedService(null);
  };

  return (
    <section
      id="home-hero"
      className="relative overflow-hidden border-b border-white/15 bg-black"
    >
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/Videos/hero-banner-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/94" aria-hidden="true" />
      <div className={styles.grainOverlay} aria-hidden="true" />

      <Container className="relative z-10">
        <div className="h-[760px]">
          <div className="relative h-full min-w-0 py-10">
            <nav
              id="hero-services"
              aria-label="Services"
              className="absolute inset-0 z-10"
              onClick={(event) => {
                if (!(event.target as HTMLElement).closest("li")) {
                  motionStates.current.forEach((motion) => {
                    motion.resetting = true;
                  });
                }
              }}
            >
              <ul ref={servicesRef} className="relative h-full">
                {services.map((service) => (
                  <li
                    key={service.href}
                    ref={(item) => {
                      if (item) {
                        itemRefs.current.set(service.href, item);
                      } else {
                        itemRefs.current.delete(service.href);
                      }
                    }}
                    className={`absolute touch-none select-none ${styles.serviceItem} ${
                      draggedService === service.href
                        ? `z-20 cursor-grabbing ${styles.serviceDragging}`
                        : "cursor-grab"
                    } ${service.position}`}
                    onPointerDown={(event) =>
                      handlePointerDown(event, service.href)
                    }
                    onPointerMove={handlePointerMove}
                    onPointerUp={finishDrag}
                    onPointerCancel={finishDrag}
                  >
                    <div>
                      <Link
                        href={service.href}
                        draggable={false}
                        onClick={(event) => {
                          if (suppressClick.current === service.href) {
                            event.preventDefault();
                            suppressClick.current = null;
                          }
                        }}
                        className="font-heading inline-block whitespace-nowrap text-[clamp(1.05rem,4.3vw,1.6rem)] capitalize text-white transition-colors hover:text-[#fec52d] focus-visible:text-[#fec52d] focus-visible:outline-none"
                      >
                        {service.label}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroBanner;

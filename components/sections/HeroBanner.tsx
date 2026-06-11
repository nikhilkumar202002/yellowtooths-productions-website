"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import Container from "@/components/common/Container";
import InteractiveToothLogo from "@/components/common/InteractiveToothLogo";

const services = [
  {
    label: "Film Poster",
    href: "/services/film-poster",
    position: "lg:top-[8%] lg:left-0",
  },
  {
    label: "Film Promotion",
    href: "/services/film-promotion",
    position: "lg:top-[27%] lg:left-[22%]",
  },
  {
    label: "Branding",
    href: "/services/branding",
    position: "lg:top-[39%] lg:right-0",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    position: "lg:top-[50%] lg:left-[3%]",
  },
  {
    label: "Thinkery",
    href: "/services/thinkery",
    position: "lg:top-[70%] lg:left-[22%]",
  },
  {
    label: "GAA",
    href: "/services/global-academy-of-artistry",
    position: "lg:right-0 lg:bottom-[2%]",
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
  containerBounds: DOMRect;
  hasMoved: boolean;
};

const HeroBanner = () => {
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [draggedService, setDraggedService] = useState<string | null>(null);
  const dragState = useRef<DragState | null>(null);
  const suppressClick = useRef<string | null>(null);

  const handlePointerDown = (
    event: PointerEvent<HTMLLIElement>,
    href: string,
  ) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const container = event.currentTarget.parentElement;
    if (!container) return;

    const initialPosition = positions[href] ?? { x: 0, y: 0 };

    dragState.current = {
      href,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialPosition,
      itemBounds: event.currentTarget.getBoundingClientRect(),
      containerBounds: container.getBoundingClientRect(),
      hasMoved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setDraggedService(href);
  };

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (Math.hypot(deltaX, deltaY) > 4) {
      drag.hasMoved = true;
    }

    const boundedX = Math.min(
      drag.containerBounds.right - drag.itemBounds.right,
      Math.max(drag.containerBounds.left - drag.itemBounds.left, deltaX),
    );
    const boundedY = Math.min(
      drag.containerBounds.bottom - drag.itemBounds.bottom,
      Math.max(drag.containerBounds.top - drag.itemBounds.top, deltaY),
    );

    setPositions((current) => ({
      ...current,
      [drag.href]: {
        x: drag.initialPosition.x + boundedX,
        y: drag.initialPosition.y + boundedY,
      },
    }));
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
    }

    dragState.current = null;
    setDraggedService(null);
  };

  return (
    <section id="home-hero" className="border-b border-white/15 bg-black">
      <Container>
        <div className="grid min-h-[720px] lg:h-[720px] lg:grid-cols-2">
          <div className="relative flex flex-col justify-between py-12 pr-0 sm:py-16 lg:py-10 lg:pr-14">
            <Image
              src="/logo_full_size.svg"
              alt="Yellowtooths Productions"
              width={196}
              height={31}
              priority
              className="relative z-10 mb-5 h-auto w-32 sm:w-36"
            />

            <nav
              id="hero-services"
              aria-label="Services"
              className="mt-12 lg:absolute lg:top-28 lg:right-14 lg:bottom-10 lg:left-0 lg:mt-0"
            >
              <ul className="space-y-3 lg:relative lg:h-full lg:space-y-0">
                {services.map((service) => (
                  <li
                    key={service.href}
                    className={`lg:absolute lg:cursor-grab lg:select-none lg:touch-none ${
                      draggedService === service.href ? "lg:cursor-grabbing" : ""
                    } ${service.position}`}
                    style={{
                      transform: `translate3d(${positions[service.href]?.x ?? 0}px, ${
                        positions[service.href]?.y ?? 0
                      }px, 0)`,
                    }}
                    onPointerDown={(event) =>
                      handlePointerDown(event, service.href)
                    }
                    onPointerMove={handlePointerMove}
                    onPointerUp={finishDrag}
                    onPointerCancel={finishDrag}
                  >
                    <Link
                      href={service.href}
                      draggable={false}
                      onClick={(event) => {
                        if (suppressClick.current === service.href) {
                          event.preventDefault();
                          suppressClick.current = null;
                        }
                      }}
                      className={`font-heading inline-block whitespace-nowrap text-[clamp(1.25rem,1.65vw,1.6rem)] capitalize transition-colors hover:text-[#fec52d] focus-visible:text-[#fec52d] focus-visible:outline-none ${
                        draggedService === service.href
                          ? "text-[#fec52d]"
                          : "text-white"
                      }`}
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className="font-description pointer-events-none absolute right-0 bottom-0 hidden items-center gap-2 text-[0.65rem] uppercase tracking-[0.12em] text-white/35 lg:flex"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-3.5"
                >
                  <path
                    d="M12 3v18M3 12h18m-6-6-3-3-3 3m6 12-3 3-3-3M6 9l-3 3 3 3m12-6 3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                </svg>
                Drag to explore
              </div>
            </nav>

            <div className="absolute bottom-10 left-0">
              <InteractiveToothLogo targetId="hero-services" />
            </div>
          </div>

          <div className="min-h-[420px] border-t border-white/15 py-8 sm:min-h-[560px] lg:border-t-0 lg:border-l lg:py-10 lg:pl-12">
            <div className="relative h-full min-h-[420px] overflow-hidden bg-black sm:min-h-[560px]">
              <video
                className="absolute inset-0 size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Yellowtooths Productions showreel"
              >
                <source src="/Videos/hero-banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroBanner;

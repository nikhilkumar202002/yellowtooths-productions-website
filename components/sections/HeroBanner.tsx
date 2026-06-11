"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import Container from "@/components/common/Container";

const services = [
  {
    label: "Film Poster",
    href: "/services/film-poster",
    position: "top-[10%] left-0",
  },
  {
    label: "Film Promotion",
    href: "/services/film-promotion",
    position: "top-[30%] left-[40%]",
  },
  {
    label: "Digital Marketing",
    href: "/services/digital-marketing",
    position: "top-[52%] left-0",
  },
  {
    label: "Branding",
    href: "/services/branding",
    position: "top-[52%] right-0",
  },
  {
    label: "Thinkery",
    href: "/services/thinkery",
    position: "top-[72%] left-[41%]",
  },
  {
    label: "Web Technology",
    href: "/services/technology-experience-design",
    position: "bottom-0 left-0",
  },
  {
    label: "GAA",
    href: "/services/global-academy-of-artistry",
    position: "right-0 bottom-0",
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

  };

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.hasMoved && Math.hypot(deltaX, deltaY) > 4) {
      drag.hasMoved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setDraggedService(drag.href);
    }

    if (!drag.hasMoved) return;

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
          <div className="relative h-[720px] min-w-0 py-10 pr-0 lg:pr-14">
            <Image
              src="/logo_full_size.svg"
              alt="Yellowtooths Productions"
              width={196}
              height={31}
              priority
              className="relative z-10 h-auto w-32 sm:w-36"
            />

            <nav
              id="hero-services"
              aria-label="Services"
              className="absolute top-1/2 right-0 left-0 h-[520px] -translate-y-1/2 lg:right-14"
              onPointerDown={(event) => {
                if (!(event.target as HTMLElement).closest("li")) {
                  setPositions({});
                }
              }}
            >
              <ul className="relative h-full">
                {services.map((service) => (
                  <li
                    key={service.href}
                    className={`absolute cursor-grab touch-none select-none ${
                        draggedService === service.href
                          ? "z-10 cursor-grabbing scale-110 drop-shadow-[0_0_14px_rgba(254,197,45,0.45)]"
                          : "transition-transform duration-500 ease-out"
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
                      className={`font-heading inline-block whitespace-nowrap text-[clamp(1.05rem,4.3vw,1.6rem)] capitalize transition-colors hover:text-[#fec52d] focus-visible:text-[#fec52d] focus-visible:outline-none ${
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
                className="font-description pointer-events-none absolute right-0 -bottom-7 flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.12em] text-[#fec52d] sm:text-[0.65rem]"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-3.5 animate-pulse"
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

"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const Preloader = () => {
  const pathname = usePathname();
  const [hasFinished, setHasFinished] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const isVisible = pathname === "/" && !hasFinished;

  useLayoutEffect(() => {
    if (!isVisible) return;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const pupils = pupilsRef.current;
    if (!overlay || !logo || !pupils) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(logo, { autoAlpha: 0, scale: 0.92 });

      const timeline = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = previousOverflow;
          window.dispatchEvent(new Event("yellowtooths:preloader-complete"));
          setHasFinished(true);
        },
      });

      timeline.to(logo, {
        autoAlpha: 1,
        scale: 1,
        duration: reduceMotion ? 0.01 : 0.65,
        ease: "power3.out",
      });

      if (!reduceMotion) {
        timeline
          .to(pupils, {
            x: -20,
            duration: 0.65,
            ease: "power2.inOut",
          })
          .to(pupils, {
            x: 20,
            duration: 0.9,
            ease: "power2.inOut",
          })
          .to(pupils, {
            x: -12,
            duration: 0.7,
            ease: "power2.inOut",
          })
          .to(pupils, {
            x: 0,
            duration: 0.6,
            ease: "power2.inOut",
          });
      }

      timeline
        .to(logo, {
          autoAlpha: 0,
          scale: 1.04,
          duration: reduceMotion ? 0.01 : 0.4,
          ease: "power2.in",
        })
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: reduceMotion ? 0.01 : 0.55,
            ease: "power2.inOut",
          },
          reduceMotion ? ">" : "-=0.1",
        );
    }, overlay);

    return () => {
      context.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      role="status"
      aria-label="Loading Yellowtooths Productions"
    >
      <svg
        ref={logoRef}
        viewBox="0 0 713.55 352.04"
        className="h-auto w-[min(48vw,260px)] scale-[0.92] opacity-0"
        aria-hidden="true"
      >
        <g fill="#fec52d">
          <polygon points="305.88 352.04 355.99 265.28 406.06 352.04 305.88 352.04" />
          <path d="M245.02 75.87c-30.44 0-55.37 10.81-74.08 32.19-18.58 21.24-28 49.39-28 83.69s9.03 63.94 26.84 84.94c17.96 21.2 43.27 31.94 75.23 31.94s56.36-10.64 74.6-31.63c18.1-20.8 27.27-49.47 27.27-85.26s-8.97-64.48-26.67-84.89c-17.83-20.56-43.13-30.99-75.2-30.99m39.3 173.61c-9.57 13.69-22.42 20.36-39.29 20.36-36.43 0-54.14-25.55-54.14-78.08 0-24.25 5.03-43.45 15.02-57.08 9.82-13.45 22.62-20.01 39.12-20.01 36.29 0 53.94 25.2 53.94 77.09 0 24.39-4.91 43.86-14.65 57.72" />
          <path d="M136.05 261.65c-10.01 4.76-19.8 7.17-29.06 7.17-12.44 0-21.47-3.43-26.86-10.18-5.6-7.01-8.42-19.34-8.42-36.66V117.72h76.83c3.62-6.55 7.79-12.69 12.69-18.29 10.34-11.82 22.77-20.09 36.81-25.4l.1-.1H71.07L71.78 0H25.73l-.57 73.93H0l.64 43.78h25.18v119.67c0 20.35 6.28 37.46 18.72 50.9 12.52 13.5 28.06 20.35 46.22 20.35 19.28 0 37.26-2.08 53.45-6.21l3.27-.83-7.05-42.03z" />
          <path d="M577.5 261.65c10.01 4.76 19.79 7.17 29.06 7.17 12.44 0 21.47-3.43 26.86-10.18 5.6-7.01 8.43-19.34 8.43-36.66V117.72h-76.84c-3.61-6.55-7.78-12.69-12.68-18.29-10.34-11.82-22.77-20.09-36.81-25.4l-.1-.1h127.06L641.78 0h46.04l.56 73.93h25.17l-.64 43.78h-25.18v119.67c0 20.35-6.29 37.46-18.73 50.9-12.51 13.5-28.05 20.35-46.22 20.35-19.27 0-37.26-2.08-53.44-6.21l-3.27-.83 7.05-42.03z" />
          <path d="M468.15 75.87c-30.4 0-55.29 10.82-73.98 32.2-18.54 21.24-27.96 49.39-27.96 83.69s9.02 63.94 26.82 84.95c17.93 21.2 43.2 31.95 75.12 31.95s56.29-10.64 74.49-31.63c18.08-20.8 27.21-49.47 27.21-85.26s-8.93-64.48-26.61-84.9c-17.81-20.56-43.08-30.99-75.1-30.99m39.24 173.62c-9.55 13.7-22.39 20.36-39.23 20.36-36.37 0-54.06-25.55-54.06-78.09 0-24.25 5.03-43.46 14.98-57.08 9.83-13.45 22.61-20.01 39.08-20.01 36.24 0 53.86 25.2 53.86 77.1 0 24.4-4.92 43.86-14.63 57.73" />
        </g>

        <g ref={pupilsRef} fill="#fec52d">
          <circle cx="244.92" cy="141.77" r="29" />
          <circle cx="467.88" cy="141.77" r="29" />
        </g>
      </svg>

      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Preloader;

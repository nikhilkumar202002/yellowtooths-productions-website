"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type InteractiveToothLogoProps = {
  targetId: string;
};

export default function InteractiveToothLogo({
  targetId,
}: InteractiveToothLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const logo = logoRef.current;
    const target = document.getElementById(targetId);
    if (!logo || !target) return;

    let rafId: number;

    const MAX_MOVEMENT = 10;

    const updateEye = (
      eye: SVGCircleElement | null,
      eyeCenterX: number,
      eyeCenterY: number,
      mouseX: number,
      mouseY: number,
      bounds: DOMRect
    ) => {
      if (!eye) return;

      const scaleX = bounds.width / 713.55;
      const scaleY = bounds.height / 352.03;

      const centerX = bounds.left + eyeCenterX * scaleX;
      const centerY = bounds.top + eyeCenterY * scaleY;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;

      const angle = Math.atan2(dy, dx);

      const distance = Math.min(
        Math.hypot(dx, dy) / 25,
        MAX_MOVEMENT
      );

      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      eye.setAttribute(
        "transform",
        `translate(${tx} ${ty})`
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const bounds = logo.getBoundingClientRect();

        updateEye(
          leftPupilRef.current,
          244.92,
          145.76,
          event.clientX,
          event.clientY,
          bounds
        );

        updateEye(
          rightPupilRef.current,
          467.88,
          145.76,
          event.clientX,
          event.clientY,
          bounds
        );
      });
    };

    const resetPupils = () => {
      leftPupilRef.current?.removeAttribute("transform");
      rightPupilRef.current?.removeAttribute("transform");
    };

    const showLogo = () => setIsVisible(true);
    const hideLogo = () => {
      setIsVisible(false);
      resetPupils();
    };

    target.addEventListener("pointerenter", showLogo);
    target.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    target.addEventListener("pointerleave", hideLogo);

    return () => {
      cancelAnimationFrame(rafId);
      target.removeEventListener("pointerenter", showLogo);
      target.removeEventListener("pointermove", handlePointerMove);
      target.removeEventListener("pointerleave", hideLogo);
    };
  }, [targetId]);

  return (
    <div
      ref={logoRef}
      className={`relative aspect-[713.55/352.03] w-24 transition-opacity duration-200 sm:w-32 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <Image
        src="/cursor_toot_Logo.svg"
        alt="Tooth Logo"
        fill
        sizes="(max-width: 639px) 96px, 128px"
        className="object-contain"
        priority
      />

      <svg
        viewBox="0 0 713.55 352.03"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {/* Left Eye */}
        <circle
          ref={leftPupilRef}
          cx="244.92"
          cy="145.76"
          r="33.08"
          fill="#fbb509"
        />

        {/* Right Eye */}
        <circle
          ref={rightPupilRef}
          cx="467.88"
          cy="145.76"
          r="33.08"
          fill="#fbb509"
        />
      </svg>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { getAllClients, type Client } from "@/api/axios";
import styles from "./ClientLogoSlider.module.css";

const ClientLogoSlider = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLUListElement | null>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [duration, setDuration] = useState(90);

  useEffect(() => {
    let isActive = true;

    getAllClients()
      .then((data) => {
        if (!isActive) return;

        setClients(
          data.filter(
            (client) => client.status === 1 && Boolean(client.logo_path),
          ),
        );
      })
      .catch(() => {
        // Leave the section hidden when client logos cannot be loaded.
      });

    return () => {
      isActive = false;
    };
  }, []);

  const measure = useCallback(() => {
    if (!groupRef.current || !trackRef.current) return;
    const groupWidth = groupRef.current.offsetWidth;
    if (!groupWidth) return;

    // Set scroll distance to the width of one group (px)
    setScrollWidth(groupWidth);

    // Duration proportional to width (px) to keep speed consistent
    const pxPerSecond = 80; // tweak for speed
    const newDuration = Math.max(10, Math.round(groupWidth / pxPerSecond));
    setDuration(newDuration);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [clients, measure]);

  if (clients.length === 0) return null;

  const renderLogos = (hidden = false) => (
    <ul
      ref={hidden ? null : groupRef}
      className={styles.logoGroup}
      aria-hidden={hidden || undefined}
    >
      {clients.map((client) => (
        <li
          className={styles.logoItem}
          key={`${hidden ? "copy" : "logo"}-${client.id}`}
        >
          <Image
            src={client.logo_path}
            alt={hidden ? "" : client.name}
            width={180}
            height={90}
            sizes="(max-width: 639px) 120px, 160px"
            className={styles.logo}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-12 min-w-0 lg:mt-auto lg:pt-12">
      <div className={styles.slider}>
            <div
              ref={trackRef}
              className={styles.track}
              style={
                scrollWidth
                  ? {
                      // CSS variables for animation distance and duration
                      ["--scroll-width" as any]: `${scrollWidth}px`,
                      ["--duration" as any]: `${duration}s`,
                    }
                  : undefined
              }
            >
              {renderLogos()}
              {renderLogos(true)}
            </div>
      </div>
    </div>
  );
};

export default ClientLogoSlider;

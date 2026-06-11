"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllClients, type Client } from "@/api/axios";
import styles from "./ClientLogoSlider.module.css";

const ClientLogoSlider = () => {
  const [clients, setClients] = useState<Client[]>([]);

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

  if (clients.length === 0) return null;

  const renderLogos = (hidden = false) => (
    <ul className={styles.logoGroup} aria-hidden={hidden || undefined}>
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
        <div className={styles.track}>
          {renderLogos()}
          {renderLogos(true)}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoSlider;

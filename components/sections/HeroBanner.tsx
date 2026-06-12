import Image from "next/image";
import Link from "next/link";
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

const HeroBanner = () => {
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
            <Image
              src="/logo-02.png"
              alt=""
              width={4167}
              height={4167}
              priority
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[clamp(9rem,20vw,18rem)] -translate-x-1/2 -translate-y-1/2"
            />

            <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[clamp(9rem,20vw,18rem)] -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/logo-01.png"
                alt=""
                width={4167}
                height={4167}
                priority
                className={`size-full ${styles.logoSpin}`}
              />
            </div>

            <nav
              id="hero-services"
              aria-label="Services"
              className="absolute top-1/2 right-0 left-0 z-10 h-[520px] -translate-y-1/2"
            >
              <ul className="relative h-full">
                {services.map((service) => (
                  <li
                    key={service.href}
                    className={`absolute ${styles.serviceFloat} ${service.position}`}
                  >
                    <Link
                      href={service.href}
                      className="font-heading inline-block whitespace-nowrap text-[clamp(1.05rem,4.3vw,1.6rem)] capitalize text-white transition-colors hover:text-[#fec52d] focus-visible:text-[#fec52d] focus-visible:outline-none"
                    >
                      {service.label}
                    </Link>
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

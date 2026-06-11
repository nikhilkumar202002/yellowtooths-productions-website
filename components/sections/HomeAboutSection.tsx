import Link from "next/link";
import Container from "@/components/common/Container";
import styles from "./HomeAboutSection.module.css";

const tickerItems = ["Ideas", "Images", "Motion", "Experiences"];

const HomeAboutSection = () => {
  return (
    <section className="overflow-hidden border-b border-black/15 bg-[#f2f0e9] text-[#111]">
      <Container>
        <div className="border-x border-black/15">
          <div className="flex items-center justify-between border-b border-black/15 px-5 py-4 sm:px-8">
            <p className="font-description text-[0.65rem] uppercase tracking-[0.16em] text-black/55">
              About Yellowtooths
            </p>
            <p className="font-description text-[0.65rem] uppercase tracking-[0.16em] text-black/55">
              Independent creative studio / Kerala
            </p>
          </div>

          <div className={styles.scene}>
            <div className={styles.stickyContent}>
              <div className={styles.headingPanel}>
                <p className="font-description mb-7 text-xs uppercase tracking-[0.16em] text-black/45">
                  We shape stories
                </p>
                <h2 className={styles.heading}>
                  Forms of human experience, translated into image, motion,
                  and meaningful detail.
                </h2>
              </div>

              <div className={styles.copyPanel}>
                <div>
                  <p className="font-description text-xs uppercase tracking-[0.14em] text-black/45">
                    Make it felt.
                  </p>
                  <p className="font-description mt-5 max-w-xs text-base leading-7 text-black/70">
                    Ideas shaped with purpose for brands, films, and digital
                    experiences that belong in real lives and stay in memory.
                  </p>
                </div>

                <Link
                  href="/about"
                  className="font-description group inline-flex w-fit items-center gap-3 border-b border-black pb-1 text-xs font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-55"
                >
                  Learn more
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
            </div>

            <div className={styles.mediaTrack}>
              <div className={styles.videoCard}>
                <video
                  className={styles.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="A selection of Yellowtooths creative work"
                >
                  <source src="/Videos/hero-banner-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div className={styles.videoLabel} aria-hidden="true">
                  <span>Selected motion</span>
                  <span>01 / 01</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ticker} aria-hidden="true">
            <div className={styles.tickerTrack}>
              {Array.from({ length: 2 }, (_, groupIndex) => (
                <div className={styles.tickerGroup} key={groupIndex}>
                  {tickerItems.map((item) => (
                    <span className={styles.tickerItem} key={`${groupIndex}-${item}`}>
                      {item}
                      <span className={styles.tickerDot}>●</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeAboutSection;

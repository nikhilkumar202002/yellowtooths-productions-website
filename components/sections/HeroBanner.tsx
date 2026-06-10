import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

const services = [
  "Film Poster",
  "Film Promotion",
  "Branding",
  "Digital Marketing",
  "Website Solutions",
  "Video Production",
  "Thinkery",
  "GAA",
];

const HeroBanner = () => {
  return (
    <section id="home-hero" className="border-b border-white/15 bg-black">
      <Container>
        <div className="grid min-h-[720px] lg:h-[720px] lg:grid-cols-2">
          <div className="flex flex-col justify-between py-12 pr-0 sm:py-16 lg:py-10 lg:pr-14">
            <Image
              src="/logo_full_size.svg"
              alt="Yellowtooths Productions"
              width={196}
              height={31}
              priority
              className="mb-5 h-auto w-40"
            />

            <nav aria-label="Services" className="mt-12">
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="font-heading inline-block text-[clamp(1.25rem,2vw,2rem)] capitalize text-white transition-colors hover:text-[#fec52d]"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
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

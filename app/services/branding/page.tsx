import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { brandingProjects } from "@/dataset/Branding";

export const metadata: Metadata = {
  title: "Branding Projects | Yellowtooths Productions",
  description:
    "Explore branding and visual identity projects by Yellowtooths Productions.",
};

const BrandingPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/15 py-12 sm:py-16">
        <Container>
          <p className="font-description mb-4 text-xs uppercase tracking-[0.18em] text-white/45">
            Yellowtooths Productions
          </p>
          <h1 className="font-heading text-[30px] leading-none tracking-[-0.05em]">
            Branding
          </h1>
          <p className="font-description mt-6 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Selected identity systems, visual languages, and brand worlds
            created across culture, commerce, education, and lifestyle.
          </p>
        </Container>
      </header>

      <section className="py-8 sm:py-12">
        <Container>
          <div className="grid grid-cols-4 items-stretch gap-3 sm:gap-4">
            {brandingProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/services/branding/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-[#0d0d0d] sm:rounded-2xl"
                aria-label={`View ${project.heading} branding project`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={project.featuredImage}
                    alt={`${project.heading} featured branding design`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover grayscale transition duration-500 group-hover:scale-[1.015] group-hover:grayscale-0"
                  />
                </div>

                <div className="flex flex-1 items-end justify-between gap-3 p-3 sm:p-5">
                  <div>
                    <p className="font-description text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                      Branding / {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-heading mt-3 text-base leading-none tracking-[-0.04em] sm:text-2xl">
                      {project.heading}
                    </h2>
                    <p className="font-description mt-3 line-clamp-3 text-xs leading-5 text-white/50 sm:text-sm">
                      {project.description}
                    </p>
                  </div>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mb-1 size-5 shrink-0 text-white/45 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
                  >
                    <path
                      d="M5 12h14m-5-5 5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default BrandingPage;

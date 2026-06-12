import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandingCollage from "@/components/branding/BrandingCollage";
import Container from "@/components/common/Container";
import {
  brandingProjects,
  getBrandingProject,
} from "@/dataset/Branding";

type BrandingProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return brandingProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrandingProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getBrandingProject(slug);

  if (!project) {
    return {
      title: "Branding Project | Yellowtooths Productions",
    };
  }

  return {
    title: `${project.heading} Branding | Yellowtooths Productions`,
    description: project.description,
  };
}

const BrandingProjectPage = async ({
  params,
}: BrandingProjectPageProps) => {
  const { slug } = await params;
  const project = getBrandingProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/15 py-8 sm:py-6">
        <Container>
          <Link
            href="/services/branding"
            className="font-description group inline-flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 transition-transform group-hover:-translate-x-1"
            >
              <path
                d="M19 12H5m5 5-5-5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            All branding projects
          </Link>
        </Container>
      </section>

      <header className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
            <div>
              <p className="font-description text-xs uppercase tracking-[0.18em] text-[#fec52d]">
                Branding and visual identity
              </p>
              <h1 className="font-heading mt-5 max-w-5xl text-[clamp(3rem,8vw,8rem)] leading-[0.85] tracking-[-0.065em]">
                {project.heading}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="font-description max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
                {project.description}
              </p>
              <p className="font-description mt-6 text-xs uppercase tracking-[0.14em] text-white/35">
                {project.gallery.length} project images
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section className=" py-10 sm:py-10">
        <Container>
          {/* <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-description text-xs uppercase tracking-[0.18em] text-white/40">
                Project gallery
              </p>
              <h2 className="font-heading mt-3 text-3xl tracking-[-0.04em] sm:text-5xl">
                Identity System
              </h2>
            </div>
            <p className="font-description text-xs text-white/35">
              {project.gallery.length} images
            </p>
          </div> */}

          <BrandingCollage
            images={project.gallery}
            projectName={project.heading}
          />
        </Container>
      </section>
    </main>
  );
};

export default BrandingProjectPage;

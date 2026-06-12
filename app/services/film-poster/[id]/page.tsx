import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  getAllFilmPosterDesigns,
  getFilmPosterDesign,
  type FilmPosterDesign,
} from "@/api/axios";
import Container from "@/components/common/Container";

type FilmPosterDetailPageProps = {
  params: Promise<{ id: string }>;
};

const getPosterImage = (poster: FilmPosterDesign) =>
  poster.main_image || poster.images[0]?.file_path || null;

const getPoster = cache(async (id: string) => {
  const posterId = Number(id);

  if (!Number.isInteger(posterId) || posterId <= 0) {
    notFound();
  }

  try {
    return await getFilmPosterDesign(posterId);
  } catch {
    notFound();
  }
});

export async function generateStaticParams() {
  const posters = await getAllFilmPosterDesigns();

  return posters.map((poster) => ({
    id: String(poster.id),
  }));
}

export async function generateMetadata({
  params,
}: FilmPosterDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const poster = await getPoster(id);

  return {
    title: `${poster.film_name} Film Poster | Yellowtooths Productions`,
    description:
      poster.description ||
      `View the ${poster.film_name} film poster by Yellowtooths Productions.`,
  };
}

const FilmPosterDetailPage = async ({
  params,
}: FilmPosterDetailPageProps) => {
  const { id } = await params;
  const poster = await getPoster(id);
  const mainImage = getPosterImage(poster);
  const galleryImages = [...poster.images].sort(
    (first, second) => first.position - second.position,
  );
  const details = [
    ["Year", poster.year],
    ["Language", poster.language],
    ["Genre", poster.genre],
    ["IMDb rating", poster.imdb_rating],
    ["Type", poster.type],
  ].filter((detail): detail is [string, string] => Boolean(detail[1]));
  const links = [
    ["Watch trailer", poster.trailer_link],
    ["IMDb", poster.imdb_link],
    ["Wikipedia", poster.wikipedia_link],
    ["Behance", poster.behance_link],
  ].filter((link): link is [string, string] => Boolean(link[1]));

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/15 py-8 sm:py-12">
        <Container>
          <Link
            href="/services/film-poster"
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
            All film posters
          </Link>
        </Container>
      </section>

      <section className="py-10 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:gap-16">
            {mainImage && (
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5 sm:rounded-2xl">
                <Image
                  src={mainImage}
                  alt={`${poster.film_name} film poster`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 45vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col justify-center">
              <p className="font-description text-xs uppercase tracking-[0.18em] text-[#fec52d]">
                Film poster design
              </p>
              <h1 className="font-heading mt-5 text-[clamp(2.75rem,7vw,7rem)] leading-[0.85] tracking-[-0.06em]">
                {poster.film_name}
              </h1>

              {details.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-white/15 py-8 sm:grid-cols-3">
                  {details.map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-description text-[0.65rem] uppercase tracking-[0.14em] text-white/35">
                        {label}
                      </dt>
                      <dd className="font-description mt-2 text-sm text-white/80">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {poster.description && (
                <p className="font-description mt-9 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  {poster.description}
                </p>
              )}

              {links.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-description border border-white/25 px-5 py-3 text-xs uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-[#fec52d] hover:bg-[#fec52d] hover:text-black"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {galleryImages.length > 0 && (
        <section className="border-t border-white/15 py-10 sm:py-16">
          <Container>
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <p className="font-description text-xs uppercase tracking-[0.18em] text-white/40">
                  Project gallery
                </p>
                <h2 className="font-heading mt-3 text-3xl tracking-[-0.04em] sm:text-5xl">
                  Poster Explorations
                </h2>
              </div>
              <p className="font-description text-xs text-white/35">
                {galleryImages.length} images
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-5 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 sm:rounded-2xl"
                >
                  <Image
                    src={image.file_path}
                    alt={`${poster.film_name} poster exploration ${index + 1}`}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
                    unoptimized
                    className="object-cover transition duration-500 hover:scale-[1.015]"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
};

export default FilmPosterDetailPage;

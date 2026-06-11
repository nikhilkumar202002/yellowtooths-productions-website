"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  getAllFilmPosterDesigns,
  type FilmPosterDesign,
} from "@/api/axios";

const getPosterImage = (poster: FilmPosterDesign) =>
  poster.main_image || poster.images[0]?.file_path || null;

const FilmPosterPage = () => {
  const [posters, setPosters] = useState<FilmPosterDesign[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isActive = true;

    getAllFilmPosterDesigns()
      .then((data) => {
        if (!isActive) return;

        setPosters(
          data
            .filter(getPosterImage)
            .sort(
              (first, second) =>
                (second.position_number ?? second.id) -
                (first.position_number ?? first.id),
            ),
        );
      })
      .catch(() => {
        if (isActive) setHasError(true);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredPosters = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posters;

    return posters.filter((poster) =>
      [
        poster.film_name,
        poster.year,
        poster.language,
        poster.genre,
        poster.type,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query)),
    );
  }, [posters, search]);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/15 px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-description mb-4 text-xs uppercase tracking-[0.18em] text-white/45">
              Yellowtooths Productions
            </p>
            <h1 className="font-heading text-[clamp(2.25rem,5vw,5rem)] leading-[0.9] tracking-[-0.06em]">
              Film Posters
            </h1>
          </div>

          <label className="relative block w-full lg:max-w-md">
            <span className="sr-only">Search film posters</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute top-1/2 left-0 size-4 -translate-y-1/2 text-white/45"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="SEARCH POSTERS"
              className="site-search font-description w-full border-b border-white/25 bg-transparent py-4 pr-10 pl-7 text-sm uppercase tracking-[0.08em] text-white outline-none transition-colors placeholder:text-white/35 focus:border-white"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="font-description absolute top-1/2 right-0 -translate-y-1/2 text-xs uppercase tracking-wider text-white/45 transition-colors hover:text-white"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </label>
        </div>
      </header>

      <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {isLoading && (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className="mb-4 animate-pulse break-inside-avoid rounded-2xl bg-white/10 aspect-[2/3]"
              />
            ))}
          </div>
        )}

        {hasError && (
          <div className="flex min-h-72 items-center justify-center border border-white/15 text-center">
            <div>
              <h2 className="font-heading text-2xl">Unable to load posters</h2>
              <p className="font-description mt-3 text-sm text-white/50">
                Please refresh the page and try again.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !hasError && filteredPosters.length === 0 && (
          <div className="flex min-h-72 items-center justify-center border border-white/15 text-center">
            <div>
              <h2 className="font-heading text-2xl">No posters found</h2>
              <p className="font-description mt-3 text-sm text-white/50">
                Try searching with another film name, year, or genre.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !hasError && filteredPosters.length > 0 && (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredPosters.map((poster) => {
              const image = getPosterImage(poster);
              if (!image) return null;

              return (
                <article
                  key={poster.id}
                  className="group relative isolate mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#0d0d0d] aspect-[2/3] [transform:translateZ(0)]"
                >
                  <Image
                    src={image}
                    alt={`${poster.film_name} film poster`}
                    fill
                    unoptimized
                    className="rounded-[inherit] object-cover transition duration-500 group-hover:scale-[1.015]"
                  />

                  <div className="absolute inset-x-0 bottom-0 rounded-b-[inherit] bg-gradient-to-t from-black via-black/80 to-transparent px-5 pt-20 pb-5 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <h2 className="font-heading text-xl leading-none">
                      {poster.film_name}
                    </h2>
                    <p className="font-description mt-2 text-xs uppercase tracking-[0.12em] text-white/55">
                      {[poster.year, poster.language, poster.genre]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default FilmPosterPage;

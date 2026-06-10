import Link from "next/link";
import Container from "@/components/common/Container";

const capabilities = [
  "Strategy",
  "Design",
  "Film",
  "Technology",
  "Production",
];

const HomeAbout = () => {
  return (
    <section className="border-b border-white/15 bg-black text-white">
      <Container>
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-white/15 py-12 lg:border-r lg:border-b-0 lg:py-20 lg:pr-12">
            <p className="font-description text-xs uppercase tracking-[0.18em] text-white/45">
              About Yellowtooths
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {capabilities.map((capability) => (
                <span
                  key={capability}
                  className="font-description rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.08em] text-white/60"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="py-12 lg:py-20 lg:pl-14">
            <h2 className="font-heading max-w-4xl text-[clamp(2rem,4.5vw,4.75rem)] leading-[1.02] tracking-[-0.055em]">
              We shape bold ideas into stories, identities, and experiences
              people remember.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                Yellowtooths is an independent creative production studio
                bringing strategy, design, film, and technology together under
                one roof.
              </p>

              <Link
                href="/about"
                className="font-description group inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-white"
              >
                Know our story
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
        </div>
      </Container>
    </section>
  );
};

export default HomeAbout;

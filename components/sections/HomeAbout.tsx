import ClientLogoSlider from "@/components/common/ClientLogoSlider";
import Container from "@/components/common/Container";
import Link from "next/link";

const clientTypes = ["Brands", "Studios", "Agencies", "Startups", "Institutions"];

const HomeAbout = () => {
  return (
    <section className="border-b border-white/15 bg-black text-white">
      <Container>
        <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex min-w-0 flex-col overflow-hidden border-b border-white/15 py-12 lg:border-r lg:border-b-0 lg:py-20 lg:pr-12">
            <div>
              <p className="font-description text-xs uppercase tracking-[0.18em] text-white/45">
                Selected clients
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {clientTypes.map((clientType) => (
                  <span
                    key={clientType}
                    className="font-description rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.08em] text-white/60"
                  >
                    {clientType}
                  </span>
                ))}
              </div>
            </div>

            <ClientLogoSlider />
          </div>

          <div className="min-w-0 py-12 lg:py-20 lg:pl-14">
            <h2 className="font-heading max-w-4xl text-[clamp(2rem,4.5vw,4.75rem)] leading-[1.02] tracking-[-0.055em]">
              We partner with <span className="text-[#fec52d]">ambitious</span>{" "}
              clients to create brands,{" "}
              <span className="text-[#fec52d]">campaigns</span>, and
              experiences that make an{" "}
              <span className="text-[#fec52d]">impact</span>.
            </h2>

            <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                From the first brief to final delivery, we work closely with
                every client to turn ideas into thoughtful, memorable work
                across strategy, design, film, and technology.
              </p>

              <Link
                href="/works"
                className="font-description group inline-flex w-fit items-center gap-3 text-xs font-medium uppercase tracking-[0.1em] text-white/60 transition-colors hover:text-white"
              >
                View our work
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

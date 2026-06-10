import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

const Header = () => {
  return (
    <header className="w-full border-b border-white/15 bg-black">
      <Container>
        <div className="flex h-[60px] items-stretch">
          <Link
            href="/"
            aria-label="Yellowtooths Productions home"
            className="inline-flex min-w-0 flex-1 items-center pr-4 transition-opacity hover:opacity-80 sm:pr-6 lg:max-w-64 lg:pr-10"
          >
            <Image
              src="/logo_full_size.svg"
              alt="Yellowtooths"
              width={120}
              height={25}
              priority
              className="h-auto w-28 sm:w-[130px]"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden shrink-0 items-stretch border-l border-white/15 lg:flex"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/works", label: "Works" },
              { href: "/services", label: "Service" },
              { href: "/about", label: "About" },
              { href: "/career", label: "Career" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-description flex items-center px-5 text-xs font-medium uppercase tracking-[0.04em] text-white/60 transition-colors hover:text-white xl:px-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            role="search"
            action="/"
            className="hidden min-w-0 flex-1 items-center border-l border-white/15 md:flex"
          >
            <label htmlFor="site-search" className="sr-only">
              Search
            </label>
            <input
              id="site-search"
              name="q"
              type="search"
              placeholder="SEARCH"
              className="site-search font-description h-full w-full bg-transparent px-5 text-xs uppercase tracking-[0.04em] text-white outline-none placeholder:text-white/45 focus:bg-white/[0.04] lg:px-8"
            />
          </form>

          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center border-l border-white/15 px-4 text-white/60 transition-colors hover:text-white md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4"
            >
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>

          <Link
            href="/contact"
            className="font-description group flex shrink-0 items-center justify-center gap-2 border-l border-white/15 px-4 text-xs font-medium uppercase tracking-[0.04em] text-white/60 transition-colors hover:bg-[#fec52d] hover:text-black sm:gap-3 sm:px-7 lg:min-w-52"
          >
            <span className="hidden sm:inline">Contact us</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path
                d="M7 17 17 7M8 7h9v9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;

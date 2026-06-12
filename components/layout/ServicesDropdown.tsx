import Link from "next/link";

const services = [
  { label: "Film Poster Design", href: "/services/film-poster" },
  { label: "Film Promotion", href: "/services/film-promotion" },
  { label: "Branding", href: "/services/branding" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  {
    label: "Technology & Experience Design",
    href: "/services/technology-experience-design",
  },
  { label: "Video Production", href: "/services/video-production" },
  { label: "Thinkery", href: "/services/thinkery" },
  {
    label: "Global Academy of Artistry",
    href: "/services/global-academy-of-artistry",
  },
];

const ServicesDropdown = () => {
  return (
    <div className="group relative flex">
      <Link
        href="/services"
        className="font-heading flex items-center gap-1.5 px-5 text-xs font-medium capitalize tracking-[0.04em] text-white/60 transition-colors hover:text-white group-focus-within:text-white xl:px-4"
        aria-haspopup="true"
      >
        Service
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
          className="size-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        >
          <path
            d="m3 4.5 3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      </Link>

      <div className="invisible absolute top-full left-0 z-50 w-72 translate-y-2 rounded-b-sm border border-white/15 bg-[#0a0a0a] p-2 opacity-0 shadow-2xl shadow-black/60 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="font-heading block px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white focus:bg-white/[0.06] focus:text-white focus:outline-none"
          >
            {service.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesDropdown;

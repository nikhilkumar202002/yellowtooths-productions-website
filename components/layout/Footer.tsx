import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://behance.net", label: "Behance" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#171717] text-white">
      <Container>
        <div className="grid border-b border-white/10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.75fr]">
          <div className="border-b border-white/10 py-12 md:border-r md:pr-10 lg:border-b-0 lg:py-16">
            <Link
              href="/"
              aria-label="Yellowtooths Productions home"
              className="inline-flex w-fit transition-opacity hover:opacity-75"
            >
              <Image
                src="/logo_full_size.svg"
                alt="Yellowtooths"
                width={196}
                height={31}
                className="h-auto w-36"
              />
            </Link>

            <p className="mt-8 max-w-sm text-base leading-7 text-white/50">
              An independent creative production studio shaping stories,
              identities, and experiences.
            </p>
          </div>

          <div className="border-b border-white/10 py-12 md:pl-10 lg:border-r lg:border-b-0 lg:px-10 lg:py-16">
            <p className="font-description text-xs uppercase tracking-[0.16em] text-white/35">
              Explore
            </p>
            <nav aria-label="Footer navigation" className="mt-6">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-description text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="border-b border-white/10 py-12 md:border-r md:pr-10 lg:border-b-0 lg:px-10 lg:py-16">
            <p className="font-description text-xs uppercase tracking-[0.16em] text-white/35">
              Contact
            </p>
            <div className="font-description mt-6 flex flex-col items-start gap-3 text-sm text-white/60">
              <Link
                href="mailto:hello@yellowtooths.com"
                className="transition-colors hover:text-white"
              >
                info@yellowtooths.com
              </Link>
              <Link
                href="tel:+919999999999"
                className="transition-colors hover:text-white"
              >
                +91 99999 99999
              </Link>
              <p className="leading-6">
                Kerala
                <br />
                India
              </p>
            </div>
          </div>

          <div className="py-12 md:pl-10 lg:py-16">
            <p className="font-description text-xs uppercase tracking-[0.16em] text-white/35">
              Follow
            </p>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-description text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="font-description flex flex-col gap-4 py-6 text-xs uppercase tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Yellowtooths Productions. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

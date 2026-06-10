import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          aria-label="Yellowtooths Productions home"
          className="inline-flex w-fit transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo_full_size.svg"
            alt="Yellowtooths"
            width={196}
            height={31}
            className="h-auto w-32"
          />
        </Link>

        <p className="text-xs uppercase tracking-[0.18em] text-white/40">
          &copy; 2026 Yellowtooths Productions. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

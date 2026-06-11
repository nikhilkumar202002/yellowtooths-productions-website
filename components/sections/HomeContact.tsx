import Link from "next/link";
import Container from "@/components/common/Container";

const inputClassName =
  "font-description w-full border-b border-white/25 bg-transparent py-4 text-sm text-white outline-none transition-colors placeholder:text-white/45 focus:border-white";

const HomeContact = () => {
  return (
    <section
      className="relative overflow-hidden border-b border-white/15 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/Images/1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

      <Container className="relative z-10">
        <div className="grid min-h-[680px] lg:grid-cols-2">
          <div className="flex flex-col justify-between border-b border-white/20 py-14 lg:border-r lg:border-b-0 lg:py-20 lg:pr-14">
            <div>
              <p className="font-description text-xs uppercase tracking-[0.18em] text-white/50">
                Start a conversation
              </p>
              <h2 className="font-heading mt-5 max-w-xl text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.06em]">
                Let&apos;s make something worth remembering.
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-description text-xs uppercase tracking-[0.14em] text-white/40">
                  Visit us
                </p>
                <address className="font-description mt-3 max-w-xs text-base not-italic leading-7 text-white/70">
                  Yellowtooths Productions
                  <br />
                  Kerala, India
                </address>
              </div>

              <div>
                <p className="font-description text-xs uppercase tracking-[0.14em] text-white/40">
                  Contact
                </p>
                <div className="font-description mt-3 flex flex-col items-start gap-2 text-base text-white/70">
                  <Link
                    href="mailto:hello@yellowtooths.com"
                    className="transition-colors hover:text-white"
                  >
                    hello@yellowtooths.com
                  </Link>
                  <Link
                    href="tel:+919999999999"
                    className="transition-colors hover:text-white"
                  >
                    +91 99999 99999
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center py-14 lg:py-20 lg:pl-14">
            <form className="w-full" action="/contact" method="get">
              <div className="grid gap-x-8 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input
                    className={inputClassName}
                    type="text"
                    name="name"
                    placeholder="YOUR NAME"
                    required
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Email address</span>
                  <input
                    className={inputClassName}
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    required
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Phone number</span>
                  <input
                    className={inputClassName}
                    type="tel"
                    name="phone"
                    placeholder="PHONE NUMBER"
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Service required</span>
                  <select
                    className={`${inputClassName} appearance-none`}
                    name="service"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-black">
                      SELECT A SERVICE
                    </option>
                    <option value="film" className="bg-black">
                      Film &amp; Video
                    </option>
                    <option value="branding" className="bg-black">
                      Branding
                    </option>
                    <option value="digital" className="bg-black">
                      Digital &amp; Web
                    </option>
                    <option value="campaign" className="bg-black">
                      Campaign
                    </option>
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="sr-only">Project details</span>
                <textarea
                  className={`${inputClassName} min-h-32 resize-none`}
                  name="message"
                  placeholder="TELL US ABOUT YOUR PROJECT"
                  required
                />
              </label>

              <button
                type="submit"
                className="font-description group mt-10 inline-flex items-center gap-4 border border-white/30 px-6 py-4 text-xs font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-[#fec52d] hover:bg-[#fec52d] hover:text-black"
              >
                Send enquiry
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
              </button>
            </form>
          </div>
        </div>

      </Container>

      <div className="relative z-10 border-t border-white/20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7857.658141659531!2d76.3283321!3d10.03096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d00da9cf143%3A0x7d87036eb25d077d!2sYellowtooths!5e0!3m2!1sen!2sin!4v1781155015872!5m2!1sen!2sin"
          title="Yellowtooths Productions location"
          className="block h-[360px] w-full border-0 grayscale sm:h-[440px]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default HomeContact;

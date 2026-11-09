import { ContactForm } from "@/components/contact-form";
import { FacebookIcon, InstagramIcon } from "@/components/social";
import { contactEmail, contactMailto, contactPerson, phone, social } from "@/lib/site";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: "size-5",
};

function PersonIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c1.2-3 3.4-4.4 6.5-4.4s5.3 1.4 6.5 4.4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.2 4.8h2.2l1.2 3-1.5 1.1a12 12 0 0 0 4.9 4.9l1.1-1.5 3 1.2v2.2c0 .8-.6 1.5-1.4 1.6A14.2 14.2 0 0 1 6.6 6.2c.1-.8.8-1.4 1.6-1.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

const linkClass =
  "rounded-sm font-medium text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 hover:decoration-[#42634C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]";

export function Contact() {
  const mailto = contactMailto();

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-title"
      className="scroll-mt-24 overflow-x-clip border-t border-[#42634C]/10 bg-background py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
            KONTAKT
          </p>
          <h2
            id="kontakt-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Povedzte nám, čo plánujete zmeniť.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/75 sm:text-lg">
            Opíšte nám svoju predstavu a ozveme sa vám.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#2A2E2C]">
              Spojme sa priamo
            </h3>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-[#2A2E2C]/75">
              Radšej sa porozprávate? Zavolajte nám alebo napíšte.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3 text-[#2A2E2C]">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#42634C]/20 text-[#42634C]">
                  <PersonIcon />
                </span>
                <span className="font-medium">{contactPerson}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#42634C]/20 text-[#42634C]">
                  <PhoneIcon />
                </span>
                <a href={phone.href} className={linkClass}>
                  {phone.display}
                </a>
              </li>
              {mailto ? (
                <li className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#42634C]/20 text-[#42634C]">
                    <MailIcon />
                  </span>
                  <a href={mailto} className={`${linkClass} break-all`}>
                    {contactEmail}
                  </a>
                </li>
              ) : null}
            </ul>

            <hr className="my-8 border-[#42634C]/15" />

            <p className="font-semibold text-[#2A2E2C]">Našu prácu nájdete aj tu</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={social.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.facebook.name}
                  className="social-link inline-flex items-center gap-3 text-[#42634C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-[#42634C]/20">
                    <FacebookIcon className="size-5" />
                  </span>
                  <span className="font-medium underline decoration-[#42634C]/30 underline-offset-4">
                    Facebook
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.instagram.name}
                  className="social-link inline-flex items-center gap-3 text-[#42634C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]"
                >
                  <span className="grid size-10 place-items-center rounded-full border border-[#42634C]/20">
                    <InstagramIcon className="size-5" />
                  </span>
                  <span className="font-medium underline decoration-[#42634C]/30 underline-offset-4">
                    Instagram
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

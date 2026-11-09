import { cacheLife } from "next/cache";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { FacebookIcon, InstagramIcon } from "@/components/social";
import {
  contactEmail,
  contactMailto,
  contactPerson,
  phone,
  services,
  social,
} from "@/lib/site";

const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: "size-5 shrink-0",
};

function PersonIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="3.1" />
      <path d="M5.6 19.2c1.2-2.9 3.4-4.3 6.4-4.3s5.2 1.4 6.4 4.3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8.2 4.8h2.1l1.2 2.9-1.5 1a12 12 0 0 0 4.8 4.8l1-1.5 2.9 1.2v2.1c0 .8-.6 1.5-1.4 1.6A14 14 0 0 1 6.6 6.2c.1-.8.8-1.4 1.6-1.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3.6" y="5.6" width="16.8" height="12.8" rx="2" />
      <path d="m4.6 7.2 7.4 5.6 7.4-5.6" />
    </svg>
  );
}

const navItems = [
  { label: "Úvod", href: "/" },
  { label: "O nás", href: "/o-nas" },
  { label: "Cenník", href: "/cennik" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;

async function copyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await copyrightYear();
  const mailto = contactMailto();

  return (
    <footer className="relative bg-[#173D2D] text-[#EAE6DC]">
      <style>{`
        .footer-shell { container-type: inline-size; }
        .footer-mark {
          margin: 1.15rem 0 0;
          padding-bottom: 0.06em;
          color: rgba(234, 230, 220, 0.18);
          font-size: 12cqi;
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1;
          text-align: right;
          white-space: nowrap;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin-top: 10px;
        }
        .footer-links > li {
          width: 100%;
        }
        .footer-link {
          display: block;
          width: 100%;
          padding-block: 7px;
          color: inherit;
          font-size: 15px;
          line-height: 1.35;
          text-decoration: none;
        }
        .footer-link > span {
          background-image: linear-gradient(currentColor, currentColor);
          background-repeat: no-repeat;
          background-position: left 100%;
          background-size: 0 1px;
        }
        .footer-links .footer-icon-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-base .footer-link {
          display: inline;
          width: auto;
          padding-block: 0;
          font-size: inherit;
          font-weight: 500;
        }
        .footer-static {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-block: 7px;
          color: inherit;
          font-size: 15px;
          line-height: 1.35;
        }
        .footer-brand:focus-visible,
        .footer-link:focus-visible,
        .footer-social:focus-visible {
          outline: 2px solid #EAE6DC;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .footer-link:focus-visible {
          color: #F7F4EE;
        }
        .footer-link:focus-visible > span {
          background-size: 100% 1px;
        }
        .footer-social:focus-visible {
          background: rgba(234, 230, 220, 0.14);
        }
        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
          .footer-link { transition: color 220ms ease; }
          .footer-link > span { transition: background-size 220ms ease; }
          .footer-link:hover { color: #F7F4EE; }
          .footer-link:hover > span { background-size: 100% 1px; }
          .footer-social { transition: background-color 220ms ease; }
          .footer-social:hover { background: rgba(234, 230, 220, 0.14); }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-link,
          .footer-link > span,
          .footer-social { transition: none; }
        }
        .footer-wave {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 20px;
          transform: translateY(calc(-100% + 2px));
          pointer-events: none;
        }
        @media (min-width: 1024px) {
          .footer-wave { height: 36px; }
        }
      `}</style>
      <svg
        className="footer-wave"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="#173D2D"
          d="M 0.0 24.2 C 11.8 22.2 46.6 15.8 70.6 12.5 C 94.6 9.1 119.8 6.2 144.0 4.2 C 168.2 2.1 192.0 0.7 216.0 0.0 C 240.0 0.0 264.2 0.0 288.0 0.0 C 311.8 0.4 334.8 1.5 358.6 2.5 C 382.3 3.5 406.3 4.4 430.6 5.8 C 454.8 7.2 479.8 9.2 504.0 10.8 C 528.2 12.5 552.2 14.0 576.0 15.8 C 599.8 17.6 622.8 19.7 646.6 21.7 C 670.3 23.6 694.6 25.6 718.6 27.5 C 742.6 29.5 766.3 31.5 790.6 33.3 C 814.8 35.1 840.0 37.2 864.0 38.3 C 888.0 39.4 910.8 39.9 934.6 40.0 C 958.3 40.0 982.6 40.0 1006.6 39.2 C 1030.6 38.3 1054.6 36.9 1078.6 35.0 C 1102.6 33.1 1126.6 30.3 1150.6 27.5 C 1174.6 24.7 1198.6 21.5 1222.6 18.3 C 1246.6 15.1 1270.6 10.8 1294.6 8.3 C 1318.6 5.8 1342.3 4.0 1366.6 3.3 C 1390.8 2.6 1427.8 4.0 1440.0 4.2 L 1440 40 L 0 40 Z"
        />
      </svg>
      <div className="overflow-x-clip">
      <div className="footer-shell mx-auto w-full max-w-[1440px] px-5 pt-10 pb-6 sm:px-6 lg:px-[72px] lg:pt-12 lg:pb-7">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0">
          <div className="max-w-xs">
            <Link href="/" className="footer-brand inline-flex items-center gap-2.5 text-[#EAE6DC]">
              <LogoMark className="size-6" />
              <span className="text-[26px] leading-none font-bold tracking-tight">ProfiDepo</span>
            </Link>
            <p className="mt-4 max-w-[16rem] text-[15px] leading-relaxed text-[#EAE6DC]/90">
              Rekonštrukcie a remeselné práce pre vaše bývanie.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={social.facebook.href}
                {...external}
                aria-label={social.facebook.name}
                className="footer-social inline-flex size-11 items-center justify-center rounded-full text-[#EAE6DC]"
              >
                <FacebookIcon className="size-8" />
              </a>
              <a
                href={social.instagram.href}
                {...external}
                aria-label={social.instagram.name}
                className="footer-social inline-flex size-11 items-center justify-center rounded-full text-[#EAE6DC]"
              >
                <InstagramIcon className="size-8" />
              </a>
            </div>
          </div>

          <nav aria-label="Služby">
            <h2 className="text-[12px] font-semibold tracking-[0.16em] text-[#EAE6DC]/75 uppercase">
              Služby
            </h2>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.title}>
                  <Link href={service.href} className="footer-link">
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="ProfiDepo">
            <h2 className="text-[12px] font-semibold tracking-[0.16em] text-[#EAE6DC]/75 uppercase">
              ProfiDepo
            </h2>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="footer-link">
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[12px] font-semibold tracking-[0.16em] text-[#EAE6DC]/75 uppercase">
              Kontakt
            </h2>
            <ul className="footer-links">
              <li className="footer-static">
                <PersonIcon />
                <span>{contactPerson}</span>
              </li>
              <li>
                <a href={phone.href} className="footer-link footer-icon-link">
                  <PhoneIcon />
                  <span>{phone.display}</span>
                </a>
              </li>
              {mailto ? (
                <li>
                  <a href={mailto} className="footer-link footer-icon-link">
                    <MailIcon />
                    <span>{contactEmail}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <p className="footer-mark" aria-hidden="true">
          ProfiDepo
        </p>

        <div className="footer-base mt-3 flex flex-col gap-2 border-t border-[#EAE6DC]/25 pt-4 text-sm text-[#EAE6DC]/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ProfiDepo</p>
          <p>
            Web vytvoril:{" "}
            <a
              href="https://www.webzajn.sk"
              {...external}
              className="footer-link font-medium text-[#EAE6DC]"
            >
              <span>Webzajn</span>
            </a>
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}

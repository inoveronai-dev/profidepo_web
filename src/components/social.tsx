import { social } from "@/lib/site";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path
        d="M13.1 17.4v-4.6h1.5l.3-1.7h-1.8V10c0-.5.2-.8.9-.8h.9V7.6h-1.3c-1.5 0-2.5.9-2.5 2.5v1h-1.4v1.7h1.4v4.6h2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const external = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export function HeaderSocialLinks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex items-center gap-1"}>
      <a
        href={social.facebook.href}
        {...external}
        aria-label={social.facebook.name}
        className="social-link inline-flex size-10 items-center justify-center rounded-full text-[#42634C]"
      >
        <FacebookIcon className="size-[22px]" />
      </a>
      <a
        href={social.instagram.href}
        {...external}
        aria-label={social.instagram.name}
        className="social-link inline-flex size-10 items-center justify-center rounded-full text-[#42634C]"
      >
        <InstagramIcon className="size-[22px]" />
      </a>
    </div>
  );
}

export function SocialStrip() {
  return (
    <section aria-label="Sociálne siete" className="bg-[#CEDBCB]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-10 text-center sm:px-6 lg:px-[72px] lg:py-12">
        <h2 className="max-w-3xl text-xl font-semibold tracking-[-0.02em] text-[#42634C] sm:text-2xl">
          Naša práca pokračuje aj na sociálnych sieťach.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#42634C]/80 sm:mt-4 sm:text-base">
          Ďalšie ukážky a novinky z realizácií nájdete na našich profiloch.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
          <a
            href={social.facebook.href}
            {...external}
            aria-label={social.facebook.name}
            className="social-link inline-flex h-12 items-center gap-2 rounded-lg border border-[#42634C] px-4 text-[15px] font-medium text-[#42634C]"
          >
            <FacebookIcon className="size-5" />
            Facebook
          </a>
          <a
            href={social.instagram.href}
            {...external}
            aria-label={social.instagram.name}
            className="social-link inline-flex h-12 items-center gap-2 rounded-lg border border-[#42634C] px-4 text-[15px] font-medium text-[#42634C]"
          >
            <InstagramIcon className="size-5" />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

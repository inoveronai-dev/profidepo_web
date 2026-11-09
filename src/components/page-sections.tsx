import Image from "next/image";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="sluzby" className="bg-background pt-[22px] pb-14 lg:pb-16">
      <style>{`
        #sluzby { scroll-margin-top: 65px; }
        @media (min-width: 1024px) {
          #sluzby { scroll-margin-top: 81px; }
        }
        .service-card img {
          transform: scale(1);
          transition: transform 700ms ease-out;
        }
        .service-card:hover img,
        .service-card:focus-visible img {
          transform: scale(1.03);
        }
        .service-card:focus-visible {
          outline: 2px solid #42634c;
          outline-offset: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .service-card img,
          .service-card:hover img,
          .service-card:focus-visible img {
            transform: none;
            transition: none;
          }
        }
      `}</style>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
            Naše služby
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Od jednej miestnosti po celý byt.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
            Rekonštrukcie a remeselné práce podľa vašich predstáv.
          </p>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-7 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.src}>
              <a
                href={service.href}
                className="service-card group relative block aspect-[3/2] overflow-hidden rounded-[12px]"
              >
                <Image
                  src={service.src}
                  alt={service.alt}
                  fill
                  unoptimized
                  loading="lazy"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: service.position }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,16,14,0.86) 0%, rgba(12,16,14,0.78) 44%, rgba(12,16,14,0.28) 58%, rgba(12,16,14,0) 72%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 z-[1] flex items-end gap-3 p-4 text-white sm:p-5">
                  <div className="min-w-0 flex-1">
                    <ServiceGlyph name={service.icon} />
                    <h3 className="mt-2 text-base leading-snug font-semibold sm:text-lg">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-white/90">
                      {service.text}
                    </p>
                  </div>
                  <CardArrow />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceGlyph({ name }: { name: (typeof services)[number]["icon"] }) {
  const props = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
    className: "size-9 md:size-10 lg:size-11",
  };
  if (name === "house") {
    return (
      <svg {...props}>
        <path d="M31.6 12.4V6.6h5.6V16.9" />
        <path d="M5.2 21.2 23.8 6.2 42.6 21.2" />
        <path d="M9.6 18V41h28.2V18" />
        <path d="M19.8 41V28.8h8V41" />
      </svg>
    );
  }
  if (name === "shower") {
    return (
      <svg {...props}>
        <path d="M10.7 25.6V13.6C10.7 8 16.6 6.4 19.8 10.6 21.2 12.6 18.4 16.4 18.4 16.4H27.6" />
        <path d="M6.1 25h35.8" />
        <path d="M6.1 25c0 8.2 4.2 15.6 10.2 15.6h15.4C37.7 40.6 41.9 33.2 41.9 25" />
        <path d="M13 40.6v3M34.8 40.6v3" />
      </svg>
    );
  }
  if (name === "cottage") {
    return (
      <svg {...props}>
        <path d="M12.2 14.8V7h5.1V10.3" />
        <path d="M3.8 22.4 19.8 8 33.2 20.6" />
        <path d="M9 19V41h23V19" />
        <path d="M12.2 24.8h4.6" />
        <path d="M16 41V28.8h8.6V41" />
        <path d="M37 14.4 41.2 6.5 45.2 14.4 43.6 16.2 36.4 21.5 46.4 23.2 46.2 32.2 37.2 32.4" />
        <path d="M41.2 32.4v8" />
      </svg>
    );
  }
  if (name === "layers") {
    return (
      <svg {...props}>
        <path d="M24 5.1 43.5 15.4 24 23 4.2 15.4Z" />
        <path d="M5.1 24.3 23.7 30.7 42.6 24.3" />
        <path d="M4.2 32.6 23.7 42.2 43.5 32.6" />
      </svg>
    );
  }
  if (name === "trowel") {
    return (
      <svg {...props}>
        <path d="M5.1 8.6h37.5v30.4H5.1Z" />
        <path d="M5.1 19.2h37.5M5.1 28.8h37.5" />
        <path d="M17.8 8.6v10.6M29.9 19.2v9.6M17.8 28.8V39" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M7.8 6.4v8.4M15.8 6.4v8.4" />
      <path d="M5 15.4h13.7v8.2c0 3.4-3 6.2-6.8 6.2s-6.9-2.8-6.9-6.2Z" />
      <path d="M11.8 29.8v4.2c0 3.2 2.4 5.2 6.2 5.6 2.6.2 3.6 1.6 3.6 2.6" />
      <path d="M28.2 15.4h13.1" />
      <path d="M34.7 15.4v7.4" />
      <path d="M29 23h11.8v11.6H29Z" />
      <path d="M26.2 28.8H29M40.8 28.8h3.7" />
      <path d="M34.7 34.6v7.6" />
    </svg>
  );
}

function CardArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mb-1 size-4 shrink-0"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}


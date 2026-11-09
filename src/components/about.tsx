"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, FileText, Search, Wrench } from "lucide-react";

const benefits = [
  {
    title: "Dohodnutý termín",
    text: "Priebeh prác plánujeme vopred.",
    Icon: Calendar,
  },
  {
    title: "Jasná cenová ponuka",
    text: "Rozsah a cenu si odsúhlasíme.",
    Icon: FileText,
  },
  {
    title: "Dôraz na detail",
    text: "Dbáme na precízne spracovanie.",
    Icon: Search,
  },
  {
    title: "Profesionálne vybavenie",
    text: "Kvalitné nástroje a materiály.",
    Icon: Wrench,
  },
] as const;

export function About({
  heading = "h2",
  cta = true,
  priority = false,
}: {
  heading?: "h1" | "h2";
  cta?: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const Title = heading;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.animate = "true";
    const collage = root.querySelector<HTMLElement>(".about-collage");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        root.classList.add("is-in");
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(root);
    const collageObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        collage?.classList.add("is-in");
        collageObserver.disconnect();
      },
      { threshold: 0.2 },
    );
    if (collage) collageObserver.observe(collage);
    return () => {
      observer.disconnect();
      collageObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      id="o-nas"
      aria-labelledby="o-nas-title"
      className="border-t border-[#42634C]/10 bg-background py-14 lg:py-16"
    >
      <style>{`
        #o-nas { scroll-margin-top: 81px; }
        .about-main,
        .about-portrait img {
          display: block;
          width: 100%;
          height: auto;
        }
        .about-main {
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }
        .about-shot {
          overflow: hidden;
        }
        .about-shot-main {
          border-radius: 16px;
        }
        .about-portrait .about-shot {
          border-radius: 10px;
        }
        .about-zoom {
          transform: none;
        }
        .about-portrait {
          position: relative;
          z-index: 1;
          width: 37%;
          margin-top: calc(-29.5% + 1.58px);
          margin-left: auto;
          padding: 4px;
          background: var(--background);
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(42, 46, 44, 0.1);
        }
        @media (min-width: 1024px) {
          #o-nas { scroll-margin-top: 97px; }
        }
        @media (min-width: 640px) {
          .about-frame {
            margin-bottom: 2rem;
          }
          .about-portrait {
            position: absolute;
            width: 28%;
            right: 4%;
            bottom: 0;
            margin: 0;
            padding: 6px;
            background: var(--background);
            border-radius: 16px;
            box-shadow: 0 8px 22px rgba(42, 46, 44, 0.1);
            transform: translateY(14%);
          }
          .about-portrait .about-shot {
            border-radius: 11px;
          }
        }
        @media (min-width: 1024px) {
          .about-frame {
            margin-bottom: 3.25rem;
          }
          .about-portrait {
            width: 31%;
            right: 4.5%;
            transform: translateY(16%);
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          #o-nas[data-animate="true"]:not(.is-in) .about-reveal {
            opacity: 0;
            transform: translateY(8px);
          }
          #o-nas[data-animate="true"].is-in .about-reveal {
            opacity: 1;
            transform: none;
            transition: opacity 520ms ease, transform 520ms ease;
          }
          #o-nas[data-animate="true"] .about-collage:not(.is-in) {
            opacity: 0;
            transform: translateY(12px);
          }
          #o-nas[data-animate="true"] .about-collage.is-in {
            opacity: 1;
            transform: none;
            transition: opacity 580ms ease, transform 580ms ease;
          }
        }
        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
          .about-zoom {
            transition: transform 700ms ease;
          }
          .about-shot-main:hover .about-zoom,
          .about-portrait:hover .about-zoom {
            transform: scale(1.025);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-collage,
          .about-zoom {
            animation: none;
            transition: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:px-[72px]">
        <div className="about-frame about-collage relative min-w-0">
          <div className="about-shot about-shot-main">
            <img
              src="/photos/o-nas/obyvacka.webp"
              width={1448}
              height={1086}
              alt="Obývačka so sivou sedačkou, dreveným stolom, oknom so sivými závesmi a televízorom na nízkej skrinke."
              className="about-main about-zoom"
              decoding="async"
              loading={priority ? "eager" : "lazy"}
            />
          </div>
          <div className="about-portrait">
            <div className="about-shot">
              <img
                src="/photos/o-nas/remeselnici.webp"
                width={444}
                height={590}
                alt="Dvaja remeselníci v bielych tričkách a tmavých montérkach."
                className="about-zoom"
                decoding="async"
                loading={priority ? "eager" : "lazy"}
              />
            </div>
          </div>
        </div>

        <div className="about-reveal min-w-0">
          <p className="text-[11px] font-medium tracking-[0.18em] text-[#42634C] uppercase sm:text-xs">
            O nás
          </p>
          <Title
            id="o-nas-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
          >
            Poctivá práca.
            <br />
            Premyslený výsledok.
          </Title>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80">
            V ProfiDepo sa venujeme rekonštrukciám bytov, domov a chalúp aj jednotlivým remeselným prácam.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80">
            Záleží nám na precíznom spracovaní, správnych pracovných postupoch a kvalitných materiáloch.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {benefits.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <item.Icon
                  className="mt-0.5 size-6 shrink-0 text-[#42634C]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[15px] font-semibold text-[#2A2E2C]">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-[#2A2E2C]/75">
                    {item.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          {cta ? (
            <Link
              href="/o-nas"
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-[#214B38] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#183528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214B38]"
            >
              Viac o nás
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { photos, SLIDE_FADE_MS, SLIDE_VISIBLE_MS } from "@/lib/site";

/**
 * Cover position inside the shared card. The desktop photo is the right
 * side of a diagonal crop, so each frame keeps its fixtures in that area.
 */
const heroPosition = [
  "62% 58%",
  "48% 44%",
  "42% 54%",
  "40% 48%",
] as const;

/** Photo-only end scale. Small enough that the diagonal crop stays covered. */
const heroZoom = [1.03, 1.034, 1.03, 1.03] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const STAT_YEARS = 26;
const STAT_JOBS = 1000;
const STAT_MS = 1800;

function formatJobs(value: number) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
}

function introPhase() {
  const el = document.getElementById("profidepo-intro");
  if (!el) return "done" as const;
  if (el.classList.contains("is-done")) return "done" as const;
  const style = getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return "done" as const;
  if (el.classList.contains("is-leaving") || Number(style.opacity) === 0) return "leave" as const;
  return "cover" as const;
}

function HeroStats() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ years: STAT_YEARS, jobs: STAT_JOBS });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const win = window as Window & { __profidepoHeroStats?: "running" | "done" };
    if (reduce || win.__profidepoHeroStats === "done") {
      setCounts({ years: STAT_YEARS, jobs: STAT_JOBS });
      root.dataset.state = "final";
      return;
    }

    let frame = 0;
    let stopped = false;
    let zeroed = false;

    const play = () => {
      if (stopped || win.__profidepoHeroStats) return;
      win.__profidepoHeroStats = "running";
      const start = performance.now();
      const step = (now: number) => {
        if (stopped) return;
        const progress = Math.min(1, (now - start) / STAT_MS);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounts({
          years: Math.round(eased * STAT_YEARS),
          jobs: Math.round(eased * STAT_JOBS),
        });
        if (progress < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        win.__profidepoHeroStats = "done";
        root.dataset.state = "final";
      };
      setCounts({ years: 0, jobs: 0 });
      frame = requestAnimationFrame(step);
    };

    const ready = () => {
      if (stopped || win.__profidepoHeroStats === "done") return;
      const phase = introPhase();
      if (phase === "cover") return;
      if (!zeroed) {
        zeroed = true;
        setCounts({ years: 0, jobs: 0 });
      }
      if (phase !== "done" || win.__profidepoHeroStats === "running") return;
      const box = root.getBoundingClientRect();
      const shown = box.bottom > 8 && box.top < window.innerHeight * 0.96;
      if (shown) play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) ready();
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    const intro = document.getElementById("profidepo-intro");
    const mo = intro ? new MutationObserver(ready) : null;
    mo?.observe(intro as HTMLElement, { attributes: true, attributeFilter: ["class"] });
    const backup = window.setTimeout(ready, 2700);
    ready();

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mo?.disconnect();
      window.clearTimeout(backup);
      if (win.__profidepoHeroStats === "running") delete win.__profidepoHeroStats;
    };
  }, []);

  return (
    <div className="hero-stats" ref={rootRef}>
      <div className="hero-stat">
        <p className="sr-only">26{"\u00A0"}rokov praxe</p>
        <p className="hero-stat-line" aria-hidden="true">
          <span className="hero-stat-slot">
            <span className="hero-stat-sizer">{STAT_YEARS}</span>
            <span className="hero-stat-value">{counts.years}</span>
          </span>
          <span className="hero-stat-suffix">{"\u00A0"}rokov</span>
        </p>
        <p className="hero-stat-caption" aria-hidden="true">
          praxe
        </p>
      </div>
      <div className="hero-stat-rule" aria-hidden="true" />
      <div className="hero-stat">
        <p className="sr-only">1{"\u00A0"}000+ zrealizovaných zákaziek</p>
        <p className="hero-stat-line" aria-hidden="true">
          <span className="hero-stat-slot">
            <span className="hero-stat-sizer">{formatJobs(STAT_JOBS)}</span>
            <span className="hero-stat-value">{formatJobs(counts.jobs)}</span>
          </span>
          <span className="hero-stat-suffix">+</span>
        </p>
        <p className="hero-stat-caption" aria-hidden="true">
          zrealizovaných zákaziek
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [cooling, setCooling] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const timeout = window.setTimeout(() => {
      setCooling(previous !== index ? previous : null);
      setPrevious(index);
      setIndex((index + 1) % photos.length);
    }, SLIDE_VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, [index, previous, reduced, paused, timerKey]);

  useEffect(() => {
    if (cooling === null) return;
    const timeout = window.setTimeout(() => setCooling(null), reduced ? 0 : SLIDE_FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [cooling, reduced]);

  const show = useCallback(
    (next: number) => {
      setCooling(previous !== index ? previous : null);
      setPrevious(index);
      setIndex(next);
      setTimerKey((key) => key + 1);
    },
    [index, previous],
  );

  const pause = () => setPaused(true);
  const resume = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setPaused(false);
  };

  return (
    <section id="uvod" className="bg-background text-[#2A2E2C]" aria-roledescription="prezentácia" aria-label="Priestory">
      <style>{`
        .hero-shell {
          margin: 16px auto 0;
          width: min(1440px, 100%);
          padding: 0 20px;
        }
        .hero-card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 32px;
          background: #F7F2EA;
        }
        .hero-copy {
          position: relative;
          z-index: 2;
          padding: 28px 22px 22px;
        }
        .hero-title {
          font-size: clamp(2.15rem, 8.4vw, 2.85rem);
          line-height: 1.02;
          font-weight: 800;
          letter-spacing: -0.035em;
        }
        .hero-lead {
          margin-top: 16px;
          max-width: 36rem;
          font-size: 17px;
          line-height: 1.35;
        }
        .hero-actions {
          margin-top: 22px;
        }
        .hero-stats {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
          margin: 20px 0 0;
        }
        .hero-stat {
          min-width: 0;
        }
        .hero-stat:first-child { flex: 0 0 auto; }
        .hero-stat:last-child { flex: 1 1 auto; }
        .hero-stat-rule {
          width: 1px;
          flex: 0 0 auto;
          align-self: stretch;
          margin: 3px 14px;
          background: rgba(30, 58, 44, 0.28);
        }
        .hero-stat-line {
          display: flex;
          align-items: baseline;
          margin: 0;
          color: #1E3A2C;
          font-size: clamp(1.4rem, 5.5vw, 1.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        .hero-stat-slot {
          position: relative;
          display: inline-block;
        }
        .hero-stat-sizer { visibility: hidden; }
        .hero-stat-value {
          position: absolute;
          top: 0;
          left: 0;
        }
        .hero-stat-caption {
          margin: 5px 0 0;
          color: #42634C;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.25;
        }
        .hero-media {
          position: relative;
          aspect-ratio: 5 / 4;
          overflow: hidden;
          background: #cfc8bc;
        }
        .hero-services {
          position: relative;
          text-decoration: none;
        }
        .hero-services::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 1px;
          background: #42634C;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 300ms ease;
          pointer-events: none;
        }
        .hero-services:hover::after,
        .hero-services:focus-visible::after {
          transform: scaleX(1);
        }
        .hero-more {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          width: max-content;
          margin: 24px 0 0;
          color: #173D2D;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.2;
          text-decoration: none;
        }
        .hero-more:focus-visible {
          outline: 2px solid #42634C;
          outline-offset: 4px;
          border-radius: 4px;
        }
        .hero-more-chevron {
          display: block;
        }
        .hero-controls {
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.45);
        }
        .hero-controls::before {
          content: "";
          position: absolute;
          z-index: -1;
          left: -8px;
          right: -8px;
          top: 50%;
          height: 28px;
          transform: translateY(-50%);
          border-radius: 6px;
          background: rgba(18, 28, 24, 0.46);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
          pointer-events: none;
        }
        .hero-tick {
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
        }
        @keyframes hero-nudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .hero-photo {
          position: absolute;
          inset: -4%;
          width: 108%;
          height: 108%;
          max-width: none;
          object-fit: cover;
          transform: scale(1);
          transform-origin: center center;
        }
        .hero-photo.is-zooming {
          animation: hero-zoom var(--hero-zoom-ms) linear forwards;
        }
        @keyframes hero-zoom {
          from { transform: scale(1); }
          to { transform: scale(var(--hero-zoom)); }
        }
        @media (min-width: 640px) {
          .hero-shell { padding: 0 24px; }
          .hero-copy { padding: 36px 32px 28px; }
          .hero-title { font-size: clamp(2.6rem, 5.4vw, 3.35rem); }
          .hero-media { aspect-ratio: 16 / 10; }
        }
        @media (min-width: 1024px) {
          .hero-shell { padding: 0 72px; margin-top: 20px; }
          .hero-copy { padding: 44px 48px 36px; }
          .hero-title { font-size: clamp(3.15rem, 4.6vw, 4rem); }
          .hero-lead { margin-top: 18px; font-size: 18px; }
          .hero-media { aspect-ratio: 16 / 9; }
        }
        @media (min-width: 1280px) {
          .hero-shell { padding: 0 40px; margin-top: 36px; }
          .hero-card {
            display: block;
            aspect-ratio: 1.91 / 1;
          }
          .hero-more {
            position: absolute;
            /* Copy is the left 52% of the card, so this centres the link at 48.5% of the card. */
            left: calc(48.5% / 0.52);
            bottom: 28px;
            margin: 0;
            transform: translateX(-50%);
          }
          .hero-copy {
            display: flex;
            width: 52%;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            padding: 0 20px 0 60px;
          }
          .hero-title {
            font-size: clamp(4.35rem, 6.05vw, 5.9rem);
            line-height: 0.98;
          }
          .hero-lead { margin-top: 22px; font-size: 19px; }
          .hero-actions { margin-top: 28px; }
          .hero-stats { margin-top: 26px; }
          .hero-stat-line { font-size: 2.2rem; }
          .hero-stat-rule { margin: 4px 22px; }
          .hero-stat-caption { margin-top: 6px; font-size: 15px; }
          .hero-stat:last-child .hero-stat-caption { max-width: 11.5rem; }
          .hero-media {
            position: absolute;
            inset: 0;
            aspect-ratio: auto;
            clip-path: polygon(41% 0, 100% 0, 100% 100%, 59% 100%);
          }
          .hero-photo {
            inset: auto;
            top: 0;
            right: 0;
            left: auto;
            width: 66%;
            height: 100%;
          }
          .hero-controls { right: 28px; bottom: 26px; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-more-chevron {
            animation: hero-nudge 2.6s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-photo,
          .hero-photo.is-zooming {
            animation: none;
            transform: none;
            transition: none;
          }
          .hero-services::after,
          .hero-more-chevron {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div className="hero-shell">
        <div className="hero-card">
          <div className="hero-copy">
            <h1 className="hero-title text-[#1E3A2C]">
              <span className="block">Váš domov.</span>
              <span className="block">Premyslený</span>
              <span className="block">do detailu.</span>
            </h1>
            <p className="hero-lead text-[#2A2E2C]">
              <span className="block">Od prvej predstavy až po hotový priestor.</span>
              <span className="block">Rekonštrukcie a dokončovacie práce s ProfiDepo.</span>
            </p>
            <div className="hero-actions flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#kontakt"
                className="inline-flex h-[52px] items-center justify-center rounded-lg bg-[#42634C] px-6 text-[16px] font-medium text-white transition-colors hover:bg-[#36543f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]"
              >
                Dohodnúť obhliadku
              </a>
              <a
                href="#sluzby"
                className="hero-services inline-flex items-center text-[16px] font-medium text-[#2A2E2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]"
              >
                Pozrieť služby
              </a>
            </div>
            <HeroStats />
            <a href="#sluzby" className="hero-more">
              Objavte viac
              <span className="hero-more-chevron" aria-hidden="true">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 6.25 8 10.75l4.5-4.5" />
                </svg>
              </span>
            </a>
          </div>

          <div className="hero-media">
            {photos.map((photo, photoIndex) => {
              const active = photoIndex === index;
              const underneath = photoIndex === previous && previous !== index;
              const zooming = !reduced && (active || underneath || photoIndex === cooling);
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={active ? photo.alt : ""}
                  aria-hidden={!active}
                  draggable={false}
                  className={[
                    "hero-photo",
                    reduced ? "" : "transition-opacity ease-in-out",
                    active || underneath ? "opacity-100" : "opacity-0",
                    active ? "z-[2]" : underneath ? "z-[1]" : "z-0",
                    zooming ? "is-zooming" : "",
                  ].join(" ")}
                  style={{
                    objectPosition: heroPosition[photoIndex],
                    transitionDuration: reduced ? "0ms" : `${SLIDE_FADE_MS}ms`,
                    ["--hero-zoom" as string]: String(heroZoom[photoIndex]),
                    ["--hero-zoom-ms" as string]: `${SLIDE_VISIBLE_MS}ms`,
                  }}
                />
              );
            })}
            <div
              className="hero-controls absolute right-4 bottom-4 z-[4] flex items-center gap-3 text-[13px] font-medium tracking-wide text-white sm:right-5 sm:bottom-5 sm:text-sm"
              onMouseEnter={pause}
              onMouseLeave={() => setPaused(false)}
              onFocus={pause}
              onBlur={resume}
            >
              <p className="tabular-nums" aria-live="polite">
                {pad(index + 1)}
                <span className="text-white/80"> / {pad(photos.length)}</span>
              </p>
              <div className="flex items-center gap-2" role="group" aria-label="Snímky">
                {photos.map((photo, photoIndex) => {
                  const active = photoIndex === index;
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => show(photoIndex)}
                      aria-label={`Zobraziť: ${photo.caption}`}
                      aria-current={active ? "true" : undefined}
                      className="flex h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span
                        className={[
                          "hero-tick block h-px",
                          active ? "w-8 bg-white" : "w-5 bg-white/90",
                        ].join(" ")}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

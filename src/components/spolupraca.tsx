"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

const STEPS = [
  {
    id: "spolupraca-krok-01",
    kicker: "01 — Vaša predstava",
    title: "Povedzte nám svoju predstavu.",
    text: "Zavolajte alebo napíšte, čo plánujete prerábať a kedy by ste chceli začať.",
    control: "Vaša predstava",
    short: "Predstava",
  },
  {
    id: "spolupraca-krok-02",
    kicker: "02 — Prvý odhad",
    title: "Získajte prvý odhad.",
    text: "Pripravíme predbežný odhad ceny a navrhneme možné termíny realizácie.",
    control: "Prvý odhad",
    short: "Odhad",
  },
  {
    id: "spolupraca-krok-03",
    kicker: "03 — Obhliadka",
    title: "Stretneme sa priamo u vás.",
    text: "Priestor zameriame, prejdeme vaše požiadavky a poradíme s riešením aj materiálmi.",
    control: "Obhliadka",
    short: "Obhliadka",
  },
  {
    id: "spolupraca-krok-04",
    kicker: "04 — Dohoda",
    title: "Dohodneme detaily a začneme.",
    text: "Po odsúhlasení presnej kalkulácie potvrdíme termín, uzatvoríme objednávku a pustíme sa do práce.",
    control: "Dohoda",
    short: "Dohoda",
  },
] as const;

const DESKTOP = "(min-width: 1024px)";

function stepFromTrack(track: HTMLElement) {
  const scene = track.querySelector<HTMLElement>(".scene");
  if (!scene) return 0;
  const range = Math.max(1, track.offsetHeight - scene.offsetHeight);
  const scrolled = 81 - track.getBoundingClientRect().top;
  const progress = Math.min(1, Math.max(0, scrolled / range));
  if (progress >= 0.999) return 3;
  return Math.min(3, Math.floor(progress * 4));
}

function scrollTopForStep(track: HTMLElement, index: number) {
  const scene = track.querySelector<HTMLElement>(".scene");
  const range = Math.max(1, track.offsetHeight - (scene?.offsetHeight ?? 0));
  const scrolled = ((index + 0.5) / 4) * range;
  return window.scrollY + track.getBoundingClientRect().top - (81 - scrolled);
}

function Draw({
  d,
  width = 8,
  cap = "butt",
}: {
  d: string;
  width?: number;
  cap?: "butt" | "round" | "square";
}) {
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap={cap}
      strokeLinejoin="round"
    />
  );
}

function FloorPlan({ step }: { step: number }) {
  return (
    <svg
      viewBox="0 0 980 640"
      role="img"
      aria-labelledby="spolupraca-plan-title"
      data-drawing={step + 1}
      className="h-auto w-full text-[#42634C]"
    >
      <title id="spolupraca-plan-title">
        Ilustračný pôdorys. Nie je to reálny projekt ani návrh architektúry.
      </title>
      <defs>
        <pattern
          id="spolupraca-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0 H0 V28"
            fill="none"
            stroke="#42634C"
            strokeOpacity="0.13"
            strokeWidth="0.7"
          />
        </pattern>
        <clipPath id="spolupraca-floor">
          <path d="M100 88 H368 V146 H508 V88 H880 V548 H100 Z" />
        </clipPath>
      </defs>

      <rect width="980" height="640" fill="var(--background)" />
      <rect
        width="980"
        height="640"
        fill="url(#spolupraca-grid)"
        clipPath="url(#spolupraca-floor)"
      />

      <g className={step >= 1 ? "process-layer is-on" : "process-layer"}>
        <rect
          className="no-draw"
          x="118"
          y="106"
          width="204"
          height="424"
          fill="#E4EBE3"
        />
      </g>

      <g className="process-layer is-on">
        <Draw
          d="M100 88 H368 V146 H508 V88 H880 V548 H100 Z"
          width={16}
        />
        <path
          className="no-draw"
          d="M100 214 V262 M100 360 V408 M250 548 H318 M700 548 H768 M880 150 V198"
          fill="none"
          stroke="var(--background)"
          strokeWidth={20}
          strokeLinecap="butt"
        />
        <Draw d="M94 218 V258 M106 218 V258" width={1.6} />
        <Draw d="M94 364 V404 M106 364 V404" width={1.6} />
        <Draw d="M254 542 H314 M254 554 H314" width={1.6} />
        <Draw d="M704 542 H764 M704 554 H764" width={1.6} />
        <Draw d="M874 154 V194 M886 154 V194" width={1.6} />
        <Draw d="M430 146 V198 A 52 52 0 0 0 482 146" width={1.7} cap="round" />
      </g>

      <g className={step >= 1 ? "process-layer is-on" : "process-layer"}>
        <Draw d="M348 88 V176 M348 220 V548" width={8} />
        <Draw d="M348 292 H424 M468 292 H880" width={8} />
        <Draw d="M640 88 V156 M640 200 V404 M640 448 V548" width={8} />
        <Draw d="M348 176 H308 A 44 44 0 0 0 348 220" width={1.6} cap="round" />
        <Draw d="M424 292 V336 A 44 44 0 0 0 468 292" width={1.6} cap="round" />
        <Draw d="M640 156 H684 A 44 44 0 0 1 640 200" width={1.6} cap="round" />
        <Draw d="M640 404 H684 A 44 44 0 0 1 640 448" width={1.6} cap="round" />
      </g>

      <g
        className={`process-dims ${step >= 2 ? "process-layer is-on" : "process-layer"}`}
      >
        <Draw d="M100 58 H430 M550 58 H880" width={1} />
        <Draw d="M100 48 V68 M880 48 V68" width={1} />
        <Draw d="M64 88 V300 M64 380 V548" width={1} />
        <Draw d="M54 88 H74 M54 548 H74" width={1} />
        <Draw d="M916 88 V250 M916 360 V548" width={1} />
        <Draw d="M906 88 H926 M906 548 H926" width={1} />
        <Draw d="M100 592 H200 M280 592 H348" width={1} />
        <Draw d="M348 592 H460 M530 592 H640" width={1} />
        <Draw d="M640 592 H740 M820 592 H880" width={1} />
        <text className="no-draw process-dim" x="490" y="52" textAnchor="middle">
          9 850
        </text>
        <text
          className="no-draw process-dim"
          x="48"
          y="340"
          textAnchor="middle"
          transform="rotate(-90 48 340)"
        >
          6 200
        </text>
        <text
          className="no-draw process-dim"
          x="932"
          y="340"
          textAnchor="middle"
          transform="rotate(90 932 340)"
        >
          4 800
        </text>
        <text className="no-draw process-dim" x="224" y="586" textAnchor="middle">
          3 400
        </text>
        <text className="no-draw process-dim" x="494" y="586" textAnchor="middle">
          2 450
        </text>
        <text className="no-draw process-dim" x="760" y="586" textAnchor="middle">
          3 600
        </text>
      </g>

      <g className={step >= 2 ? "process-layer is-on" : "process-layer"}>
        <text className="no-draw process-label" textAnchor="middle">
          <tspan x="214" y="328">Obývacia</tspan>
          <tspan x="214" dy="1.15em">izba</tspan>
        </text>
        <text className="no-draw process-label" x="478" y="424" textAnchor="middle">
          Kuchyňa
        </text>
        <text className="no-draw process-label" x="760" y="186" textAnchor="middle">
          Kúpeľňa
        </text>
        <text className="no-draw process-label" x="790" y="348" textAnchor="middle">
          Spálňa
        </text>
      </g>

      <g className={step >= 3 ? "process-layer is-on" : "process-layer"}>
        <circle className="no-draw" cx="210" cy="196" r="26" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="194" y="156" width="32" height="14" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <rect className="no-draw" x="194" y="222" width="32" height="14" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <rect className="no-draw" x="164" y="180" width="14" height="32" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <rect className="no-draw" x="242" y="180" width="14" height="32" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />

        <rect className="no-draw" x="136" y="446" width="176" height="76" rx="10" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="136" y="446" width="22" height="76" rx="8" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="290" y="446" width="22" height="76" rx="8" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="164" y="456" width="54" height="24" rx="3" fill="#E4EBE3" stroke="currentColor" strokeWidth="1.5" />
        <rect className="no-draw" x="224" y="456" width="58" height="24" rx="3" fill="#E4EBE3" stroke="currentColor" strokeWidth="1.5" />
        <path className="no-draw" d="M160 494 H310 M214 482 V514" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

        <rect className="no-draw" x="366" y="480" width="258" height="50" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="582" y="346" width="42" height="134" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <path className="no-draw" d="M418 480 V530 M470 480 V530 M540 480 V530 M582 398 H624 M582 450 H624" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect className="no-draw" x="382" y="492" width="42" height="26" rx="2" fill="var(--background)" stroke="currentColor" strokeWidth="1.6" />
        <circle className="no-draw" cx="394" cy="501" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle className="no-draw" cx="412" cy="501" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle className="no-draw" cx="394" cy="513" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle className="no-draw" cx="412" cy="513" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect className="no-draw" x="476" y="492" width="64" height="26" rx="4" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <rect className="no-draw" x="484" y="498" width="48" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path className="no-draw" d="M508 492 V476 H524" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

        <rect className="no-draw" x="706" y="110" width="150" height="46" rx="20" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="716" y="118" width="130" height="30" rx="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect className="no-draw" x="688" y="210" width="50" height="38" rx="3" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <circle className="no-draw" cx="713" cy="228" r="9" fill="var(--background)" stroke="currentColor" strokeWidth="1.6" />
        <path className="no-draw" d="M713 210 V202 H726" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect className="no-draw" x="808" y="206" width="28" height="14" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />
        <ellipse className="no-draw" cx="822" cy="234" rx="16" ry="18" fill="var(--background)" stroke="currentColor" strokeWidth="1.8" />

        <rect className="no-draw" x="720" y="364" width="138" height="16" rx="2" fill="#42634C" />
        <rect className="no-draw" x="726" y="380" width="126" height="128" fill="var(--background)" stroke="currentColor" strokeWidth="2" />
        <rect className="no-draw" x="736" y="390" width="48" height="26" rx="4" fill="#E4EBE3" stroke="currentColor" strokeWidth="1.5" />
        <rect className="no-draw" x="794" y="390" width="48" height="26" rx="4" fill="#E4EBE3" stroke="currentColor" strokeWidth="1.5" />
        <path className="no-draw" d="M726 430 H852" fill="none" stroke="currentColor" strokeWidth="1.6" />

        <circle className="no-draw" cx="944" cy="112" r="18" fill="#42634C" stroke="none" />
        <path
          d="M934 112 L942 121 L956 104"
          pathLength={1}
          fill="none"
          stroke="#F5F4EF"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Spolupraca() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const ignoreClick = useRef(false);
  const [step, setStep] = useState(0);

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!window.matchMedia(DESKTOP).matches) return;
    const next = stepFromTrack(track);
    setStep((prev) => (prev === next ? prev : next));
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.dataset.enhanced = "true";
    syncFromScroll();
  }, [syncFromScroll]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [syncFromScroll]);

  const select = (index: number) => {
    const next = Math.max(0, Math.min(STEPS.length - 1, index));
    const desktop = window.matchMedia(DESKTOP).matches;
    const track = trackRef.current;
    if (!desktop || !track) {
      setStep(next);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = scrollTopForStep(track, next);
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    if (reduced) html.style.scrollBehavior = "auto";
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    if (reduced) {
      html.style.scrollBehavior = previous;
      setStep(next);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (window.matchMedia(DESKTOP).matches || event.touches.length !== 1) return;
    const touch = event.touches[0];
    swipeRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start || window.matchMedia(DESKTOP).matches) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 42 || Math.abs(dx) <= Math.abs(dy)) return;
    ignoreClick.current = true;
    window.setTimeout(() => {
      ignoreClick.current = false;
    }, 400);
    select(step + (dx < 0 ? 1 : -1));
  };

  const onTouchCancel = () => {
    swipeRef.current = null;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (window.matchMedia(DESKTOP).matches) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const focused = controlRefs.current.findIndex((node) => node === document.activeElement);
    const base = focused >= 0 ? focused : step;
    const next = Math.max(0, Math.min(STEPS.length - 1, base + (event.key === "ArrowRight" ? 1 : -1)));
    select(next);
    controlRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section
      ref={rootRef}
      id="spolupraca"
      aria-labelledby="spolupraca-title"
      className="overflow-x-clip border-t border-[#42634C]/10 bg-background py-16 lg:py-24"
    >
      <style>{`
        .scene-track { position: relative; }
        .scene { position: relative; }
        .plan-frame svg {
          display: block;
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: 34vh;
          margin-inline: auto;
        }
        .process-layer { opacity: 0; transition: opacity 320ms ease; }
        .process-layer.is-on { opacity: 1; }
        .process-layer path { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .process-layer.is-on path {
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 680ms ease;
        }
        .process-layer .no-draw { stroke-dasharray: none; stroke-dashoffset: 0; }
        .process-dim, .process-label {
          fill: #42634c;
          stroke: none;
          font-family: inherit;
        }
        .process-dim { font-size: 18px; }
        .process-label { font-size: 36px; }
        .process-control:focus-visible,
        .process-cta:focus-visible,
        .process-step:focus-visible {
          outline: 2px solid #42634c;
          outline-offset: 3px;
        }
        .process-cta:focus-visible {
          outline: 2px solid #214B38;
          outline-offset: 4px;
        }
        #spolupraca[data-enhanced="true"] .process-step { display: none; }
        #spolupraca[data-enhanced="true"] .process-step.is-active {
          display: flex;
          animation: process-in 280ms ease;
        }
        @keyframes process-in { from { opacity: 0; } to { opacity: 1; } }
        @media (min-width: 1024px) {
          .scene-track { height: calc(100svh - 81px + 180vh); }
          .scene {
            position: sticky;
            top: 81px;
            display: grid;
            grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
            align-items: center;
            gap: 4rem;
            max-height: calc(100svh - 81px - 16px);
          }
          .plan-frame svg {
            width: 100%;
            max-height: calc(100svh - 81px - 176px);
          }
          .process-label { font-size: 20px; }
          .text-col { min-height: 16rem; }
        }
        @media (max-width: 1023px) {
          .process-dims, .process-fine { display: none; }
          .scene { touch-action: pan-y; }
          .text-col { margin-top: 1rem; }
          .process-mobile-note { margin-top: 22px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .process-layer,
          .process-layer path,
          .process-step.is-active { transition: none; animation: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]">
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#42634C]/30 sm:w-14" aria-hidden="true" />
            <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38]">
              AKO PREBIEHA SPOLUPRÁCA
            </p>
            <span className="h-px w-8 bg-[#42634C]/30 sm:w-14" aria-hidden="true" />
          </div>
          <h2
            id="spolupraca-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Dobrý výsledok začína{" "}
            <span className="text-[#42634C]">dobrým plánom.</span>
          </h2>
        </header>

        <div ref={trackRef} className="scene-track mt-10 lg:mt-14">
          <div
            className="scene"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
            onKeyDown={onKeyDown}
          >
            <div className="plan-col">
              <div className="plan-frame">
                <FloorPlan step={step} />
              </div>
              <div
                role="group"
                aria-label="Kroky spolupráce"
                className="relative mx-auto mt-4 grid max-w-xl grid-cols-4 gap-1"
              >
                <span
                  className="pointer-events-none absolute top-[11px] right-[12%] left-[12%] h-px bg-[#42634C]/25"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute top-[11px] left-[12%] h-px bg-[#42634C]"
                  style={{ width: `${(step / 3) * 76}%` }}
                  aria-hidden="true"
                />
                {STEPS.map((item, index) => {
                  const active = step === index;
                  const done = step > index;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => {
                        controlRefs.current[index] = node;
                      }}
                      type="button"
                      className="process-control relative flex flex-col items-center gap-1 bg-transparent px-1 pt-0 text-center"
                      aria-current={active ? "step" : undefined}
                      aria-controls={item.id}
                      aria-label={`Krok ${item.kicker}`}
                      onClick={() => {
                        if (ignoreClick.current) {
                          ignoreClick.current = false;
                          return;
                        }
                        select(index);
                      }}
                    >
                      <span
                        className={`process-mark grid size-[22px] place-items-center rounded-full border ${
                          active || done
                            ? "border-[#42634C] bg-[#42634C] text-[#F5F4EF]"
                            : "border-[#42634C]/40 bg-background"
                        }`}
                        aria-hidden="true"
                      >
                        {done ? (
                          <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M2.5 6.2 4.8 8.4 9.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : active ? (
                          <span className="size-1.5 rounded-full bg-[#F5F4EF]" />
                        ) : null}
                      </span>
                      <span
                        className={`text-[11px] tracking-wide ${
                          active
                            ? "font-semibold text-[#2C4A38]"
                            : done
                              ? "font-semibold text-[#42634C]"
                              : "font-medium text-[#52685C]"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={`text-[11px] leading-tight sm:text-xs ${
                          active
                            ? "font-semibold text-[#2A2E2C]"
                            : done
                              ? "font-medium text-[#42634C]"
                              : "font-medium text-[#52685C]"
                        }`}
                      >
                        <span className="lg:hidden">{item.short}</span>
                        <span className="hidden lg:inline">{item.control}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ol className="text-col">
              {STEPS.map((item, index) => (
                <li
                  key={item.id}
                  id={item.id}
                  data-step={index}
                  className={`process-step flex flex-col justify-center ${step === index ? "is-active" : ""}`}
                >
                  <p className="text-sm font-semibold tracking-[0.08em] text-[#42634C]">
                    {item.kicker}
                  </p>
                  <h3 className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-[#2A2E2C]/80">
                    {item.text}
                  </p>
                  {index === 3 ? (
                    <a
                      href="#kontakt"
                      className="process-cta mt-6 inline-flex min-h-[52px] w-fit items-center justify-center rounded-lg bg-[#214B38] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#183528] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#214B38]"
                    >
                      Dohodnúť obhliadku
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="process-mobile-note text-center lg:hidden">
              <p className="text-sm font-medium tabular-nums tracking-[0.08em] text-[#42634C]" aria-live="polite">
                {step + 1} / {STEPS.length}
              </p>
              <p className="mt-1.5 text-sm leading-5 text-[#52685C]">
                {step === STEPS.length - 1
                  ? "← Potiahnite na predchádzajúci krok"
                  : "← Potiahnite a pozrite si ďalší krok →"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

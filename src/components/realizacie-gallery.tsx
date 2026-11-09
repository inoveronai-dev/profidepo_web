"use client";

import { useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react";
import { REALIZACIE_PREVIEW, realizacieShots, thumbShape, type RealizaciaShot } from "@/lib/realizacie";

export function Realizacie() {
  const [visible, setVisible] = useState(REALIZACIE_PREVIEW);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const scrollLock = useRef<number | null>(null);
  const [columns, setColumns] = useState(4);
  const hidden = realizacieShots.length - REALIZACIE_PREVIEW;
  const packed = packColumns(realizacieShots, visible, columns);

  useLayoutEffect(() => {
    const apply = () => {
      const width = window.innerWidth;
      setColumns(width >= 1024 ? 4 : width < 360 ? 1 : 2);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useLayoutEffect(() => {
    if (scrollLock.current == null) return;
    window.scrollTo(0, scrollLock.current);
    scrollLock.current = null;
  }, [visible]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      closeRef.current?.focus();
    } else if (dialog.open) {
      dialog.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const total = realizacieShots.length;
    const ahead = realizacieShots[(index + 1) % total];
    const behind = realizacieShots[(index - 1 + total) % total];
    if (ahead) {
      const image = new Image();
      image.src = ahead.src;
    }
    if (behind) {
      const image = new Image();
      image.src = behind.src;
    }
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (value + 1) % realizacieShots.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => (value - 1 + realizacieShots.length) % realizacieShots.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const restoreFocus = () => {
    triggerRef.current?.focus();
  };

  const close = () => setOpen(false);

  const openAt = (shotIndex: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setIndex(shotIndex);
    setOpen(true);
  };

  const step = (delta: number) => {
    setIndex((value) => (value + delta + realizacieShots.length) % realizacieShots.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    step(dx < 0 ? 1 : -1);
  };

  const shot = realizacieShots[index];

  return (
    <section aria-labelledby="realizacie-title" className="bg-background">
      <style>{`
        .realizacie-pack {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .realizacie-col {
          display: flex;
          min-width: 0;
          flex: 1;
          flex-direction: column;
          gap: 14px;
        }
        .realizacie-frame {
          position: relative;
          display: block;
          width: 100%;
          height: auto;
          margin: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 16px;
          background: transparent;
          font-size: 0;
          line-height: 0;
        }
        .realizacie-zoom {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          transform: none;
        }
        @media (min-width: 1024px) {
          .realizacie-pack,
          .realizacie-col { gap: 22px; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .realizacie-in .realizacie-zoom {
            animation: realizacie-photo-in 420ms ease;
          }
          .realizacie-zoom { transition: transform 700ms ease; }
        }
        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
          .realizacie-frame:hover .realizacie-zoom,
          .realizacie-frame:focus-visible .realizacie-zoom {
            transform: scale(1.025);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .realizacie-in .realizacie-zoom { animation: none; }
          .realizacie-zoom { transition: none; transform: none; opacity: 1; }
        }
        @keyframes realizacie-photo-in {
          from { transform: translateY(6px); }
          to { transform: none; }
        }
        .realizacie-lightbox {
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
        }
        .realizacie-lightbox[open] {
          position: fixed;
          inset: 0;
          display: flex;
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
        }
        .realizacie-lightbox::backdrop {
          background: rgba(22, 26, 24, 0.86);
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-6 lg:px-[72px] lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
            Ukážky našej práce
          </p>
          <h2
            id="realizacie-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl"
          >
            Naše realizácie.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
            Pozrite si premeny bytov, kúpeľní a ďalších priestorov.
          </p>
        </div>

        <div className="realizacie-pack mt-8 lg:mt-10">
          {packed.map((column, columnIndex) => (
            <div className="realizacie-col" key={columnIndex} style={{ flex: `${column.weight} 1 0px` }}>
              {column.items.map(({ shot, index }) => {
                const frame = thumbShape(shot);
                return (
                  <div key={shot.src} className="realizacie-item">
                    <button
                      type="button"
                      onClick={(event) => openAt(index, event.currentTarget)}
                      className={`realizacie-frame focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]${index >= REALIZACIE_PREVIEW ? " realizacie-in" : ""}`}
                      style={{ paddingTop: `${(frame.height / frame.width) * 100}%` }}
                      aria-label={`Otvoriť fotografiu: ${shot.alt}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={frame.width}
                        height={frame.height}
                        loading="lazy"
                        decoding="async"
                        className="realizacie-zoom"
                        style={{ objectPosition: shot.focus ?? "center" }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {visible < realizacieShots.length ? (
          <div className="mt-4 flex justify-center lg:mt-2">
            <button
              type="button"
              onClick={() => {
                scrollLock.current = window.scrollY;
                setVisible(realizacieShots.length);
              }}
              className="inline-flex h-12 items-center rounded-lg border border-[#42634C] px-5 text-[15px] font-medium text-[#42634C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]"
            >
              Zobraziť ďalšie fotografie ({hidden})
            </button>
          </div>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="realizacie-lightbox text-white"
        aria-label="Fotografie realizácií"
        onClose={() => {
          setOpen(false);
          restoreFocus();
        }}
      >
        {shot ? (
          <div className="flex h-full min-h-0 w-full flex-col">
            <div className="flex items-center justify-end px-3 py-3 sm:px-5">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center rounded-lg px-3 text-[15px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Zavrieť
              </button>
            </div>
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Predchádzajúca fotografia"
                className="absolute left-1 flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
              >
                <Chevron direction="left" />
              </button>
              <LightboxPhoto shot={shot} />
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Ďalšia fotografia"
                className="absolute right-1 flex h-11 w-11 items-center justify-center rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
              >
                <Chevron direction="right" />
              </button>
            </div>
            <p className="py-4 text-center text-sm tabular-nums tracking-wide" aria-live="polite">
              {index + 1} / {realizacieShots.length}
            </p>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

function unitHeight(shot: RealizaciaShot) {
  const frame = thumbShape(shot);
  return frame.height / frame.width;
}

function packColumns(shots: readonly RealizaciaShot[], count: number, columns: number) {
  const previewCount = Math.min(REALIZACIE_PREVIEW, count, shots.length);
  const preview = Array.from({ length: previewCount }, (_, index) => index);
  const grouped = groupPreview(shots, preview, columns);
  const rawWeights = grouped.map((column) => {
    const sum = column.reduce((total, index) => total + unitHeight(shots[index]), 0);
    return sum > 0 ? 1 / sum : 1;
  });
  const smallest = Math.min(...rawWeights);
  const weights = rawWeights.map((weight) => weight / smallest);
  const gap = columns >= 4 ? 22 : 14;
  const available = columns >= 4 ? 1230 : columns === 2 ? 321 : 320;
  const weightSum = weights.reduce((total, weight) => total + weight, 0) || 1;
  const widths = weights.map((weight) => (available * weight) / weightSum);
  const heights = grouped.map((column, columnIndex) => {
    const tiles = column.reduce((total, index) => total + widths[columnIndex] * unitHeight(shots[index]), 0);
    return tiles + Math.max(0, column.length - 1) * gap;
  });
  const cols = grouped.map((column) => column.map((index) => ({ shot: shots[index], index })));

  if (count > previewCount) {
    const later = Array.from({ length: Math.min(count, shots.length) - previewCount }, (_, offset) => previewCount + offset);
    later.sort((a, b) => unitHeight(shots[b]) - unitHeight(shots[a]) || a - b);
    for (const index of later) {
      const unit = unitHeight(shots[index]);
      let target = 0;
      let best = Number.POSITIVE_INFINITY;
      for (let column = 0; column < columns; column += 1) {
        const next = heights[column] + widths[column] * unit + gap;
        if (next < best) {
          best = next;
          target = column;
        }
      }
      cols[target].push({ shot: shots[index], index });
      heights[target] = best;
    }
    balanceSuffix(cols, widths, gap, previewCount);
  }

  return cols.map((items, columnIndex) => ({ items, weight: weights[columnIndex] ?? 1 }));
}

function pixelHeight(items: { shot: RealizaciaShot }[], width: number, gap: number) {
  if (items.length === 0) return 0;
  const tiles = items.reduce((total, item) => total + width * unitHeight(item.shot), 0);
  return tiles + (items.length - 1) * gap;
}

function balanceSuffix(
  cols: { shot: RealizaciaShot; index: number }[][],
  widths: number[],
  gap: number,
  previewCount: number,
) {
  const spreadOf = () => {
    const heights = cols.map((column, columnIndex) => pixelHeight(column, widths[columnIndex], gap));
    return Math.max(...heights) - Math.min(...heights);
  };
  let current = spreadOf();
  let improved = true;
  let guard = 0;
  while (improved && guard < 40) {
    improved = false;
    guard += 1;
    for (let from = 0; from < cols.length; from += 1) {
      for (let itemIndex = 0; itemIndex < cols[from].length; itemIndex += 1) {
        if (cols[from][itemIndex].index < previewCount) continue;
        for (let to = 0; to < cols.length; to += 1) {
          if (from === to) continue;
          const [item] = cols[from].splice(itemIndex, 1);
          cols[to].push(item);
          const next = spreadOf();
          if (next + 0.01 < current) {
            current = next;
            improved = true;
          } else {
            cols[to].pop();
            cols[from].splice(itemIndex, 0, item);
          }
        }
      }
    }
    for (let left = 0; left < cols.length; left += 1) {
      for (let right = left + 1; right < cols.length; right += 1) {
        for (let leftIndex = 0; leftIndex < cols[left].length; leftIndex += 1) {
          if (cols[left][leftIndex].index < previewCount) continue;
          for (let rightIndex = 0; rightIndex < cols[right].length; rightIndex += 1) {
            if (cols[right][rightIndex].index < previewCount) continue;
            const leftItem = cols[left][leftIndex];
            const rightItem = cols[right][rightIndex];
            cols[left][leftIndex] = rightItem;
            cols[right][rightIndex] = leftItem;
            const next = spreadOf();
            if (next + 0.01 < current) {
              current = next;
              improved = true;
            } else {
              cols[left][leftIndex] = leftItem;
              cols[right][rightIndex] = rightItem;
            }
          }
        }
      }
    }
  }
}

function groupPreview(shots: readonly RealizaciaShot[], indices: number[], columns: number) {
  const cols: number[][] = Array.from({ length: columns }, () => []);
  if (columns <= 1) {
    cols[0] = [...indices];
    return cols;
  }
  const portraits = indices.filter((index) => unitHeight(shots[index]) > 1.05);
  const squares = indices.filter((index) => unitHeight(shots[index]) <= 1.05 && unitHeight(shots[index]) >= 0.9);
  const landscapes = indices.filter((index) => unitHeight(shots[index]) < 0.9);
  if (columns === 2) {
    const deal = (group: number[]) => group.forEach((index, order) => cols[order % 2].push(index));
    deal(portraits);
    deal(squares);
    deal(landscapes);
    return cols;
  }
  const spareLandscapes = [...landscapes];
  const tops: number[] = [];
  const portraitQueue = [...portraits];
  const squareQueue = [...squares];
  while (portraitQueue.length || squareQueue.length) {
    if (squareQueue.length) tops.push(squareQueue.shift() as number);
    if (portraitQueue.length) tops.push(portraitQueue.shift() as number);
  }
  tops.forEach((index, order) => {
    const column = order % columns;
    cols[column].push(index);
    const landscape = spareLandscapes.shift();
    if (landscape != null) cols[column].push(landscape);
  });
  spareLandscapes.forEach((index, order) => cols[order % columns].push(index));
  return cols;
}

function LightboxPhoto({ shot }: { shot: RealizaciaShot }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      className="max-h-full max-w-full object-contain"
    />
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      {direction === "left" ? <path d="M14.5 5.5 8 12l6.5 6.5" /> : <path d="M9.5 5.5 16 12l-6.5 6.5" />}
    </svg>
  );
}

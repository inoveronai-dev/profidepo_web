"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { FacebookIcon, InstagramIcon } from "@/components/social";
import { reconstructionShots, type ReconstructionShot } from "@/lib/reconstruction-gallery";
import { social } from "@/lib/site";

type Frame = "portrait" | "landscape";

/** Six different rooms. Thumbnail crops only; the lightbox shows the whole file. */
const preview: { index: number; frame: Frame; position: string }[] = [
  { index: 2, frame: "portrait", position: "center 42%" },
  { index: 7, frame: "landscape", position: "center 45%" },
  { index: 4, frame: "portrait", position: "center 46%" },
  { index: 6, frame: "landscape", position: "center center" },
  { index: 8, frame: "portrait", position: "center 38%" },
  { index: 5, frame: "landscape", position: "center center" },
];

const rowOne = [
  { ...preview[1]!, li: "col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1", frameClass: "aspect-[3/2] lg:aspect-[4/3]" },
  { ...preview[0]!, li: "lg:col-start-1 lg:row-start-1", frameClass: "aspect-[3/4]" },
  { ...preview[2]!, li: "lg:col-start-3 lg:row-start-1", frameClass: "aspect-[3/4]" },
];
const rowTwo = [
  { ...preview[3]!, li: "col-span-2 lg:col-span-1", frameClass: "aspect-[3/2] lg:aspect-[4/3]" },
  { ...preview[4]!, li: "", frameClass: "aspect-[3/4]" },
  { ...preview[5]!, li: "", frameClass: "aspect-[3/4] lg:aspect-[4/3]" },
];

function pad(value: number) {
  return `${value} / ${reconstructionShots.length}`;
}

export function ReconstructionGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const step = useCallback((delta: number) => {
    setIndex((current) => (current + delta + reconstructionShots.length) % reconstructionShots.length);
  }, []);

  const openAt = (next: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setIndex(next);
    setOpen(true);
  };

  const restoreFocus = () => {
    const trigger = triggerRef.current;
    window.setTimeout(() => trigger?.focus(), 0);
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      if (dialog.open) dialog.close();
    };
  }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const total = reconstructionShots.length;
    const ahead = reconstructionShots[(index + 1) % total];
    const behind = reconstructionShots[(index - 1 + total) % total];
    if (ahead?.src) {
      const image = new Image();
      image.src = ahead.src;
    }
    if (behind?.src) {
      const image = new Image();
      image.src = behind.src;
    }
  }, [open, index]);

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

  const shot = reconstructionShots[index];

  return (
    <>
      <style>{`
        .lightbox {
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
        }
        .lightbox[open] {
          position: fixed;
          inset: 0;
          display: flex;
          width: 100%;
          height: 100%;
          max-width: none;
          max-height: none;
        }
        .lightbox::backdrop {
          background: rgba(22, 26, 24, 0.86);
        }
      `}</style>

      <div className="mt-8 flex flex-col gap-3 sm:gap-4 lg:mt-10 lg:gap-4">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,5.33fr)_minmax(0,3fr)] lg:gap-4">
          {rowOne.map((item) => (
            <Thumb key={item.index} item={item} onOpen={openAt} />
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,5.33fr)_minmax(0,3fr)_minmax(0,5.33fr)] lg:gap-4">
          {rowTwo.map((item) => (
            <Thumb key={item.index} item={item} onOpen={openAt} />
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 text-center lg:mt-7">
        <button
          type="button"
          onClick={(event) => openAt(0, event.currentTarget)}
          className="text-[15px] font-medium text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]"
        >
          Zobraziť všetky fotografie ({reconstructionShots.length})
        </button>
        <p className="max-w-xl text-base text-[#2A2E2C]/80">
          Ďalšie ukážky nájdete na našom Instagrame a Facebooku.
        </p>
        <div className="flex gap-1">
          <a
            href={social.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.instagram.name}
            className="social-link inline-flex size-10 items-center justify-center rounded-full text-[#42634C]"
          >
            <InstagramIcon className="size-[22px]" />
          </a>
          <a
            href={social.facebook.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.facebook.name}
            className="social-link inline-flex size-10 items-center justify-center rounded-full text-[#42634C]"
          >
            <FacebookIcon className="size-[22px]" />
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox text-white"
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="max-h-full max-w-full object-contain"
              />
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
              {pad(index + 1)}
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function Thumb({
  item,
  onOpen,
}: {
  item: { index: number; frame: Frame; position: string; li: string; frameClass: string };
  onOpen: (index: number, trigger: HTMLElement) => void;
}) {
  const shot: ReconstructionShot | undefined = reconstructionShots[item.index];
  if (!shot) return null;
  return (
    <li className={item.li || undefined}>
      <button
        type="button"
        onClick={(event) => onOpen(item.index, event.currentTarget)}
        className={`photo-frame photo-reveal block w-full overflow-hidden rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C] ${item.frameClass}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className="photo-zoom h-full w-full object-cover"
          style={{ objectPosition: item.position }}
        />
      </button>
    </li>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      {direction === "left" ? <path d="M14.5 5.5 8 12l6.5 6.5" /> : <path d="M9.5 5.5 16 12l-6.5 6.5" />}
    </svg>
  );
}

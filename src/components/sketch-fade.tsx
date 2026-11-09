"use client";

import { useLayoutEffect, useRef } from "react";

export function SketchFade({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          el.classList.add("is-in");
          observer?.disconnect();
        },
        { threshold: 0.2 },
      );
      el.dataset.animate = "true";
      observer.observe(el);
    } catch {
      el.dataset.animate = "false";
      el.classList.add("is-in");
    }
    return () => observer?.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      className="sketch-fade h-auto w-full bg-transparent object-contain mix-blend-darken"
    />
  );
}

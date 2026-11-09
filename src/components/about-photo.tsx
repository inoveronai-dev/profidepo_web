"use client";

import { useLayoutEffect, useRef } from "react";

export function AboutPhoto({
  src,
  alt,
  position,
}: {
  src: string;
  alt: string;
  position: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
        { threshold: 0.22 },
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
    <div ref={ref} className="photo-enter">
      <div className="onas-frame">
        <img
          src={src}
          alt={alt}
          width={1254}
          height={1254}
          decoding="async"
          className="onas-zoom"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

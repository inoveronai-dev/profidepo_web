"use client";

import { useLayoutEffect } from "react";

let lastPop = 0;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    lastPop = performance.now();
  });
}

/** Open a subpage at the top. Back and Forward within a moment of popstate keep their position. */
export function PinPageTop() {
  useLayoutEffect(() => {
    if (performance.now() - lastPop < 1200) return;
    if (window.location.hash) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    void root.offsetHeight;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
  }, []);

  return null;
}

export const CennikPageScroll = PinPageTop;

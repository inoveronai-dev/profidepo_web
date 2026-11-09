"use client";

import { useLayoutEffect } from "react";

let restoreHistory = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    restoreHistory = true;
  });
}

/** Pin /o-nas to the document top on a fresh open. Back and Forward keep the browser entry. */
export function AboutPageScroll() {
  useLayoutEffect(() => {
    if (restoreHistory) {
      restoreHistory = false;
      return;
    }
    if (window.location.hash) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    void root.offsetHeight;
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
    return () => {
      restoreHistory = false;
    };
  }, []);

  return null;
}

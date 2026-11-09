"use client";

import { useLayoutEffect } from "react";

type IntroWindow = Window & {
  __profidepoBoot?: () => void;
};

export function PreloaderCleanup() {
  useLayoutEffect(() => {
    const intro = window as IntroWindow;
    intro.__profidepoBoot?.();

    const drop = () => {
      const el = document.getElementById("profidepo-intro");
      if (!el?.classList.contains("is-done")) return;
      el.remove();
    };

    drop();
    const el = document.getElementById("profidepo-intro");
    if (!el) return;

    const observer = new MutationObserver(drop);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return null;
}

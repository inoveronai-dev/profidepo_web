"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function hashKey() {
  return `${window.location.pathname}${window.location.hash}`;
}

function targetFromHash() {
  const hash = window.location.hash;
  if (!hash || hash === "#") return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

function aligned(el: HTMLElement) {
  const margin = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.abs(el.getBoundingClientRect().top - margin) <= 3;
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const raw = link.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || url.hash) return;
      const returnKey =
        url.pathname === "/o-nas"
          ? "profidepo-about-return"
          : url.pathname === "/cennik"
            ? "profidepo-cennik-return"
            : url.pathname === "/sluzby/kupelne-a-bytove-jadra"
              ? "profidepo-bath-return"
              : null;
      if (!returnKey) return;
      sessionStorage.setItem(
        returnKey,
        JSON.stringify({
          path: window.location.pathname + window.location.search,
          y: window.scrollY,
        }),
      );
    };
    const restoreSaved = (key: string) => {
      const raw = sessionStorage.getItem(key);
      if (!raw) return;
      let saved: { path: string; y: number };
      try {
        saved = JSON.parse(raw) as { path: string; y: number };
      } catch {
        return;
      }
      if (`${window.location.pathname}${window.location.search}` !== saved.path) return;
      sessionStorage.removeItem(key);
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      const apply = () => {
        root.style.scrollBehavior = "auto";
        void root.offsetHeight;
        window.scrollTo(0, saved.y);
      };
      apply();
      requestAnimationFrame(() => {
        apply();
        root.style.scrollBehavior = previous;
      });
    };
    const restoreReturn = () => {
      restoreSaved("profidepo-about-return");
      restoreSaved("profidepo-cennik-return");
      restoreSaved("profidepo-bath-return");
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", restoreReturn);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", restoreReturn);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let started = false;
    const run = () => {
      if (cancelled || started) return;
      const handled = (window as Window & { __profidepoHashHandled?: string }).__profidepoHashHandled;
      if (handled === hashKey()) {
        started = true;
        return;
      }
      const el = targetFromHash();
      if (!el) return;
      started = true;
      if (!aligned(el)) el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
    };
    run();
    const frame = requestAnimationFrame(run);
    const timer = window.setTimeout(run, 180);
    const late = window.setTimeout(() => {
      if (cancelled) return;
      const el = targetFromHash();
      if (!el || aligned(el) || window.scrollY > 8) return;
      el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
    }, 420);
    const onHash = () => {
      const el = targetFromHash();
      if (!el || aligned(el)) return;
      el.scrollIntoView({ block: "start", behavior: scrollBehavior() });
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.clearTimeout(late);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname]);

  return null;
}

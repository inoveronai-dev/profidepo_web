import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HashScroll } from "@/components/hash-scroll";
import { Preloader } from "@/components/preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProfiDepo — Rekonštrukcie bytov a kúpeľní",
  description:
    "Od prvej predstavy až po hotový priestor. Rekonštrukcie a dokončovacie práce s ProfiDepo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sk" className={`${inter.className} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try { if ("scrollRestoration" in history) history.scrollRestoration = "manual"; } catch (e) {}
  var navType = "navigate";
  try {
    var entry = performance.getEntriesByType("navigation")[0];
    if (entry && entry.type) navType = entry.type;
  } catch (e) {}
  if (navType === "back_forward") return;
  var keepHash = false;
  try {
    if (location.hash && navType !== "reload" && document.referrer) {
      var ref = new URL(document.referrer);
      keepHash = ref.origin === location.origin;
    }
  } catch (e) {}
  try {
    if (location.hash && !keepHash) history.replaceState(history.state, "", location.pathname + location.search);
  } catch (e) {}
  function pinTop() {
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }
  if (keepHash) {
    var go = function () {
      var id = "";
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
      var el = document.getElementById(id);
      if (!el) return;
      var reduce = false;
      try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
      try { window.__profidepoHashHandled = location.pathname + location.hash; } catch (e) {}
      el.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
    else go();
    return;
  }
  try { pinTop(); } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-[#2A2E2C]">
        <Preloader />
        <HashScroll />
        {children}
      </body>
    </html>
  );
}

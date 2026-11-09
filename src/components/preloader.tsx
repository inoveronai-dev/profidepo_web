import { LogoMark } from "@/components/logo";
import { PreloaderCleanup } from "@/components/preloader-cleanup";

const INTRO_CSS = `
#profidepo-intro {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 24px;
  background: var(--background);
  color: #2C4A37;
  text-align: center;
  animation: profidepo-intro-fallback 1ms linear 2.4s forwards;
}
@keyframes profidepo-intro-fallback {
  to {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    display: none;
  }
}
#profidepo-intro.is-leaving {
  animation: none;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms linear;
}
#profidepo-intro.is-done {
  animation: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  display: none;
}
.profidepo-lockup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profidepo-mark {
  display: block;
  width: 64px;
  height: 64px;
}
.profidepo-name {
  margin: 20px 0 0;
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.025em;
}
.profidepo-slogan {
  margin: 12px 0 0;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 500;
}
.profidepo-track {
  width: 64px;
  height: 2px;
  margin-top: 24px;
  overflow: hidden;
  background: rgba(44, 74, 55, 0.2);
}
.profidepo-line {
  width: 24px;
  height: 100%;
  background: #2C4A37;
  animation: profidepo-line 1.15s ease-in-out infinite;
}
@keyframes profidepo-line {
  from { transform: translateX(-130%); }
  to { transform: translateX(280%); }
}
@media (min-width: 640px) {
  .profidepo-name { font-size: 3rem; }
}
@media (prefers-reduced-motion: reduce) {
  .profidepo-line { animation: none; }
  #profidepo-intro.is-leaving { transition: none; }
}
`;

const INTRO_SCRIPT = `
(function () {
  if (window.__profidepoIntro) return;
  window.__profidepoIntro = true;
  var MIN = 800;
  var FAIL = 2000;
  var FADE = 300;
  var SRC = "/photos/obyvacka.png";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ready = false;
  var minElapsed = false;
  var decoding = false;
  var raf = 0;
  var watching = null;

  function prevent(event) {
    event.preventDefault();
  }

  window.__profidepoBoot = function () {
    var el = document.getElementById("profidepo-intro");
    if (!el) return;
    if (el.getAttribute("data-armed") !== "1") {
      el.setAttribute("data-armed", "1");
      el.addEventListener("wheel", prevent, { passive: false });
      el.addEventListener("touchmove", prevent, { passive: false });
    }
    if (window.__profidepoDismissed && !el.classList.contains("is-leaving")) {
      el.classList.add("is-done");
    }
  };

  function beginLeave() {
    if (window.__profidepoDismissed) return;
    window.__profidepoDismissed = true;
    if (raf) cancelAnimationFrame(raf);
    var el = document.getElementById("profidepo-intro");
    if (!el) return;
    if (reduce) {
      el.classList.add("is-done");
      return;
    }
    el.classList.add("is-leaving");
    window.setTimeout(function () {
      var node = document.getElementById("profidepo-intro");
      if (node) node.classList.add("is-done");
    }, FADE);
  }

  function tryDismiss() {
    if (ready && minElapsed) beginLeave();
  }

  function markReady() {
    var img = document.querySelector('#uvod img[src="' + SRC + '"]');
    if (!img || !img.complete || img.naturalWidth <= 0) {
      decoding = false;
      ready = false;
      return;
    }
    ready = true;
    tryDismiss();
  }

  function consider(image) {
    if (ready || decoding) return;
    if (!image || !image.complete || image.naturalWidth <= 0) return;
    decoding = true;
    if (typeof image.decode !== "function") {
      markReady();
      return;
    }
    try {
      image.decode().then(markReady, function () {
        if (image.naturalWidth > 0) markReady();
        else decoding = false;
      });
    } catch (error) {
      if (image.naturalWidth > 0) markReady();
      else decoding = false;
    }
  }

  function onLoad() {
    consider(watching);
  }

  function onError() {}

  function seek() {
    if (window.__profidepoDismissed || ready) return;
    var img = document.querySelector('#uvod img[src="' + SRC + '"]');
    if (img && img !== watching) {
      if (watching) {
        watching.removeEventListener("load", onLoad);
        watching.removeEventListener("error", onError);
      }
      watching = img;
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    }
    if (img) consider(img);
    if (!ready && !window.__profidepoDismissed) {
      raf = requestAnimationFrame(seek);
    }
  }

  window.__profidepoBoot();
  seek();
  requestAnimationFrame(function () {
    window.setTimeout(function () {
      minElapsed = true;
      tryDismiss();
    }, MIN);
    window.setTimeout(beginLeave, FAIL);
  });
})();
`;

export function Preloader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INTRO_CSS }} />
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: "#profidepo-intro{display:none!important}",
          }}
        />
      </noscript>
      <div id="profidepo-intro" suppressHydrationWarning>
        <div className="profidepo-lockup">
          <LogoMark className="profidepo-mark" />
          <p className="profidepo-name">ProfiDepo</p>
          <p className="profidepo-slogan">Nový pohľad na váš domov.</p>
          <div className="profidepo-track" aria-hidden="true">
            <div className="profidepo-line" />
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <PreloaderCleanup />
    </>
  );
}

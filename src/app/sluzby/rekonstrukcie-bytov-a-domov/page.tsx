import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Header } from "@/components/header";
import { ReconstructionGallery } from "@/components/reconstruction-gallery";
import { ScopeGrid } from "@/components/scope-grid";
import { serviceConsultClass, serviceContent, ServiceCrumbs } from "@/components/service-page";
import { SketchFade } from "@/components/sketch-fade";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Rekonštrukcie bytov a domov — ProfiDepo",
  description:
    "Plánujete prerábku celého bytu, úpravu jednotlivých miestností alebo dokončenie holodomu? Rozsah prác prispôsobíme tomu, čo váš priestor potrebuje.",
};

const scope = [
  {
    title: "Búracie a murárske práce",
    text: "Odstránenie pôvodných prvkov a stavebné úpravy priestoru.",
  },
  {
    title: "Elektrické a vodovodné rozvody",
    text: "Výmena alebo úprava rozvodov podľa rozsahu rekonštrukcie.",
  },
  {
    title: "Omietky a maľovanie",
    text: "Úprava povrchov a finálne dokončenie stien.",
  },
  {
    title: "Sadrokartóny",
    text: "Priečky a podhľady podľa potrieb priestoru.",
  },
  {
    title: "Obklady a dlažby",
    text: "Príprava podkladu a pokládka.",
  },
  {
    title: "Podlahy",
    text: "Odstránenie pôvodnej krytiny a položenie novej.",
  },
] as const;

export default function ReconstructionPage() {
  return (
    <>
      <Header />
      <main className="bg-background text-[#2A2E2C]">
        <style>{`
          .sketch-wash {
            position: relative;
            isolation: isolate;
            background-color: var(--background);
          }
          .sketch-bloom {
            position: absolute;
            z-index: 0;
            left: -4px;
            top: -20px;
            width: calc(100% + 8px);
            height: calc(100% + 26px);
            overflow: hidden;
            pointer-events: none;
            background-image: url("/photos/skice/sage-wash.webp");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .sketch-wash .sketch-fade {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
          }
          .sketch-clip {
            position: relative;
            overflow: hidden;
            aspect-ratio: 1448 / 1000;
          }
          @media (min-width: 1024px) {
            .sketch-wash {
              width: 110%;
              margin-right: -10%;
            }
            .sketch-clip {
              aspect-ratio: 1448 / 948;
            }
            .sketch-bloom {
              left: -22px;
              top: -42px;
              width: calc(100% + 10px);
              height: calc(100% + 50px);
            }
          }
          .photo-reveal { opacity: 1; transform: none; }
          .photo-zoom { transform: none; }
          @media (prefers-reduced-motion: no-preference) {
            .photo-reveal {
              animation: recon-photo-in 580ms ease both;
              animation-timeline: view();
              animation-range: entry 8% cover 30%;
            }
            .photo-zoom { transition: transform 700ms ease; }
          }
          @media (hover: hover) and (prefers-reduced-motion: no-preference) {
            .photo-frame:hover .photo-zoom,
            .photo-frame:focus-visible .photo-zoom {
              transform: scale(1.025);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .photo-reveal { animation: none; opacity: 1; transform: none; }
            .photo-zoom { transition: none; transform: none; }
          }
          @keyframes recon-photo-in {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <article>
          <header className={`${serviceContent} pt-5 pb-5 lg:pt-6 lg:pb-4`}>
            <ServiceCrumbs current="Rekonštrukcie bytov a domov" />

            <div className="mt-7 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Rekonštrukcie bytov a domov
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Nový priestor</span>{" "}
                  <span className="whitespace-nowrap lg:block">pre vaše bývanie.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Plánujete prerábku celého bytu, úpravu jednotlivých miestností alebo dokončenie holodomu? Rozsah prác prispôsobíme tomu, čo váš priestor potrebuje.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="sketch-wash min-w-0">
                <div className="sketch-bloom" aria-hidden="true" />
                <div className="sketch-clip">
                  <SketchFade
                    src="/photos/skice/rekonstrukcia-interier.webp"
                    alt="Ilustračný architektonický náčrt interiéru"
                    width={1448}
                    height={1086}
                  />
                </div>
              </div>
            </div>
          </header>

          <section className={`${serviceContent} pb-8 lg:pb-10`} aria-labelledby="rekonstrukcia-celok">
            <h2 id="rekonstrukcia-celok" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Rekonštrukcia ako jeden celok.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Jednotlivé práce na seba nadväzujú. Rozsah prác závisí od konkrétnej rekonštrukcie.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section className="bg-[#CEDBCB]" aria-labelledby="rekonstrukcia-priprava">
            <div className={`${serviceContent} grid items-center gap-5 py-7 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38%)] lg:gap-10 lg:py-8`}>
              <div className="min-w-0">
                <h2 id="rekonstrukcia-priprava" className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]">
                  Dobrá príprava uľahčí <span className="lg:block">celú rekonštrukciu.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/80">
                  Pred začiatkom prejdeme vaše predstavy, možnosti priestoru a nadväznosť jednotlivých prác. Poradíme s riešením aj materiálmi.
                </p>
              </div>
              <figure className="min-w-0">
                <div className="photo-frame photo-reveal overflow-hidden rounded-[10px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photos/priprava/plan.png"
                    alt="Ruky s ceruzkou nad pôdorysom, zvinovací meter a vzorky materiálov"
                    width={1448}
                    height={1086}
                    className="photo-zoom block aspect-[4/3] h-auto w-full object-cover lg:aspect-auto lg:h-[260px] lg:w-full"
                    style={{ objectPosition: "center 40%" }}
                  />
                </div>
                <figcaption className="mt-2 text-[13px] text-[#5C6560]">Ilustračný záber</figcaption>
              </figure>
            </div>
          </section>

          <section className={`${serviceContent} pt-12 pb-6 lg:pt-16 lg:pb-8`} aria-labelledby="rekonstrukcia-ukazky">
            <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
              Ukážky našej práce
            </p>
            <h2 id="rekonstrukcia-ukazky" className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-[2.25rem]">
              Pozrite si výsledky našej práce.
            </h2>
            <ReconstructionGallery />
          </section>

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="rekonstrukcia-vyzva"
              title="Čo by ste chceli zmeniť u vás?"
              text="Ozvite sa nám a dohodnime si obhliadku."
              href="/#kontakt"
              label="Dohodnúť obhliadku"
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

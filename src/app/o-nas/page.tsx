import type { Metadata } from "next";
import Link from "next/link";
import { AboutPageScroll } from "@/components/about-page-scroll";
import { AboutPhoto } from "@/components/about-photo";
import { ContactCta } from "@/components/contact-cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "O nás — ProfiDepo",
  description:
    "Venujeme sa rekonštrukciám bytov, domov a chalúp aj jednotlivým remeselným prácam.",
};

const content =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]";

function LinedHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#2A2E2C] sm:text-2xl">
      <span aria-hidden="true" className="mb-3 block h-px w-10 bg-[#42634C]" />
      {children}
    </h2>
  );
}

function DocEuroIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      <path d="M5.5 3.2h8.2L19 8.4V20.8H5.5z" />
      <path d="M13.5 3.4V8.6H19" />
      <path d="M15.2 11.4a2.7 2.7 0 0 0-2.2-1c-1.8 0-3 1.4-3 3.2s1.2 3.2 3 3.2c.9 0 1.7-.4 2.2-1.1" />
      <path d="M8.2 12.6h4.4" />
      <path d="M8.2 14.8h4.4" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      <circle cx="12" cy="8.2" r="5" />
      <path d="m9.4 8.3 1.7 1.7 3.4-3.5" />
      <path d="M8.6 12.6 7.2 20.4 12 18.2l4.8 2.2-1.4-7.8" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutPageScroll />
      <Header />
      <main className="bg-background text-[#2A2E2C]">
        <style>{`
          .photo-enter { opacity: 1; transform: none; }
          .onas-frame {
            position: relative;
            overflow: hidden;
            border-radius: 16px;
          }
          .onas-zoom {
            display: block;
            width: 100%;
            height: auto;
            transform: none;
          }
          @media (min-width: 1024px) {
            .onas-frame { aspect-ratio: 4 / 3; }
            .onas-zoom {
              position: absolute;
              inset: 0;
              height: 100%;
              object-fit: cover;
            }
          }
          @media (prefers-reduced-motion: no-preference) {
            .photo-enter[data-animate="true"]:not(.is-in) {
              opacity: 0;
              transform: translateY(12px);
            }
            .photo-enter[data-animate="true"].is-in {
              opacity: 1;
              transform: none;
              transition: opacity 600ms ease, transform 600ms ease;
            }
          }
          @media (prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine) {
            .onas-zoom { transition: transform 700ms ease; }
            .onas-frame:hover .onas-zoom { transform: scale(1.025); }
          }
        `}</style>

        <article>
          <div className={`${content} pt-6 pb-10 lg:pt-8 lg:pb-12`}>
            <nav aria-label="Drobčeková navigácia" className="text-sm text-[#2A2E2C]/70">
              <Link
                href="/"
                className="text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]"
              >
                Úvod
              </Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">O nás</span>
            </nav>

            <div className="mx-auto mt-6 max-w-3xl text-center">
              <p className="text-[17px] font-semibold tracking-[0.08em] text-[#42634C] uppercase sm:text-[18px] lg:text-[20px] lg:tracking-[0.06em]">
                O nás
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#2A2E2C] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Za výsledkom stoja ľudia.
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                Venujeme sa rekonštrukciám bytov, domov a chalúp aj jednotlivým remeselným prácam.
              </p>
              <section className="mt-8 lg:mt-10" aria-labelledby="onas-skusenosti">
                <h2 id="onas-skusenosti" className="text-xl font-semibold tracking-[-0.02em] text-[#2A2E2C] sm:text-2xl">
                  Skúsenosti a profesionálny prístup
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80">
                  Pri rekonštrukcii záleží na ľuďoch, ktorí ju realizujú. Zakladáme si na skúsenostiach, odbornosti a profesionálnom vybavení. Za kvalitu odvedenej práce preberáme zodpovednosť.
                </p>
              </section>
            </div>

            <section className="mx-auto mt-8 w-full max-w-[1000px] lg:mt-12" aria-label="Rozhodovanie a dohoda">
              <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="lg:col-start-2">
                  <LinedHeading>Pomôžeme vám s rozhodovaním</LinedHeading>
                  <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80">
                    Prejdeme s vami vaše predstavy a poradíme s praktickým riešením priestoru, výberom materiálov aj sanity. Upozorníme vás na detaily, ktoré je dobré vyriešiť ešte pred začiatkom prác.
                  </p>
                  <div className="mt-7">
                    <LinedHeading>Stojíme si za dohodou</LinedHeading>
                    <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80">
                      Termín začiatku aj dokončenia prác berieme vážne. Priebeh realizácie plánujeme tak, aby sme dohodnuté termíny dodržali.
                    </p>
                  </div>
                </div>
                <figure className="min-w-0 lg:col-start-1 lg:row-start-1">
                  <AboutPhoto
                    src="/photos/o-nas/byt-prazdny.png"
                    alt="Prázdna miestnosť s drevenou podlahou, otvorenými dverami a preskleným balkónom."
                    position="center 55%"
                  />
                </figure>
              </div>
            </section>
          </div>

          <section className="bg-[#CEDBCB]" aria-label="Cena a kvalita">
            <div className={`${content} grid gap-8 py-8 md:grid-cols-2 md:gap-12 lg:py-10`}>
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#42634C]/10 text-[#42634C]">
                  <DocEuroIcon />
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#2A2E2C]">
                    Jasná cena a rozsah prác
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-[#2A2E2C]/80">
                    Cenu pripravujeme podľa dohodnutého rozsahu prác. Počas realizácie ju nemeníme bez dôvodu. Závažné nepredvídané okolnosti alebo zmeny vašich požiadaviek môžu vyžadovať úpravu kalkulácie.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#42634C]/10 text-[#42634C]">
                  <MedalIcon />
                </span>
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#2A2E2C]">
                    Kvalita za rozumnú cenu
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-[#2A2E2C]/80">
                    Našou prioritou je kvalitne odvedená práca a vhodné materiály. Hľadáme riešenia, ktoré dávajú zmysel pre váš priestor aj rozpočet, bez zbytočných kompromisov v kvalite.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className={`${content} py-10 lg:py-12`}>
            <section className="mx-auto w-full max-w-[1000px]" aria-label="Detaily a vybavenie">
              <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
                <div>
                  <LinedHeading>Záleží nám na detailoch</LinedHeading>
                  <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80">
                    Ku každej práci pristupujeme precízne. Dbáme na správne technické riešenie aj starostlivé spracovanie detailov, ktoré spolu tvoria výsledok rekonštrukcie.
                  </p>
                  <div className="mt-7">
                    <LinedHeading>Profesionálne vybavenie a správne postupy</LinedHeading>
                    <p className="mt-3 text-base leading-relaxed text-[#2A2E2C]/80">
                      Pri práci používame profesionálnu techniku a moderné materiály. Pracovné postupy prispôsobujeme ich vlastnostiam aj požiadavkám konkrétnej realizácie.
                    </p>
                  </div>
                </div>
                <figure className="min-w-0">
                  <AboutPhoto
                    src="/photos/o-nas/vodovaha.png"
                    alt="Ruky držia vodováhu na šedej dlažbe."
                    position="center 12%"
                  />
                </figure>
              </div>
            </section>
          </div>

          <div className={`${content} pb-12 lg:pb-16`}>
            <ContactCta
              id="onas-vyzva"
              title="Porozprávajme sa o vašej rekonštrukcii."
              href="/#kontakt"
              label="Kontaktujte nás"
              className="mt-2 lg:mt-4"
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

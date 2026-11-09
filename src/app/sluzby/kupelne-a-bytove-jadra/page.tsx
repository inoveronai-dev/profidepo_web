import type { Metadata } from "next";
import Link from "next/link";
import { BathroomGallery } from "@/components/bathroom-gallery";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PinPageTop } from "@/components/cennik-page-scroll";
import { ScopeGrid } from "@/components/scope-grid";
import { serviceConsultClass, serviceContent, ServiceCrumbs } from "@/components/service-page";
import { SketchFade } from "@/components/sketch-fade";

export const metadata: Metadata = {
  title: "Kúpeľne a bytové jadrá — ProfiDepo",
  description:
    "Od pôvodného jadra po hotovú kúpeľňu. Rozsah prác prispôsobíme vášmu priestoru, predstavám a zvolenému vybaveniu.",
};

const scope = [
  {
    title: "Demontáž pôvodného jadra",
    text: "Odstránenie pôvodných prvkov a príprava priestoru.",
  },
  {
    title: "Murovanie a úprava dispozície",
    text: "Nové priečky a stavebné úpravy podľa možností priestoru.",
  },
  {
    title: "Voda, odpad a elektrina",
    text: "Úprava rozvodov podľa nového rozmiestnenia vybavenia.",
  },
  {
    title: "Príprava a hydroizolácia",
    text: "Vyrovnanie podkladov a ochrana namáhaných plôch.",
  },
  {
    title: "Obklady a dlažby",
    text: "Pokládka, škárovanie a starostlivé spracovanie detailov.",
  },
  {
    title: "Montáž sanity a dokončenie",
    text: "Osadenie vybavenia a finálne dokončovacie práce.",
  },
] as const;

export default function BathroomPage() {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="bg-background text-[#2A2E2C]">
        <article>
          <header className={`${serviceContent} pt-5 pb-2 lg:pt-6 lg:pb-1`}>
            <ServiceCrumbs current="Kúpeľne a bytové jadrá" />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Kúpeľne a bytové jadrá
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Kúpeľňa, ktorá</span>{" "}
                  <span className="lg:block">vám sadne.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Od pôvodného jadra po hotovú kúpeľňu. Rozsah prác prispôsobíme vášmu priestoru, predstavám a zvolenému vybaveniu.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="service-sketch min-w-0">
                <SketchFade
                  src="/photos/skice/kupelne-a-bytove-jadra.png"
                  alt="Ilustračný náčrt kúpeľne so sprchovým kútom, toaletou a umývadlom."
                  width={1536}
                  height={1024}
                />
              </div>
            </div>
          </header>

          <section className={`${serviceContent} pt-8 pb-8 lg:pt-10 lg:pb-10`} aria-labelledby="kupelne-rozsah">
            <h2 id="kupelne-rozsah" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Od rozvodov po posledný detail.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Jednotlivé práce na seba nadväzujú. Zabezpečíme ich podľa dohodnutého rozsahu rekonštrukcie.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section className="bg-[#CEDBCB]" aria-labelledby="kupelne-priprava">
            <div className={`${serviceContent} grid items-center gap-4 py-7 sm:gap-5 lg:grid-cols-2 lg:gap-12 lg:py-8`}>
              <h2
                id="kupelne-priprava"
                className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
              >
                Dobré riešenie začína rozložením.
              </h2>
              <p className="text-base leading-relaxed text-[#2A2E2C]/80">
                Prejdeme s vami umiestnenie vane či sprchy, úložné priestory aj výber obkladov a sanity. Dôležité rozhodnutia vyriešime pred začiatkom prác.
              </p>
            </div>
          </section>

          <section className={`${serviceContent} pt-12 pb-4 lg:pt-16 lg:pb-6`} aria-labelledby="kupelne-ukazky">
            <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
              Ukážky našej práce
            </p>
            <h2 id="kupelne-ukazky" className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl lg:text-[2.25rem]">
              Pozrite si naše kúpeľne.
            </h2>
            <BathroomGallery />
          </section>

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="kupelne-vyzva"
              title="Plánujete novú kúpeľňu?"
              text="Ozvite sa nám a prejdime si vaše predstavy."
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

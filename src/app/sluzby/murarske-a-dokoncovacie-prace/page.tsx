import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PinPageTop } from "@/components/cennik-page-scroll";
import { ScopeGrid } from "@/components/scope-grid";
import { serviceConsultClass, serviceContent, ServiceCrumbs, ServiceFaq, ServiceMore } from "@/components/service-page";
import { SketchFade } from "@/components/sketch-fade";

export const metadata: Metadata = {
  title: "Murárske a dokončovacie práce — ProfiDepo",
  description:
    "Priečky, omietky, stierky, sadrokartón aj maľovanie. Rozsah prác prispôsobíme vášmu priestoru a plánovanej rekonštrukcii.",
};

const scope = [
  {
    title: "Búranie a demontáž",
    text: "Odstránenie pôvodných priečok, povrchov a ďalších prvkov podľa dohodnutého rozsahu.",
  },
  {
    title: "Murovanie a priečky",
    text: "Nové priečky a stavebné úpravy interiéru.",
  },
  {
    title: "Omietky a opravy povrchov",
    text: "Vyrovnanie a opravy stien, stropov a špaliet.",
  },
  {
    title: "Stierky a brúsenie",
    text: "Príprava hladkých povrchov pred maľovaním.",
  },
  {
    title: "Sadrokartón",
    text: "Priečky, podhľady a úpravy podkrovia.",
  },
  {
    title: "Maľovanie a dokončenie",
    text: "Finálne nátery a dokončenie detailov.",
  },
] as const;

const extraWork = [
  "Sieťkovanie a penetrácia stien a stropov.",
  "Sanačné omietky.",
  "Osádzanie zárubní a parapetov, úpravy špaliet.",
  "Osádzanie a omietanie puzdier pre posuvné dvere.",
  "Sklobetón, oblúky a dekoratívne štukové prvky.",
  "Maľovanie technológiou Airless.",
  "Vyrovnávanie podláh a cementové potery.",
  "Vynosenie a odvoz stavebného odpadu.",
] as const;

const faqs = [
  {
    question: "Dajú sa objednať aj menšie úpravy?",
    answer:
      "Ozvite sa nám aj s menšou úpravou. Rozsah prác a možnosti realizácie si dohodneme podľa vašej požiadavky.",
  },
  {
    question: "Ako pripravíme byt na práce?",
    answer:
      "Pred začiatkom si dohodneme uvoľnenie priestoru, ochranu vybavenia, prístup aj manipuláciu so stavebným odpadom. Konkrétna príprava závisí od rozsahu prác.",
  },
  {
    question: "Čo ovplyvňuje termín dokončenia?",
    answer:
      "Termín závisí od rozsahu úprav, stavu pôvodných povrchov a nadväznosti jednotlivých prác. Zohľadníme aj technologické prestávky a schnutie použitých materiálov.",
  },
] as const;

export default function MasonryPage() {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="overflow-x-clip bg-background text-[#2A2E2C]">
        <article>
          <header className={`${serviceContent} pt-5 pb-2 lg:pt-6 lg:pb-1`}>
            <ServiceCrumbs current="Murárske a dokončovacie práce" />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Murárske a dokončovacie práce
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Od hrubých úprav</span>{" "}
                  <span className="lg:block">po čistý výsledok.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Priečky, omietky, stierky, sadrokartón aj maľovanie. Rozsah prác prispôsobíme vášmu priestoru a plánovanej rekonštrukcii.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="service-sketch min-w-0">
                <SketchFade
                  src="/photos/skice/uvod-nacrt-murarske-prace.png"
                  alt="Ilustračný náčrt miestnosti s priečkou z tvárnic, omietkou a sadrokartónovým podhľadom."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </header>

          <section className={`${serviceContent} pt-8 pb-8 lg:pt-10 lg:pb-10`} aria-labelledby="mur-rozsah">
            <h2 id="mur-rozsah" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Práce, ktoré pripravia priestor na bývanie.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Jednotlivé kroky zladíme podľa stavu priestoru a dohodnutého rozsahu.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section aria-labelledby="mur-postup">
            <div className={`${serviceContent} grid items-center gap-5 py-7 sm:gap-6 lg:grid-cols-2 lg:gap-12 lg:py-8`}>
              <div className="min-w-0">
                <h2
                  id="mur-postup"
                  className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
                >
                  Správny postup vidno <span className="lg:block">na výsledku.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/80">
                  Najprv prejdeme stav priestoru a nadväznosť jednotlivých prác. Prípravu podkladu, schnutie aj finálne vrstvy prispôsobíme použitým materiálom.
                </p>
              </div>
              <div className="min-w-0">
                <SketchFade
                  src="/photos/skice/detail-hladidlo-valcek.png"
                  alt="Ilustračný náčrt hladidla, maliarskeho valčeka a ceruzky."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </section>

          <ServiceMore
            id="mur-dalsie"
            title="Ďalšie práce podľa dohody"
            items={extraWork}
            note="Rozsah a cenu upresníme po obhliadke."
            open
          />

          <ServiceFaq id="mur-otazky" title="Pred začiatkom prác vás môže zaujímať" items={faqs} />

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="mur-vyzva"
              title="Potrebujete upraviť alebo dokončiť interiér?"
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

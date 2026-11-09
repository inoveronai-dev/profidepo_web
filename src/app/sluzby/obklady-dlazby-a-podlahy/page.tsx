import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PinPageTop } from "@/components/cennik-page-scroll";
import { ScopeGrid } from "@/components/scope-grid";
import { serviceApproachGrid, serviceConsultClass, serviceContent, serviceScopeSection, ServiceCrumbs, ServiceFaq, ServiceMore } from "@/components/service-page";
import { SketchFade } from "@/components/sketch-fade";

export const metadata: Metadata = {
  title: "Obklady, dlažby a podlahy — ProfiDepo",
  description:
    "Od prípravy podkladu po finálne lišty. Obklady, dlažby a podlahy podľa vášho priestoru a zvoleného materiálu.",
};

const scope = [
  {
    title: "Odstránenie pôvodných povrchov",
    text: "Demontáž starej podlahy, obkladov a dlažby.",
  },
  {
    title: "Príprava a vyrovnanie podkladu",
    text: "Čistenie, penetrácia a nivelizácia podľa potreby.",
  },
  {
    title: "Obklady stien",
    text: "Pokládka obkladov v kúpeľni, kuchyni a ďalších priestoroch.",
  },
  {
    title: "Pokládka dlažby",
    text: "Rozvrhnutie, presné rezy a uloženie dlaždíc.",
  },
  {
    title: "Vinylové a laminátové podlahy",
    text: "Pokládka podľa typu krytiny a podmienok priestoru.",
  },
  {
    title: "Škáry, sokle a lišty",
    text: "Škárovanie, rohové a obvodové lišty a finálne detaily.",
  },
] as const;

const extraWork = [
  "Veľkoformátové obklady.",
  "Mozaiky a dekory.",
  "Kamenné obklady a bridlice.",
  "Otvory a výrezy pre rozvody.",
  "Diagonálna pokládka.",
  "Rohy, sokle a napojenia.",
] as const;

const faqs = [
  {
    question: "Kedy položiť novú podlahu?",
    answer:
      "Novú podlahu spravidla kladieme po dokončení ostatných stavebných a maliarskych prác. Presný postup zladíme s osadením dverí, zárubní a líšt podľa konkrétnej rekonštrukcie.",
  },
  {
    question: "Čo treba skontrolovať pred pokládkou?",
    answer:
      "Dôležitý je čistý, pevný a vhodne pripravený podklad. Jeho rovinnosť a vlhkosť posúdime vzhľadom na vybranú krytinu a pokyny výrobcu. Prejdeme aj výslednú výšku podlahy a napojenie na okolité povrchy.",
  },
  {
    question: "Ako sa starať o nový povrch?",
    answer:
      "Údržba závisí od konkrétneho materiálu. Riaďte sa pokynmi výrobcu, používajte vhodné čistiace prostriedky a chráňte povrch pred poškriabaním. Pri podlahách pomôžu aj ochranné podložky pod nábytkom.",
  },
] as const;

export default function FlooringPage() {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="overflow-x-clip bg-background text-[#2A2E2C]">
        <article>
          <header className={`${serviceContent} pt-5 pb-2 lg:pt-6 lg:pb-1`}>
            <ServiceCrumbs current="Obklady, dlažby a podlahy" />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Obklady, dlažby a podlahy
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Precízna pokládka.</span>{" "}
                  <span className="lg:block">Premyslené detaily.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Od prípravy podkladu po finálne lišty. Obklady, dlažby a podlahy podľa vášho priestoru a zvoleného materiálu.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="service-sketch min-w-0">
                <SketchFade
                  src="/photos/skice/uvod-nacrt-obklady-podlahy.png"
                  alt="Ilustračný náčrt predsiene s dlažbou, obkladom steny a výhľadom na drevenú podlahu."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </header>

          <section className={serviceScopeSection} aria-labelledby="podlahy-rozsah">
            <h2 id="podlahy-rozsah" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Od pevného podkladu po čisté zakončenie.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Jednotlivé práce prispôsobíme stavu podkladu a vybranému povrchu.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section aria-labelledby="podlahy-priprava">
            <div className={serviceApproachGrid}>
              <div className="min-w-0">
                <h2
                  id="podlahy-priprava"
                  className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
                >
                  Dobrý výsledok začína <span className="lg:block">pod povrchom.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/80">
                  Pred pokládkou posúdime podklad, výšku podlahy a nadväznosť na dvere či zárubne. Prípravu aj postup prác prispôsobíme zvolenému materiálu.
                </p>
              </div>
              <div className="min-w-0">
                <SketchFade
                  src="/photos/skice/detail-vzorky-podlahy-dlazby.png"
                  alt="Ilustračný náčrt vzoriek drevenej podlahy a dlažby s pravítkom."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </section>

          <ServiceMore
            id="podlahy-dalsie"
            title="Aj náročnejšie detaily podľa dohody"
            items={extraWork}
            note="Rozsah a cenu upresníme podľa materiálu a náročnosti realizácie."
            open
          />

          <ServiceFaq id="podlahy-otazky" title="Pred pokládkou vás môže zaujímať" items={faqs} />

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="podlahy-vyzva"
              title="Plánujete nové obklady alebo podlahu?"
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

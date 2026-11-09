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
  title: "Elektroinštalácie a vodoinštalácie — ProfiDepo",
  description:
    "Od úprav rozvodov po zapojenie zásuviek, svietidiel a sanity. Postaráme sa aj o drobné presuny existujúcich zásuviek.",
};

const scope = [
  {
    title: "Elektrické rozvody",
    text: "Výmena a úpravy kabeláže podľa dohodnutého rozsahu.",
  },
  {
    title: "Zásuvky a ich presuny",
    text: "Zapájanie zásuviek pre napätia od 240 V do 400 V a drobné presuny existujúcich zásuviek.",
  },
  {
    title: "Svietidlá",
    text: "Montáž a zapojenie osvetlenia.",
  },
  {
    title: "Rozvody vody",
    text: "Úpravy prívodov podľa rozmiestnenia vybavenia.",
  },
  {
    title: "Odpadové rozvody",
    text: "Príprava a úprava odpadov v kúpeľni či kuchyni.",
  },
  {
    title: "Sanita a batérie",
    text: "Osadenie a pripojenie umývadiel, WC, bidetov, vaní, sprchového vybavenia a batérií.",
  },
] as const;

const extraWork = [
  "Drobné presuny existujúcich zásuviek.",
  "Výmena a montáž svietidiel.",
  "Montáž a demontáž sanity a kúpeľňových doplnkov.",
  "Pripojenie domácej vodárne.",
] as const;

const faqs = [
  {
    question: "Dajú sa objednať aj drobné práce?",
    answer:
      "Ozvite sa nám aj s menšou požiadavkou, napríklad s presunom zásuvky, montážou svietidla alebo výmenou batérie. Konkrétny rozsah a možnosti realizácie si dohodneme podľa stavu existujúcich rozvodov.",
  },
  {
    question: "Kedy riešiť umiestnenie zásuviek?",
    answer:
      "Ideálne pred dokončením stien a obkladov, keď je známe rozmiestnenie nábytku a spotrebičov. Možnosti menších úprav existujúcich zásuviek posúdime podľa konkrétneho priestoru.",
  },
  {
    question: "Čo si pripraviť pred obhliadkou?",
    answer:
      "Pripravte si stručný opis požadovaných úprav, predstavu o umiestnení vybavenia a prípadnú dostupnú dokumentáciu. Ak posielate fotografie, stačia bežné zábery priestoru bez otvárania zásuviek alebo rozvádzača.",
  },
] as const;

export default function UtilitiesPage() {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="overflow-x-clip bg-background text-[#2A2E2C]">
        <article>
          <header className={`${serviceContent} pt-5 pb-2 lg:pt-6 lg:pb-1`}>
            <ServiceCrumbs current="Elektroinštalácie a vodoinštalácie" />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Elektroinštalácie a vodoinštalácie
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Rozvody a zapojenia</span>{" "}
                  <span className="lg:block">pre váš domov.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Od úprav rozvodov po zapojenie zásuviek, svietidiel a sanity. Postaráme sa aj o drobné presuny existujúcich zásuviek.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="service-sketch min-w-0">
                <SketchFade
                  src="/photos/skice/uvod-nacrt-elektrikar-vodar.png"
                  alt="Ilustračný náčrt elektrikára pri zásuvke a vodoinštalatéra pri rozvodoch."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </header>

          <section className={serviceScopeSection} aria-labelledby="rozvody-rozsah">
            <h2 id="rozvody-rozsah" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Elektrina aj voda v jednom pláne.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Rozsah prác prispôsobíme rekonštrukcii aj menším úpravám.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section aria-labelledby="rozvody-plan">
            <div className={serviceApproachGrid}>
              <div className="min-w-0">
                <h2
                  id="rozvody-plan"
                  className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
                >
                  Najprv rozmiestnenie. <span className="lg:block">Potom rozvody.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/80">
                  Spoločne prejdeme umiestnenie zásuviek, svietidiel a sanitárneho vybavenia. Potrebné úpravy zladíme pred dokončením stien a obkladov.
                </p>
              </div>
              <div className="min-w-0">
                <SketchFade
                  src="/photos/skice/detail-zasuvka-ventil-plan.png"
                  alt="Ilustračný náčrt zásuvky, guľového ventilu a zvinutého pôdorysu."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </section>

          <ServiceMore
            id="rozvody-dalsie"
            title="Aj menšie práce podľa dohody"
            items={extraWork}
            note="Rozsah a cenu upresníme podľa stavu rozvodov a požadovaných úprav."
          />

          <ServiceFaq id="rozvody-otazky" title="Pred úpravou rozvodov vás môže zaujímať" items={faqs} />

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="rozvody-vyzva"
              title="Potrebujete upraviť elektrinu alebo vodu?"
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

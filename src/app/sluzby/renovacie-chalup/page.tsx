import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PinPageTop } from "@/components/cennik-page-scroll";
import { ScopeGrid } from "@/components/scope-grid";
import { serviceConsultClass, serviceContent, ServiceCrumbs, ServiceMore } from "@/components/service-page";
import { SketchFade } from "@/components/sketch-fade";

export const metadata: Metadata = {
  title: "Renovácie chalúp — ProfiDepo",
  description:
    "Obnovíme vašu chalupu s citom pre jej pôvodný charakter. Od jednotlivých úprav až po kompletnú renováciu.",
};

const scope = [
  {
    title: "Drevo a trámy",
    text: "Brúsenie starých náterov, impregnácia, morenie, lazúrovanie a olejovanie dreva.",
  },
  {
    title: "Murárske práce a povrchy",
    text: "Opravy muriva, omietky, maľovanie a sadrokartón.",
  },
  {
    title: "Elektrina, voda a odpad",
    text: "Úpravy elektroinštalácie, vodovodných rozvodov a odpadu podľa dohodnutého rozsahu.",
  },
  {
    title: "Kúpeľne, obklady a dlažby",
    text: "Obnova kúpeľne, pokládka obkladov a dlažby v kúpeľni či kuchyni a montáž sanity.",
  },
  {
    title: "Okná, okenice a zateplenie",
    text: "Výmena okien, obnova drevených okeníc a zateplenie poschodia proti únikom tepla.",
  },
  {
    title: "Kúrenie a dokončenie",
    text: "Montáž podlahového kúrenia v kúpeľni, infrapanelov a vybavenia interiéru.",
  },
] as const;

const extraWork = [
  "Spevnenie stien proti prasklinám.",
  "Osadenie oceľových prekladov nad prechody medzi miestnosťami.",
  "Opravy špaliet okolo okien.",
  "Ošetrenie stien proti plesniam.",
  "Montáž nábytku, svietidiel a zásuviek.",
  "Vypratanie priestorov a vynosenie nepotrebného nábytku.",
  "Opravy a údržba dreveného plota.",
  "Inštalácia a pripojenie domácej vodárne.",
  "Spílenie nepotrebného stromu.",
  "Zapojenie satelitu a TV.",
] as const;

export default function CottagePage() {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="overflow-x-clip bg-background text-[#2A2E2C]">
        <article>
          <header className={`${serviceContent} pt-5 pb-2 lg:pt-6 lg:pb-1`}>
            <ServiceCrumbs current="Renovácie chalúp" />

            <div className="mt-7 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="service-copy min-w-0">
                <p className="text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
                  Renovácie chalúp
                </p>
                <h1 className="service-title mt-3 text-[#1E3A2C]">
                  <span className="lg:block">Nový život pre</span>{" "}
                  <span className="lg:block">vašu chalupu.</span>
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                  Obnovíme vašu chalupu s citom pre jej pôvodný charakter. Od jednotlivých úprav až po kompletnú renováciu.
                </p>
                <Link href="/#kontakt" className={`${serviceConsultClass} mt-6`}>
                  Dohodnúť obhliadku
                </Link>
              </div>
              <div className="service-sketch min-w-0">
                <SketchFade
                  src="/photos/skice/uvod-nacrt-chalupy-svetly-v2.png"
                  alt="Ilustračný náčrt chalupy s kachľovou pecou, drevenými trámami a sedením."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </header>

          <section className={`${serviceContent} pt-8 pb-8 lg:pt-10 lg:pb-10`} aria-labelledby="chalupy-rozsah">
            <h2 id="chalupy-rozsah" className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Od drevených trámov po hotový interiér.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">
              Rozsah renovácie prispôsobíme stavu chalupy a vašim predstavám.
            </p>
            <ScopeGrid items={scope} />
          </section>

          <section aria-labelledby="chalupy-pristup">
            <div className={`${serviceContent} grid items-center gap-5 py-7 sm:gap-6 lg:grid-cols-2 lg:gap-12 lg:py-8`}>
              <div className="min-w-0">
                <h2
                  id="chalupy-pristup"
                  className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl lg:text-[2.15rem] lg:leading-[1.15]"
                >
                  Tradičný charakter. <span className="lg:block">Dnešné pohodlie.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#2A2E2C]/80">
                  Pri obnove rešpektujeme charakter stavby, regionálne tradície aj vaše predstavy. Tradičné postupy prepájame so súčasnými riešeniami, aby si chalupa zachovala svoje čaro a ponúkla pohodlie na každý deň. Rozsah a postup prác si dohodneme po obhliadke.
                </p>
              </div>
              <div className="min-w-0">
                <SketchFade
                  src="/photos/skice/detail-drevenych-tramov-svetly-v2.png"
                  alt="Ilustračný náčrt drevených trámov, okna a police v chalúpke."
                  width={1448}
                  height={1086}
                />
              </div>
            </div>
          </section>

          <ServiceMore
            id="chalupy-dalsie"
            title="Ďalšie práce podľa dohody"
            items={extraWork}
            note="Pri obnove spolupracujeme aj s tradičnými remeselníkmi."
          />

          <div className={`${serviceContent} pb-12 lg:pb-16`}>
            <ContactCta
              id="chalupy-vyzva"
              title="Plánujete obnoviť svoju chalupu?"
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

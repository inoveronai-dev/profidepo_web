import type { Metadata } from "next";
import Link from "next/link";
import { CennikList } from "@/components/cennik-list";
import { ContactCta } from "@/components/contact-cta";
import { CennikPageScroll } from "@/components/cennik-page-scroll";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { priceCategories, priceIntro } from "@/lib/cennik";

export const metadata: Metadata = {
  title: "Cenník — ProfiDepo",
  description:
    "Prehľad cien jednotlivých prác. Konkrétnu ponuku pripravíme podľa rozsahu rekonštrukcie.",
};

const content = "mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]";

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function CennikPage() {
  return (
    <>
      <CennikPageScroll />
      <Header />
      <main className="bg-background text-[#2A2E2C]">
        <style>{`
          .cennik-title {
            font-size: 2rem;
            line-height: 1.08;
            font-weight: 700;
            letter-spacing: -0.035em;
          }
          @media (min-width: 640px) {
            .cennik-title { font-size: 2.5rem; line-height: 1.06; }
          }
          @media (min-width: 1024px) {
            .cennik-title {
              font-size: clamp(3.5rem, 4.15vw, 4rem);
              line-height: 1.02;
            }
          }
        `}</style>
        <div className={`${content} pt-6 pb-16 lg:pt-8 lg:pb-20`}>
          <nav aria-label="Drobčeková navigácia" className="text-sm text-[#2A2E2C]/70">
            <Link
              href="/"
              className="text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]"
            >
              Úvod
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Cenník</span>
          </nav>

          <div className="mt-6 grid items-center gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,520px)] lg:gap-8">
            <div className="max-w-2xl">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-[#42634C] uppercase">
                Cenník prác
              </p>
              <h1 className="cennik-title mt-3 text-[#1E3A2C]">
                <span className="lg:block">Cena podľa vášho</span>{" "}
                <span className="lg:block">priestoru.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
                Každá rekonštrukcia má iný rozsah. Prejdite si jednotlivé práce a ozvite sa nám pre konkrétnu cenovú ponuku.
              </p>
            </div>
            <img
              src="/nacrt-cennik.svg"
              alt=""
              aria-hidden="true"
              className="block h-auto w-full max-w-[420px] lg:max-w-none lg:justify-self-end"
            />
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl bg-[#CEDBCB] px-4 py-4 text-[15px] leading-relaxed text-[#1E3A2C] sm:px-5 lg:mt-10">
            <InfoIcon />
            <p>Konkrétnu cenu pripravíme podľa rozsahu prác, stavu priestoru a zvolených materiálov.</p>
          </div>

          <section className="mt-12 lg:mt-14" aria-labelledby="prehlad-prac">
            <h2 id="prehlad-prac" className="text-3xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-4xl">
              Prehľad prác
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#2A2E2C]/80">{priceIntro}</p>
            <div className="mt-6">
              <CennikList categories={priceCategories} />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[#2A2E2C]/75">
              Presný rozsah aj cenu si odsúhlasíme pred začiatkom prác.
            </p>
          </section>

          <ContactCta
            id="cennik-vyzva"
            title="Chcete vedieť cenu vašej rekonštrukcie?"
            text="Povedzte nám, čo plánujete zmeniť."
            href="/#kontakt"
            label="Dohodnúť obhliadku"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

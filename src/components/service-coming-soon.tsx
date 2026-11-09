import Link from "next/link";
import { PinPageTop } from "@/components/cennik-page-scroll";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const content = "mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]";

const crumbClass =
  "text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]";

const buttonClass =
  "inline-flex h-12 items-center rounded-lg bg-[#42634C] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#36543f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]";

const textLinkClass =
  "text-[16px] font-medium text-[#2A2E2C] underline decoration-[#42634C]/35 underline-offset-4 hover:decoration-[#42634C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]";

export function ServiceComingSoon({ title }: { title: string }) {
  return (
    <>
      <PinPageTop />
      <Header />
      <main className="bg-background text-[#2A2E2C]">
        <article className={`${content} pt-5 pb-12 lg:pt-6 lg:pb-16`}>
          <nav aria-label="Drobčeková navigácia" className="text-sm text-[#2A2E2C]/70">
            <Link href="/" className={crumbClass}>
              Úvod
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/#sluzby" className={crumbClass}>
              Služby
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{title}</span>
          </nav>

          <p className="mt-8 text-[15px] font-semibold tracking-[0.1em] text-[#2C4A38] uppercase">
            Podstránku pripravujeme
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#2A2E2C]/80 sm:text-lg">
            Podrobnosti a ukážky našej práce sem čoskoro doplníme. Ak máte o túto službu záujem, ozvite sa nám.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link href="/#kontakt" className={buttonClass}>
              Kontaktujte nás
            </Link>
            <Link href="/#sluzby" className={textLinkClass}>
              Späť na služby
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

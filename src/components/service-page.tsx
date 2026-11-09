import Link from "next/link";

export const serviceContent = "mx-auto w-full max-w-[1440px] px-5 sm:px-6 lg:px-[72px]";

/** Scope block on the four illustration service pages. Bottom padding is the gap into the approach section. */
export const serviceScopeSection = `${serviceContent} pt-8 pb-4 lg:pt-10 lg:pb-6`;

/** Text and illustration band. Vertical padding is shared by all four pages. */
export const serviceApproachGrid = `${serviceContent} grid items-center gap-5 py-4 sm:gap-6 lg:grid-cols-2 lg:gap-12`;

export const serviceConsultClass =
  "inline-flex h-12 items-center rounded-lg bg-[#42634C] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#36543f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42634C]";

const crumbClass =
  "text-[#42634C] underline decoration-[#42634C]/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C]";

export function ServiceCrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Drobčeková navigácia" className="text-sm text-[#2A2E2C]/70">
      <Link href="/" className={crumbClass}>
        Úvod
      </Link>
      <span aria-hidden="true"> / </span>
      <Link href="/#sluzby" className={crumbClass}>
        Služby
      </Link>
      <span aria-hidden="true"> / </span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

export function ServiceMore({
  id,
  title,
  items,
  note,
  open = false,
}: {
  id: string;
  title: string;
  items: readonly string[];
  note: string;
  open?: boolean;
}) {
  return (
    <section className={`${serviceContent} pt-4 pb-2 lg:pt-6`} aria-labelledby={id}>
      <details className="service-more" open={open}>
        <summary>
          <h2 id={id} className="service-more-title text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl">
            {title}
          </h2>
          <span className="service-icon" aria-hidden="true" />
        </summary>
        <ul className="service-extra">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="service-more-note">{note}</p>
      </details>
    </section>
  );
}

export function ServiceFaq({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section className={`${serviceContent} pt-8 lg:pt-12`} aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl">
        {title}
      </h2>
      <div className="service-faq-panel">
        {items.map((item) => (
          <details key={item.question} className="service-faq">
            <summary>
              <span className="service-faq-q">{item.question}</span>
              <span className="service-icon" aria-hidden="true" />
            </summary>
            <p className="service-faq-a">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

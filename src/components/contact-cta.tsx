import Link from "next/link";

export function ContactCta({
  id,
  title,
  text,
  href,
  label,
  className,
}: {
  id: string;
  title: string;
  text?: string;
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <section className={className ?? "mt-10 lg:mt-12"} aria-labelledby={id}>
      <style>{`
        .contact-cta:focus-visible {
          outline: 2px solid #214B38;
          outline-offset: 4px;
        }
      `}</style>
      <div className="rounded-2xl bg-[#CEDBCB] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 id={id} className="text-2xl font-semibold tracking-[-0.03em] text-[#1E3A2C] sm:text-3xl">
              {title}
            </h2>
            {text ? (
              <p className="mt-2 text-base leading-relaxed text-[#1E3A2C]/80">{text}</p>
            ) : null}
          </div>
          <Link
            href={href}
            className="contact-cta inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-lg bg-[#214B38] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#183528]"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

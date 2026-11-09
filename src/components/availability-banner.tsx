export function AvailabilityBanner() {
  return (
    <section aria-labelledby="availability-title" className="bg-[#CEDBCB]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-10 text-center sm:px-6 lg:px-[72px] lg:py-12">
        <h2
          id="availability-title"
          className="max-w-3xl text-xl font-semibold tracking-[-0.02em] text-[#42634C] sm:text-2xl"
        >
          Máme voľný termín na rekonštrukciu!
        </h2>
        <a
          href="#kontakt"
          className="social-link mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-[#42634C] px-4 text-[15px] font-medium text-[#42634C] sm:mt-7"
        >
          Dohodnúť obhliadku
        </a>
      </div>
    </section>
  );
}

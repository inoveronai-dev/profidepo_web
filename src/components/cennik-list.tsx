"use client";

import { useId, useState } from "react";
import type { PriceCategory } from "@/lib/cennik";

export function CennikList({ categories }: { categories: PriceCategory[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(() =>
    categories[0] ? [categories[0].id] : [],
  );

  const toggle = (id: string) => {
    setOpen((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="space-y-3">
      <style>{`
        .cennik-cat:focus-visible {
          outline: 2px solid #42634C;
          outline-offset: 2px;
        }
        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
          .cennik-cat { transition: background-color 180ms ease; }
          .cennik-cat:hover { background: rgba(206, 219, 203, 0.45); }
        }
      `}</style>
      {categories.map((category) => {
        const isOpen = open.includes(category.id);
        const buttonId = `${baseId}-${category.id}-button`;
        const panelId = `${baseId}-${category.id}-panel`;
        return (
          <section key={category.id} className="overflow-hidden rounded-xl border border-[#42634C]/25 bg-[#EAE6DC]">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="cennik-cat flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left text-[17px] font-semibold text-[#1E3A2C] sm:px-5"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(category.id)}
              >
                <span aria-hidden="true" className="w-4 shrink-0 text-center text-xl leading-none font-medium text-[#42634C]">
                  {isOpen ? "−" : "+"}
                </span>
                {category.title}
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <div className="border-t border-[#42634C]/20 px-2 pb-2 sm:px-3">
                <ul className="sm:hidden">
                  {category.rows.map((row) => (
                    <li
                      key={row.work}
                      className="border-t border-[#42634C]/20 px-3 py-4 first:border-t-0"
                    >
                      <p className="text-base leading-snug font-medium text-[#2A2E2C]">{row.work}</p>
                      {row.note ? (
                        <p className="mt-1.5 text-sm leading-relaxed text-[#4A524E]">{row.note}</p>
                      ) : null}
                      <p className="mt-3 text-[17px] leading-snug font-semibold text-[#1E3A2C] tabular-nums">
                        <span className="sr-only">Cena: </span>
                        {row.price}
                        {row.unit ? (
                          <>
                            <span aria-hidden="true"> / </span>
                            <span className="sr-only"> za </span>
                            {row.unit}
                          </>
                        ) : null}
                      </p>
                    </li>
                  ))}
                </ul>
                <table className="hidden w-full table-fixed bg-[#EAE6DC] text-[15px] leading-snug sm:table">
                  <caption className="sr-only">{category.title}</caption>
                  <thead>
                    <tr className="bg-[#CEDBCB] text-left text-[13px] font-semibold tracking-[0.04em] text-[#1E3A2C]">
                      <th scope="col" className="px-3 py-2.5 font-semibold">Práca</th>
                      <th scope="col" className="w-24 px-2 py-2.5 font-semibold">Jednotka</th>
                      <th scope="col" className="w-28 px-3 py-2.5 text-right font-semibold">Cena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.rows.map((row) => (
                      <tr key={row.work} className="border-t border-[#42634C]/20 bg-[#EAE6DC] align-top">
                        <th scope="row" className="px-3 py-3.5 text-left font-normal text-[#2A2E2C]">
                          <span className="block font-medium">{row.work}</span>
                          {row.note ? (
                            <span className="mt-1 block text-sm leading-relaxed font-normal text-[#2A2E2C]/70">
                              {row.note}
                            </span>
                          ) : null}
                        </th>
                        <td className="px-2 py-3.5 text-[#2A2E2C]/80">{row.unit || "—"}</td>
                        <td className="px-3 py-3.5 text-right font-medium whitespace-nowrap text-[#1E3A2C] tabular-nums">
                          {row.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {category.footer ? (
                  <p className="border-t border-[#42634C]/20 bg-[#EAE6DC] px-3 py-4 text-sm leading-relaxed text-[#2A2E2C]/80">
                    {category.footer}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

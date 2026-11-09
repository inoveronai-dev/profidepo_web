export function ScopeGrid({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  return (
    <>
      <style>{`
        .scope-list { display: grid; list-style: none; margin: 1.15rem 0 0; padding: 0; }
        .scope-title {
          color: #173D2D;
          font-weight: 700;
          font-size: 1.125rem;
          line-height: 1.3;
        }
        @media (min-width: 640px) {
          .scope-title { font-size: 1.25rem; }
        }
        @media (min-width: 1024px) {
          .scope-title { font-size: 1.375rem; }
        }
        .scope-list li,
        .scope-list p { overflow-wrap: break-word; }
        .scope-list li {
          min-width: 0;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(66, 99, 76, 0.12);
        }
        .scope-list li:last-child { border-bottom: 0; }
        @media (min-width: 768px) {
          .scope-list { grid-template-columns: 1fr 1fr; }
          .scope-list li {
            padding: 0.9rem 1.15rem 0.9rem 0;
            border-bottom: 1px solid rgba(66, 99, 76, 0.12);
            border-right: 1px solid rgba(66, 99, 76, 0.12);
          }
          .scope-list li:nth-child(2n) {
            border-right: 0;
            padding-right: 0;
            padding-left: 1.15rem;
          }
          .scope-list li:nth-last-child(-n + 2) { border-bottom: 0; }
        }
        @media (min-width: 1024px) {
          .scope-list { grid-template-columns: 1fr 1fr 1fr; margin-top: 1.35rem; }
          .scope-list li {
            border-right: 1px solid rgba(66, 99, 76, 0.12);
            border-bottom: 1px solid rgba(66, 99, 76, 0.12);
            padding: 0.95rem 1.35rem;
          }
          .scope-list li:nth-child(2n) {
            border-right: 1px solid rgba(66, 99, 76, 0.12);
            padding: 0.95rem 1.35rem;
          }
          .scope-list li:nth-child(3n) {
            border-right: 0;
            padding-right: 0;
          }
          .scope-list li:nth-child(3n + 1) { padding-left: 0; }
          .scope-list li:nth-last-child(-n + 2) {
            border-bottom: 1px solid rgba(66, 99, 76, 0.12);
          }
          .scope-list li:nth-last-child(-n + 3) { border-bottom: 0; }
        }
      `}</style>
      <ul className="scope-list">
        {items.map((item) => (
          <li key={item.title}>
            <h3 className="scope-title">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-snug font-normal text-[#5C6560]">{item.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

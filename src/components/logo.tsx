export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 42V23L24 7l6 5.3V8h6v9.7L42 23v19H29.5V29H18.5V42H6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
    </svg>
  );
}

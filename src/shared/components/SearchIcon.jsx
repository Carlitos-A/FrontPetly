export default function SearchIcon({ size = "normal" }) {
  const className = size === "large" ? "h-16 w-16" : "h-8 w-8";
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="m15 15 4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M10.5 8.2v2.6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="10.5" cy="13.4" r="1" fill="currentColor" />
    </svg>
  );
}
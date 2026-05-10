export default function PawIcon({ size = "normal" }) {
  const className = size === "large" ? "h-16 w-16" : "h-8 w-8";

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="8" cy="6" rx="2" ry="2.7" />
      <ellipse cx="16" cy="6" rx="2" ry="2.7" />
      <ellipse cx="5" cy="11" rx="1.8" ry="2.3" />
      <ellipse cx="19" cy="11" rx="1.8" ry="2.3" />
      <path d="M12 11.2c-3.4 0-6 2.3-6 5.3 0 1.9 1.4 3.3 3.1 3.3.8 0 1.5-.3 2-.6.6-.3 1.2-.3 1.8 0 .5.3 1.2.6 2 .6 1.7 0 3.1-1.4 3.1-3.3 0-3-2.6-5.3-6-5.3Z" />
    </svg>
  );
}

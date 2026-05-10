export default function ActionCard({ title, text, tone, onClick }) {
  const isLost = tone === "lost";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl p-4 text-center shadow-sm transition",
        "hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1a412f]/35",
        isLost ? "bg-[#1a412f] text-white" : "bg-[#91e4ec] text-[#0d2440]",
      ].join(" ")}
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/55">
        {isLost ? "🔎" : "🐾"}
      </span>

      <span className="text-base font-black">{title}</span>
      <span className="text-xs font-bold opacity-75">{text}</span>
    </button>
  );
}

const SPECIES_EMOJI = { dog: "🐕", cat: "🐈", other: "🐾" };
const SPECIES_BG    = { dog: "bg-orange-50", cat: "bg-violet-50", other: "bg-sky-50" };
 
function hoursAgo(date) {
  const ms = Date.now() - new Date(date).getTime();
  return Math.floor(ms / (1000 * 60 * 60));
}
 
function timeLabel(hours) {
  if (hours < 1)  return "Hace menos de 1 h";
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days > 1 ? "s" : ""}`;
}
 
export default function PetCard({ pet, onClick }) {
  const hours   = hoursAgo(pet.reportedAt);
  const urgent  = hours < 12;
  const isLost  = pet.status === "lost";
 
  return (
    <article
      onClick={() => onClick?.(pet)}
      className={[
        "group flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-200 hover:-translate-y-0.5",
        urgent
          ? "border border-orange-300 shadow[0_0_0_1px_theme(colors.orange.200)] "
          : "border border-stone-200 hover:border-stone-300",
      ].join(" ")}
    >
      {/* Image / fallback */}
      <div className={`relative w-full h-36 flex items-center justify-center ${SPECIES_BG[pet.species] ?? "bg-stone-50"}`}>
        {pet.photo ? (
          <img
            src={pet.photo}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl select-none">{SPECIES_EMOJI[pet.species] ?? "🐾"}</span>
        )}
 
        {/* Status badge */}
        <span className={[
          "absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full",
          isLost
            ? "bg-red-100 text-red-700"
            : "bg-emerald-100 text-emerald-700",
        ].join(" ")}>
          {isLost ? "Perdido" : "Encontrado"}
        </span>
 
        {/* Urgent time label */}
        {urgent && (
          <span className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-medium bg-orange-500 text-white px-2 py-0.5 rounded-full">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {timeLabel(hours)}
          </span>
        )}
      </div>
 
      {/* Body */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-stone-900 leading-tight">{pet.name}</span>
          <span className="text-xs text-stone-400 shrink-0">{pet.distance.toFixed(1)} km</span>
        </div>
 
        <div className="flex flex-col gap-0.5">
          <Row label="Raza"   value={pet.breed}  />
          <Row label="Color"  value={pet.color}  />
          <Row label="Sector" value={pet.sector} />
        </div>
      </div>
 
      {/* Footer */}
      <div className="px-3 pb-3">
        <button className="w-full text-xs text-teal-700 border border-teal-200 bg-teal-50 hover:bg-teal-100 transition-colors rounded-lg py-1.5 font-medium">
          Ver contacto →
        </button>
      </div>
    </article>
  );
}
 
function Row({ label, value }) {
  return (
    <p className="text-xs text-stone-500 leading-relaxed">
      <span className="text-stone-400">{label}: </span>
      {value}
    </p>
  );
}
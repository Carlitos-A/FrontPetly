const SPECIES_EMOJI = { dog: "🐕", cat: "🐈", other: "🐾" };
const SPECIES_BG = { dog: "bg-orange-50", cat: "bg-violet-50", other: "bg-sky-50" };

function hoursAgo(date) {
  const ms = Date.now() - new Date(date).getTime();
  return Math.floor(ms / (1000 * 60 * 60));
}

function timeLabel(hours) {
  if (hours < 1) return "Hace menos de 1 h";
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days > 1 ? "s" : ""}`;
}

export default function PetCard({ pet, onClick }) {
  const hours = hoursAgo(pet.reportedAt);
  const urgent = hours < 12;
  const isLost = pet.status === "lost";

  return (
    <article
      onClick={() => onClick?.(pet)}
      className={[
        "group flex flex-col rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-200 hover:-translate-y-1",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        urgent
          ? "shadow-lg shadow-[#5DCAA5]/10 border-[#5DCAA5]/30"
          : "hover:border-white/20",
      ].join(" ")}
    >
      {/* Image / fallback */}
      <div className={`relative w-full h-36 flex items-center justify-center  ${SPECIES_BG[pet.species] ?? "bg-[#0f2e1f]"}}`}>
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
            ? "bg-white/10 text-white border border-white/20"
            : "bg-[#5DCAA5]/20 text-[#5DCAA5] border border-[#5DCAA5]/30",
        ].join(" ")}>
          {isLost ? "Perdido" : "Encontrado"}
        </span>

        {/* Urgent time label */}
        {urgent && (
          <span className="
            absolute bottom-2 left-2 flex items-center gap-1 text-[10px]
        font-medium bg-[#5DCAA5] text-[#0a1a10] px-2 py-0.5 rounded-full
">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {timeLabel(hours)}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-white">{pet.name}</span>
          <span className="text-xs text-white/40">{pet.distance.toFixed(1)} km</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Row label="Raza" value={pet.breed} />
          <Row label="Color" value={pet.color} />
          <Row label="Sector" value={pet.sector} />
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3">
        <button className="  w-full text-xs
  text-[#5DCAA5]
  border border-[#5DCAA5]/30
  bg-[#5DCAA5]/10
  hover:bg-[#5DCAA5]/20
  transition-all
  rounded-lg py-1.5 font-medium">
          Ver contacto →
        </button>
      </div>
    </article >
  );
}

function Row({ label, value }) {
  return (
    <p className="text-xs text-white/60">
      <span className="text-white/30">{label}: </span>
      {value}
    </p>
  );
}
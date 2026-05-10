import { getDistanceFromReference } from "../utils/distance";
import { ubicacionCoord } from "../../map/services/ubicacionService";
import { useEffect, useState } from "react";
import PawIcon from "../../../shared/components/PawIcon";

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

export default function PetCard({ pet, onClick, referenceLocation, selected = false }) {
  const locationFallback = getPetLocationText(pet);
  const [ubicacion, setUbicacion] = useState(locationFallback || "Cargando ubicación...");
  const hours = hoursAgo(pet.fechaReporte);
  const urgent = hours < 12;
  const distance = getDistanceFromReference(referenceLocation, pet);
  const distanceLabel = distance == null ? "-- km" : `${distance.toFixed(1)} km`;
  const estado = pet.tipoReporte;
  const statusStyles = {
    PERDIDA: "bg-red-500/20 text-red-400 border border-red-400/30",
    ENCONTRADA: "bg-[#5DCAA5]/20 text-[#5DCAA5] border border-[#5DCAA5]/30",
    AVISTAMIENTO: "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30",
  };

useEffect(() => {
  const controller = new AbortController();

  async function cargarUbicacion() {
    if (!hasCoordinates(pet)) {
      setUbicacion(locationFallback || "Ubicación no disponible");
      return;
    }

    const place = await ubicacionCoord(
      pet.latitud,
      pet.longitud,
      controller.signal
    );

    setUbicacion(isMissingLocation(place) ? locationFallback || place : place);
  }

  cargarUbicacion();

  return () => controller.abort();
}, [pet.latitud, pet.longitud, locationFallback]);


  return (
    <article
      onClick={() => onClick?.(pet)}
      className={[
        "group flex flex-col rounded-2xl overflow-hidden cursor-pointer",
        "transition-all duration-200 hover:-translate-y-1",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        selected
          ? "border-[#5DCAA5] shadow-xl shadow-[#5DCAA5]/20 ring-2 ring-[#5DCAA5]/40"
          : urgent
          ? "shadow-lg shadow-[#5DCAA5]/10 border-[#5DCAA5]/30"
          : "hover:border-white/20",
      ].join(" ")}
    >
      <div className={`relative w-full h-36 flex items-center justify-center ${SPECIES_BG[pet.species] ?? "bg-[#0f2e1f]"}`}>
        {pet.photo ? (
          <img
            src={pet.photo}
            alt={pet.name || "Mascota sin nombre"}
            className="w-full h-full object-cover"
          />
        ) : (
          <PawIcon size="large" />
        )}

        <span
          className={[
            "absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full",
            statusStyles[estado] || "bg-gray-500/20 text-gray-300",
          ].join(" ")}
        >
          {estado || "Sin estado"}
        </span>

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

      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-white">{ubicacion || "Mascota sin nombre"}</span>
          <span className="text-xs text-white/40">{distanceLabel}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <Row label="especie" value={pet.species} />
          <Row label="raza" value={pet.breed} />
          <Row label="color" value={pet.color} />
          <Row label="tamaño" value={pet.size} />
          <Row label="sexo" value={pet.sex} />
          <Row label="edad aprox." value={pet.approximateAge} />
          <Row label="contacto" value={pet.contacto} />
          <Row label="descripcion" value={pet.description} />
        </div>
      </div>

      <div className="px-3 pb-3">
        <button className="w-full text-xs text-[#5DCAA5] border border-[#5DCAA5]/30 bg-[#5DCAA5]/10 hover:bg-[#5DCAA5]/20 transition-all rounded-lg py-1.5 font-medium">
          Ver contacto →
        </button>
      </div>
    </article>
  );
}

function Row({ label, value }) {
  return (
    <p className="text-xs text-white/60">
      <span className="text-white/30">{label}: </span>
      {value || "Sin información"}
    </p>
  );
}

function getPetLocationText(pet) {
  return pet.sector || pet.comuna || pet.ubicacion || pet.direccion || pet.resolvedPlace || "";
}

function hasCoordinates(pet) {
  const latitude = Number(pet.latitud);
  const longitude = Number(pet.longitud);

  return Number.isFinite(latitude) && Number.isFinite(longitude);
}

function isMissingLocation(value) {
  return !value || value === "Ubicación no informada" || value === "Ubicación no disponible";
}

import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { ubicacionCoord } from "../../map/services/ubicacionService";
import PawIcon from "../../../shared/components/PawIcon"

const REPORT_STYLES = {
  PERDIDA: "bg-red-500/20 text-red-300 border-red-400/30",
  ENCONTRADA: "bg-[#5DCAA5]/20 text-[#5DCAA5] border-[#5DCAA5]/30",
  AVISTAMIENTO: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
};

export default function ReportDetail({ report, onBack }) {
  const navigate = useNavigate();
  const locationFallback = report ? getReportLocationText(report) : "";
  const initialTitle = report ? (report.name || report.tipoReporte || "Detalle del reporte") : "";
  const [titulo, setTitulo] = useState(initialTitle);
  const [ubicacion, setUbicacion] = useState(locationFallback || "Cargando ubicación...");

  useEffect(() => {
    if (!report) return;
    const controller = new AbortController();

    async function cargarUbicacion() {
      if (!hasCoordinates(report)) {
        setUbicacion(locationFallback || "Sin ubicación");
        return;
      }

      try {
        const place = await ubicacionCoord(report.latitud, report.longitud, controller.signal);
        const partes = place ? place.split(",") : [];
        const formattedPlace = partes.length > 0 ? partes.slice(0, 2).join(",").trim() : "";
        const resolved = isMissingLocation(formattedPlace) ? locationFallback || formattedPlace : formattedPlace;
        setUbicacion(resolved);
        if (!isMissingLocation(formattedPlace)) setTitulo(formattedPlace);
      } catch {
        setUbicacion("Ubicación no disponible");
      }
    }

    cargarUbicacion();
    return () => controller.abort();
  }, [report?.latitud, report?.longitud, locationFallback]);

  if (!report) return null;

  const imageUrl = report.photo || report.imagen_url;
  const reportStyle = REPORT_STYLES[report.tipoReporte] || "bg-white/10 text-white/70 border-white/20";

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-3 py-1.5 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
        >
          Volver a reportes
        </button>

        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportStyle}`}>
            {report.tipoReporte || "Sin tipo"}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/reportes/${report.id}`, { state: { latitud: report.latitud, longitud: report.longitud } })}
            className="cursor-pointer inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            Ver detalle completo
          </button>
        </div>
      </div>

      <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="h-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2e1f] sm:h-112 lg:h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Imagen del reporte ${titulo}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PawIcon size="large" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5DCAA5]">
              Reporte seleccionado
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{titulo}</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {report.description || "Este reporte no tiene descripción registrada."}
            </p>
          </header>

          <section className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Datos de la mascota</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="Especie" value={report.species} />
              <DetailItem label="Raza" value={report.breed} />
              <DetailItem label="Color" value={report.color} />
              <DetailItem label="Tamaño" value={report.size} />
              <DetailItem label="Sexo" value={report.sex} />
              <DetailItem label="Edad aprox." value={report.approximateAge} />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">Información del reporte</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailItem label="ID reporte" value={report.id} />
              <DetailItem label="Fecha" value={formatDate(report.fechaReporte)} />
              <DetailItem label="Ubicación" value={ubicacion} />
            </div>
          </section>

          <section className="rounded-2xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/10 p-4">
            <h3 className="mb-2 text-sm font-semibold text-[#5DCAA5]">Contacto</h3>
            <p className="text-sm text-white/80">{report.contacto || "Sin contacto registrado"}</p>
          </section>
        </div>
      </div>
    </article>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">{label}</p>
      <p className="mt-1 text-sm text-white/80">{value || "Sin información"}</p>
    </div>
  );
}

function getReportLocationText(report) {
  return report.sector || report.comuna || report.ubicacion || report.direccion || report.resolvedPlace || "";
}

function hasCoordinates(report) {
  const latitude = Number(report.latitud);
  const longitude = Number(report.longitud);
  return Number.isFinite(latitude) && Number.isFinite(longitude);
}

function isMissingLocation(value) {
  return !value || value === "Ubicación no informada" || value === "Ubicación no disponible";
}

function formatDate(date) {
  if (!date) return "Sin información";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(parsedDate);
}

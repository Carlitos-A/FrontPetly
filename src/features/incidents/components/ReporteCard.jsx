import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ubicacionCoord } from "../../map/services/ubicacionService";
import PawIcon from "../../../shared/components/PawIcon";

const TYPE_STYLES = {
  PERDIDA: "bg-red-500 text-white",
  ENCONTRADA: "bg-[#5DCAA5] text-[#0a1a10]",
  AVISTAMIENTO: "bg-[#f5a20b] text-[#102218]",
};

export default function ReporteCard({ report }) {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState(report.titulo);

  useEffect(() => {
    if (!report.latitud || !report.longitud) return;

    const controller = new AbortController();

    ubicacionCoord(report.latitud, report.longitud, controller.signal)
      .then((place) => {
        if (place && place !== "Ubicación no informada") setTitulo(place);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [report.latitud, report.longitud]);

  return (
    <article
      onClick={() => navigate(`/reportes/${report.id}`, { state: { latitud: report.latitud, longitud: report.longitud } })}
      className="cursor-pointer overflow-hidden rounded-2xl border border-[#143624]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-44 bg-[#dce9df]">
        {report.imagen ? (
          <img
            src={report.imagen}
            alt={titulo}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center bg-linear-to-br from-[#e9f5ee] to-[#b8dfcd] text-[#143624]">
            <PawIcon size="large" />
          </div>
        )}

        <span
          className={[
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-black",
            TYPE_STYLES[report.tipoReporte] || "bg-[#143624] text-white",
          ].join(" ")}
        >
          {report.tipoLabel}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h2 className="line-clamp-2 text-lg font-black text-[#102218]">
            {titulo}
          </h2>
          <p className="mt-1 text-xs font-bold text-[#102218]/45">
            Publicado {report.fecha}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-[#102218]/65">
          <Info label="Especie" value={report.especie} />
          <Info label="Raza" value={report.raza} />
          <Info label="Color" value={report.color} />
          <Info label="Tamaño" value={report.tamanio} />
          <Info label="Sexo" value={report.sexo} />
          <Info label="Edad" value={report.edad} />
        </div>

        <div className="rounded-xl bg-[#f7faf6] p-3 text-xs font-semibold leading-5 text-[#102218]/68">
          <p className="font-black text-[#2f7f5a]">Descripción</p>
          <p className="mt-2 line-clamp-3">{report.descripcion}</p>
        </div>
      </div>
    </article>
  );
}

function Info({ label, value }) {
  return (
    <p>
      <span className="block text-[#102218]/38">{label}</span>
      <span>{value || "Sin dato"}</span>
    </p>
  );
}


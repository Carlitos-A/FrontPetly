import { useNavigate } from "react-router-dom";

export default function MiniReport({ report }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/reportes/${report.id}`, { state: { latitud: report.latitud, longitud: report.longitud } })}
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg"
    >
      <div className="h-28 bg-[#dce9df]">
        {report.photo ? (
          <img
            src={report.photo}
            alt={report.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-[#143624]">
            🐾
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs font-black text-[#2f7f5a]">
          {report.typeLabel}
        </p>

        <h3 className="mt-1 line-clamp-1 text-sm font-black text-[#102218]">
          {report.speciesLabel}
        </h3>

        <p className="mt-1 text-xs font-semibold text-[#102218]/60">
          {report.sector}
        </p>
      </div>
    </article>
  );
}

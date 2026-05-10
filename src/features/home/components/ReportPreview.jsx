export default function ReportPreview({ report }) {
  const typeStyles = {
    PERDIDA: "bg-[#e51f2e] text-white",
    ENCONTRADA: "bg-[#1a412f] text-white",
    AVISTAMIENTO: "bg-[#f5a20b] text-[#102218]",
  };

  return (
    <article className="min-w-[230px] snap-start overflow-hidden rounded-2xl border border-[#143624]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-36 bg-[#dce9df]">
        {report.photo ? (
          <img
            src={report.photo}
            alt={report.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center bg-linear-to-br from-[#e9f5ee] to-[#b8dfcd] text-[#143624]">
            🐾
          </div>
        )}

        <span
          className={[
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-black",
            typeStyles[report.type] || "bg-[#143624] text-white",
          ].join(" ")}
        >
          {report.typeLabel}
        </span>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-base font-black text-[#102218]">
          {report.speciesLabel}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#102218]/62">
          {report.breed || report.speciesLabel}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-[#102218]/62">
          <span>{report.color}</span>
          <span className="text-right">{report.timeLabel}</span>
          <span className="col-span-2 text-[#2f7f5a]">{report.sector}</span>
        </div>
      </div>
    </article>
  );
}

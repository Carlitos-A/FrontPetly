import { useState } from "react";
import { useReportes } from "../features/incidents/hooks/useReportes";
import ReporteCard from "../features/incidents/components/ReporteCard";
import PawIcon from "../shared/components/PawIcon";

const FILTERS = [
  { label: "Todos", value: "TODOS" },
  { label: "Perdidos", value: "PERDIDA" },
  { label: "Encontrados", value: "ENCONTRADA" },
  { label: "Avistamientos", value: "AVISTAMIENTO" },
];

export default function Reportes() {
  const [activeFilter, setActiveFilter] = useState("TODOS");
  const [search, setSearch] = useState("");
  const { reports, loading } = useReportes({ activeFilter, search });

  return (
    <div className="h-[calc(100vh-3rem)] min-h-0 overflow-y-scroll overscroll-contain bg-[#f7faf6] pb-20 text-[#102218] md:h-[calc(100vh-6rem)]">
      <section className="border-b border-[#143624]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f7f5a]">
            Comunidad Petly
          </p>
          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black text-[#102218]">
                Todos los reportes
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#102218]/65">
                Revisa las mascotas perdidas, encontradas y avistadas que han
                sido publicadas por la comunidad.
              </p>
            </div>

            <div className="rounded-2xl border border-[#143624]/10 bg-[#f7faf6] px-4 py-3 text-sm font-black text-[#102218]">
              {reports.length} reporte{reports.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#143624]/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-black transition",
                  activeFilter === filter.value
                    ? "bg-[#5DCAA5] text-[#0a1a10]"
                    : "bg-[#eef5f0] text-[#102218]/70 hover:bg-[#dceee5]",
                ].join(" ")}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="relative block md:w-80">
            <span className="sr-only">Buscar reportes</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por especie, color, contacto..."
              className="w-full rounded-xl border border-[#143624]/10 bg-[#f7faf6] px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-[#102218]/35 focus:border-[#5DCAA5] focus:ring-4 focus:ring-[#5DCAA5]/20"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-82.5 animate-pulse rounded-2xl bg-[#dce9df]"
              />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <EmptyState
            title="Sin reportes"
            text="No hay reportes que coincidan con los filtros actuales."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {reports.map((report) => (
              <ReporteCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="rounded-2xl border border-[#143624]/10 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#5DCAA5]/15 text-[#143624]">
        <PawIcon />
      </div>
      <h2 className="mt-4 text-xl font-black text-[#102218]">{title}</h2>
      <p className="mt-2 text-sm font-semibold text-[#102218]/60">{text}</p>
    </div>
  );
}


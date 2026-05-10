import { useState } from "react";

import { useReportes } from "../hooks/useReportes";
import ReporteCard from "./ReporteCard";
import BarraReportes from "./BarraReportes";
import EmptyStates from "./EmptyStates";

export default function ReportesPage() {
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
        <BarraReportes
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          search={search}
          onSearchChange={setSearch}
        />
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
          <EmptyStates
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

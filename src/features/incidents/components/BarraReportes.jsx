import { FILTER_OPTIONS } from "../constants/filters";

const REPORT_FILTERS = [
  { label: "Todos", value: "TODOS" },
  ...FILTER_OPTIONS.tipo_reporte,
];

export default function BarraReportes({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#143624]/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {REPORT_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
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
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por especie, color, contacto..."
          className="w-full rounded-xl border border-[#143624]/10 bg-[#f7faf6] px-4 py-3 text-sm font-semibold outline-none transition placeholder:text-[#102218]/35 focus:border-[#5DCAA5] focus:ring-4 focus:ring-[#5DCAA5]/20"
        />
      </label>
    </div>
  );
}

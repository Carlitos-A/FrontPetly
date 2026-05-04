import { FILTER_OPTIONS } from "../constants/filters";

export default function Filters({ value, onChange }) {

  function updateFilter(key, val) {
    onChange({
      ...value,
      [key]: val,
    });
  }

  return (
    <div className="flex gap-3 mb-6 justify-center flex-wrap">

      {/* Todos */}
      <button
        onClick={() =>
          onChange({
            ...value,
            tipo_reporte: null,
            estado: null,
          })
        }
        className={`
      px-5 py-2.5 rounded-lg text-sm font-medium transition-all
      border
      ${!value.tipo_reporte && !value.estado
            ? "bg-[#5DCAA5] text-[#0a1a10] border-[#5DCAA5]"
            : "bg-white/5 text-white border-white/10 hover:bg-white/10"
          }
    `}
      >
        Todos
      </button>

      <div className="flex flex-wrap gap-2 justify-center">
        {FILTER_OPTIONS.tipo_reporte.map((opt) => {
          const isActive = value.tipo_reporte === opt.value;

          return (
            <button
              key={opt.value}
              onClick={() => updateFilter("tipo_reporte", isActive ? null : opt.value)}
              className={`
            px-4 py-2 rounded-lg text-sm transition-all border
            ${isActive
                  ? "bg-[#5DCAA5] text-[#0a1a10] border-[#5DCAA5]"
                  : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                }
          `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import { FILTER_OPTIONS } from "../constants/filters";

export default function Filters({ value, onChange }) {

  function updateFilter(key, val) {
    onChange({
      ...value,
      [key]: val,
    });
  }

  return (
    <div className="flex gap-3 mb-4 justify-center">

      {/* Boton para resetear los filtros a su estado inicial y mostrarlos todos */}
      <button
        onClick={() =>
          onChange({
            species: null,
            status: null,
          })
        }
        className={`px-5 py-3 rounded-lg transition-colors self-stretch sm:self-auto cursor-pointer
    ${!value.species && !value.status
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
      >
        Todos
      </button>

      {/* Division para mostrar los botones de filtro de especie y estado, con estilos condicionales para indicar cuál está activo */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Especie */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTER_OPTIONS.species.map((opt) => {
            const isActive = value.species === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => updateFilter("species", opt.value)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer
                ${isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>


        {/* Estado   */}
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTER_OPTIONS.status.map((opt) => {
            const isActive = value.status === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => updateFilter("status", opt.value)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer
                ${isActive
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
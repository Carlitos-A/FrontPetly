import { FILTER_OPTIONS } from "../constants/filters";

export default function Filters({ value, onChange }) {

  function updateFilter(key, val) {
    onChange({
      ...value,
      [key]: val,
    });
  }

  return (
    <div className="flex gap-2 mb-4">

      <select
        value={value.species}
        onChange={(e) => updateFilter("species", e.target.value)}
      >
        {FILTER_OPTIONS.species.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={value.status}
        onChange={(e) => updateFilter("status", e.target.value)}
      >
        {FILTER_OPTIONS.status.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

    </div>
  );
}
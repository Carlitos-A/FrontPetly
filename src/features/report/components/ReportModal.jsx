import { useState, useEffect } from "react";
 
/**
 * ReportModal
 * Modal para crear un reporte de mascota perdida.
 *
 * Props:
 *   open:     boolean
 *   onClose:  () => void
 *   onSubmit: (data: ReportFormData) => void
 */
 
const EMPTY = {
  name: "",
  species: "dog",
  breed: "",
  color: "",
  sector: "",
  contact: "",
  description: "",
};
 
const SPECIES_OPTIONS = [
  { value: "dog",   label: "Perro" },
  { value: "cat",   label: "Gato" },
  { value: "other", label: "Otro" },
];
 
export default function ReportModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY);
 
  // Cierra con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);
 
  // Bloquea scroll del body mientras está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
 
  if (!open) return null;
 
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(EMPTY);
  }
 
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
 
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={[
          "fixed z-50 inset-x-4 top-1/2 -translate-y-1/2",
          "sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md",
          "bg-white rounded-2xl shadow-xl overflow-hidden",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 id="modal-title" className="text-sm font-medium text-stone-900">
            Reportar mascota perdida
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
            aria-label="Cerrar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
 
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre" required>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: Rocky"
                required
                className={inputCls}
              />
            </Field>
 
            <Field label="Especie" required>
              <select name="species" value={form.species} onChange={handleChange} className={inputCls}>
                {SPECIES_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>
 
          <div className="grid grid-cols-2 gap-3">
            <Field label="Raza">
              <input
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="Ej: Labrador"
                className={inputCls}
              />
            </Field>
            <Field label="Color">
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Ej: Dorado"
                className={inputCls}
              />
            </Field>
          </div>
 
          <Field label="Sector donde se perdió" required>
            <input
              name="sector"
              value={form.sector}
              onChange={handleChange}
              placeholder="Ej: Providencia, Santiago"
              required
              className={inputCls}
            />
          </Field>
 
          <Field label="Contacto (teléfono o email)" required>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="+56 9 1234 5678"
              required
              className={inputCls}
            />
          </Field>
 
          <Field label="Descripción adicional">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Collar, señas particulares, última vez visto..."
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>
 
          {/* Footer actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm text-stone-500 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-medium text-white bg-teal-600 rounded-xl hover:bg-teal-700 active:scale-[0.98] transition-all"
            >
              Publicar reporte
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
 
// ── helpers ──────────────────────────────────────────────────────────────────
 
const inputCls = [
  "w-full px-3 py-2 text-sm rounded-lg bg-stone-50",
  "border border-stone-200 text-stone-900 placeholder-stone-400",
  "focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400",
  "transition-colors",
].join(" ");
 
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-stone-500">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
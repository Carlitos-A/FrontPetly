import { useState, useRef, useEffect } from "react";
import Field from "../../../shared/components/Field";

const ESPECIES = ["PERRO", "GATO", "OTRO"];
const SEXOS = ["MACHO", "HEMBRA", "DESCONOCIDO"];
const TAMANIOS = ["PEQUEÑO", "MEDIANO", "GRANDE"];

const TIPO_CONFIG = {
  PERDIDO:    { label: "Perdido",    bg: "bg-amber-500/15",  text: "text-amber-300",  border: "border-amber-500/30" },
  ENCONTRADO: { label: "Encontrado", bg: "bg-[#5DCAA5]/15",  text: "text-[#5DCAA5]", border: "border-[#5DCAA5]/30" },
  AVISTADO:   { label: "Avistado",   bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
};

const INITIAL_FORM = {
  tipoReporte: "",
  especie: "",
  especiePersonalizada: "",
  sexo: "",
  tamanio: "",
  raza: "",
  colorPrincipal: "",
  edadAproximada: "",
  descripcion: "",
  contacto: "",
};

function getErrors(form, photo) {
  const e = {};
  if (!photo)                            e.photo               = "Agrega una foto";
  if (!form.especie)                     e.especie             = "Selecciona una especie";
  if (form.especie === "OTRO" && !form.especiePersonalizada.trim())
                                         e.especiePersonalizada = "Indica qué especie es";
  if (!form.sexo)                        e.sexo                = "Selecciona el sexo";
  if (!form.tamanio)                     e.tamanio             = "Selecciona el tamaño";
  if (form.edadAproximada && isNaN(Number(form.edadAproximada)))
                                         e.edadAproximada      = "Debe ser un número (ej. 3)";
  if (!form.descripcion.trim())          e.descripcion         = "Agrega una descripción";
  if (!form.contacto.trim())             e.contacto            = "Agrega un contacto";
  return e;
}

export default function FormModal({ open, coords, tipoReporte, onBack, onClose, onSubmit }) {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [photo, setPhoto]     = useState(null);
  const [preview, setPreview] = useState(null);
  const [touched, setTouched] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);

  const fileRef = useRef();

  const errors = getErrors(form, photo);
  const valid  = Object.keys(errors).length === 0;

  const tipoKey   = tipoReporte?.toUpperCase();
  const tipoStyle = TIPO_CONFIG[tipoKey] ?? {
    label: tipoReporte ?? "Reporte",
    bg: "bg-white/10", text: "text-white/60", border: "border-white/20",
  };

  useEffect(() => {
    if (tipoReporte)
      setForm((prev) => ({ ...prev, tipoReporte: tipoReporte.toUpperCase() }));
  }, [tipoReporte]);

  if (!open) return null;

  function touch(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    // Si cambia especie y ya no es OTRO, limpia especiePersonalizada
    if (name === "especie" && value !== "OTRO") {
      setForm((prev) => ({ ...prev, especie: value, especiePersonalizada: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    touch(name);
  }

  function handleBlur(e) { touch(e.target.name); }

  function handlePhoto(file) {
    if (!file || !file.type.startsWith("image/")) { setShowErrorModal(true); return; }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    touch("photo");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      [...Object.keys(INITIAL_FORM), "photo"].map((k) => [k, true])
    );
    setTouched(allTouched);
    if (!valid) return;
    onSubmit({ ...form, photo, lat: coords.lat, lng: coords.lng });
  }

  function reset() {
    setForm(INITIAL_FORM); setPhoto(null); setPreview(null); setTouched({});
  }

  function Err({ field }) {
    if (!touched[field] || !errors[field]) return null;
    return <span className="text-[11px] text-red-400 mt-0.5 block">{errors[field]}</span>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[80vh] sm:h-[75vh] mb-20 bg-[#0a1a10] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Parte de arriba */}
        <div className="relative flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
          <button onClick={() => { reset(); onBack(); }} className="text-sm text-white/70 bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-1.5 rounded-lg transition cursor-pointer">
            Volver
          </button>

          {/* Tipo reporte*/}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${tipoStyle.bg} ${tipoStyle.text} ${tipoStyle.border}`}>
              <span>{tipoStyle.icon}</span>
              {tipoStyle.label}
            </span>
            <span className="text-[10px] text-white/30">
              {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
            </span>
          </div>

          <button onClick={() => { reset(); onClose(); }} className="ml-auto text-white/50 hover:text-white/80 cursor-pointer">✕</button>
        </div>

        {/* Cuerpo del form */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

          {/* Fotico */}
          <div>
            <SectionLabel>Foto *</SectionLabel>
            <div
              onClick={() => fileRef.current.click()}
              onDrop={(e) => { e.preventDefault(); handlePhoto(e.dataTransfer.files[0]); }}
              onDragOver={(e) => e.preventDefault()}
              className={`mt-2 h-28 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition
                ${touched.photo && errors.photo
                  ? "border-red-500/60 hover:border-red-400"
                  : "border-white/20 hover:border-[#5DCAA5] hover:bg-white/5"}`}
            >
              {preview
                ? <img src={preview} className="h-full w-full object-cover rounded-xl" />
                : <span className="text-white/40 text-xs">Click o arrastra una imagen</span>
              }
            </div>
            <Err field="photo" />
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={(e) => handlePhoto(e.target.files[0])} />
          </div>

          {/* Datos mascota */}
          <div>
            <SectionLabel>Datos de la mascota</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-2">

              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2 items-start">
                  <div>
                    <Field label="Especie *">
                      <select name="especie" value={form.especie} onChange={handleChange} onBlur={handleBlur}>
                        <option value="">-</option>
                        {ESPECIES.map((e) => <option key={e}>{e}</option>)}
                      </select>
                    </Field>
                    <Err field="especie" />
                  </div>
                  <div className={`transition-all duration-200 overflow-hidden ${form.especie === "OTRO" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                    <Field label="¿Cuál especie? *">
                      <input
                        name="especiePersonalizada"
                        value={form.especiePersonalizada}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ej. Conejo, Tortuga..."
                        autoFocus={form.especie === "OTRO"}
                      />
                    </Field>
                    <Err field="especiePersonalizada" />
                  </div>
                </div>
              </div>

              <div>
                <Field label="Sexo *">
                  <select name="sexo" value={form.sexo} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">-</option>
                    {SEXOS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Err field="sexo" />
              </div>

              <div>
                <Field label="Tamaño *">
                  <select name="tamanio" value={form.tamanio} onChange={handleChange} onBlur={handleBlur}>
                    <option value="">-</option>
                    {TAMANIOS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Err field="tamanio" />
              </div>

              <div>
                <Field label="Edad aprox.">
                  <input name="edadAproximada" value={form.edadAproximada} onChange={handleChange} onBlur={handleBlur} placeholder="ej. 2" />
                </Field>
                <Err field="edadAproximada" />
              </div>

              <div>
                <Field label="Raza">
                  <input name="raza" value={form.raza} onChange={handleChange} placeholder="ej. Labrador" />
                </Field>
              </div>

              <div className="col-span-2">
                <Field label="Color principal">
                  <input name="colorPrincipal" value={form.colorPrincipal} onChange={handleChange} placeholder="ej. Café" />
                </Field>
              </div>

            </div>
          </div>


          <div className="flex flex-col gap-1">
            <div>
              <Field label="Descripción *">
                <textarea rows={2} name="descripcion" value={form.descripcion} onChange={handleChange} onBlur={handleBlur} placeholder="Señas particulares, comportamiento..." />
              </Field>
              <Err field="descripcion" />
            </div>
            <div>
              <Field label="Contacto *">
                <input name="contacto" value={form.contacto} onChange={handleChange} onBlur={handleBlur} placeholder="Teléfono o correo" />
              </Field>
              <Err field="contacto" />
            </div>
          </div>

        </div>

        {/* Abajo boton */}
        <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex justify-center">
          <button
            onClick={handleSubmit}
            className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 ease-out
              ${valid
                ? "bg-[#5DCAA5] text-[#0a1a10] shadow-lg shadow-[#5DCAA5]/30 hover:scale-110 active:scale-95 cursor-pointer"
                : "bg-white/10 text-white/20 border border-white/10 scale-95 cursor-not-allowed"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

      </div>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0a1a10] border border-red-500/30 p-6 rounded-xl text-center">
            <p className="text-white mb-4">Solo se permiten imágenes</p>
            <button onClick={() => setShowErrorModal(false)} className="text-sm text-white/70 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="text-[11px] text-[#5DCAA5]/80 uppercase tracking-widest">{children}</p>;
}
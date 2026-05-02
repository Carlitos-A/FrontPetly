import { GENDERS } from "../constants/constantes";
import Field from "../../../shared/components/Field";

export default function SizeGender({
    formData,
    handleChange,
    handleSelect,
    next,
    back,
    error,
}) {

    // Validación correcta con formData
    const isStep2Valid =
        formData.chip?.trim() &&
        formData.name?.trim() &&
        formData.gender &&
        formData.color?.trim() &&
        formData.breed?.trim() &&
        formData.description?.trim();

    return (
        <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto">

            {/* Título */}
            <div>
                <h2 className="text-1xl sm:text-3xl font-bold text-white mb-1">
                    Información de la mascota
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-400">
                    Ingrese los datos de tu mascota
                </p>

                {error && (
                    <div className="mt-2 p-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                        {error}
                    </div>
                )}
            </div>

            {/* Campos */}
            <div className="space-y-3">

                {/* Chip */}
                <Field label="Número identificador *">
                    <>
                        <input
                            type="text"
                            name="chip"
                            placeholder="Ej: 123456789"
                            value={formData.chip}
                            onChange={handleChange}
                        />
                        {!formData.chip?.trim() && (
                            <p className="text-xs text-red-400 mt-0.5">
                                Obligatorio*
                            </p>
                        )}
                    </>
                </Field>

                {/* Nombre */}
                <Field label="Nombre *">
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ej: Max, Luna, Fluffy"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {!formData.name?.trim() && (
                            <p className="text-xs text-red-400 mt-1">
                                Obligatorio*
                            </p>
                        )}
                    </>
                </Field>

                {/* Género */}
                <Field label="Género *">
                    <>
                        <div className="grid grid-cols-2 gap-2">
                            {GENDERS.map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => handleSelect("gender", g)}
                                    className={`py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 border-2 cursor-pointer ${formData.gender === g
                                        ? "bg-[#369467] border-[#5DCAA5] text-white shadow-lg shadow-[#369467]/50"
                                        : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/10"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>

                        {!formData.gender && (
                            <p className="text-xs text-red-400 mt-1">
                                Selecciona un género
                            </p>
                        )}
                    </>
                </Field>

                {/* Color */}
                <Field label="Color *">
                    <>
                        <input
                            type="text"
                            name="color"
                            placeholder="Ej: Negro, Blanco y marrón"
                            value={formData.color || ""}
                            onChange={handleChange}
                        />
                        {!formData.color?.trim() && (
                            <p className="text-xs text-red-400 mt-1">
                                Obligatorio*
                            </p>
                        )}
                    </>
                </Field>

                {/* Raza */}
                <Field label="Raza *">
                    <>
                        <input
                            type="text"
                            name="breed"
                            placeholder="Ej: Labrador, Persa"
                            value={formData.breed}
                            onChange={handleChange}
                        />
                        {!formData.breed?.trim() && (
                            <p className="text-xs text-red-400 mt-1">
                                Obligatorio*
                            </p>
                        )}
                    </>
                </Field>

                {/* Descripción */}
                <Field label="Descripción *">
                    <>
                        <input
                            className="sm:min-h-20"
                            type="text"
                            name="description"
                            placeholder="Cuéntanos sobre tu mascota"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                        {!formData.description?.trim() && (
                            <p className="text-xs text-red-400 mt-1">
                                Obligatorio*
                            </p>
                        )}
                    </>
                </Field>

            </div>

            {/* Botones */}
            <div className="flex gap-2 pt-2 sticky bottom-0 bg-linear-to-t from-[#0f2818] to-transparent py-2">

                <button
                    type="button"
                    onClick={back}
                    className="flex-1 bg-white/10 hover:bg-white/15 text-white font-semibold py-2 rounded-lg transition-colors duration-300 border border-white/20 text-sm cursor-pointer"
                >
                    Volver
                </button>

                <button
                    type="submit"
                    disabled={!isStep2Valid}
                    className="flex-1 bg-[#369467] hover:bg-[#2d7a56] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors duration-300 text-sm cursor-pointer"
                >
                    Registrar
                </button>

            </div>
        </div>
    );
}
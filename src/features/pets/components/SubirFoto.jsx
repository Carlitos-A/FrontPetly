import { useRef } from "react";
import { PET_TYPES } from "../constants/constantes";

export default function SubirFoto({
    formData,
    handleChange,
    handleSelect,
    handlePhoto,
    preview,
    next,
}) {
    const fileRef = useRef();

    // Validación correcta con formData
    const isStep1Valid =
        formData.type && 
        (formData.type !== "other" || formData.otherPetType?.trim());

    return (
        <div className="space-y-4">
            {/* Título */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Selecciona el tipo de mascota
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                    ¿Qué tipo de mascota quieres registrar?
                </p>
            </div>

            {/* Grid de tipos */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {PET_TYPES.map((pt) => (
                    <button
                        key={pt.id}
                        type="button"
                        onClick={() => handleSelect("type", pt.id)}
                        className={`p-3 sm:p-4 rounded-lg sm:rounded-2xl cursor-pointer transition-all duration-300 border-2 flex flex-col items-center gap-2 ${formData.type === pt.id
                                ? "bg-[#369467] border-[#5DCAA5] shadow-lg shadow-[#369467]/50"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                    >
                        <div className="text-xs sm:text-sm font-medium text-white text-center">
                            {pt.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* Campo "otro tipo" */}
            {formData.type === "other" && (
                <div className="space-y-2 bg-white/5 border border-white/20 rounded-lg p-4">
                    <label className="block text-white font-medium text-sm">
                        ¿Qué tipo de mascota tienes?
                    </label>

                    <input
                        type="text"
                        name="otherPetType"
                        placeholder="Serpiente, Tortuga, Hamster"
                        value={formData.otherPetType || ""}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5DCAA5] focus:bg-white/15 transition-all duration-300"
                    />

                    {!formData.otherPetType?.trim() && (
                        <p className="text-xs text-red-400">
                            Obligatorio*
                        </p>
                    )}
                </div>
            )}

            {/* Subir foto */}
            <div className="space-y-10">
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                    Sube una foto
                </h3>

                <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="w-full border-2 border-dashed border-white/20 rounded-lg sm:rounded-2xl p-6 sm:p-8 hover:border-[#5DCAA5] hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer min-h-40 sm:min-h-48"
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Foto de la mascota"
                                className="max-w-20 sm:max-w-24 max-h-20 sm:max-h-24 object-contain rounded-lg"
                            />
                            <p className="text-xs sm:text-sm text-gray-400">    
                                Click para cambiar
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="text-center">
                                <p className="text-white font-medium text-sm">
                                    Click para subir
                                </p>
                                <p className="text-xs text-gray-400">
                                    o arrastra aquí
                                </p>
                            </div>
                        </>
                    )}

                    <input
                        ref={fileRef}
                        type="file"
                        hidden
                        onChange={(e) => handlePhoto(e.target.files[0])}
                        accept="image/*"
                    />
                </button>
            </div>

            {/* Botón continuar */}
            <div className="pt-2">
                <button
                    type="button"
                    onClick={next}
                    disabled={!isStep1Valid}
                    className=" cursor-pointer w-full bg-[#369467] hover:bg-[#2d7a56] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl transition-colors duration-300 text-sm sm:text-base"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
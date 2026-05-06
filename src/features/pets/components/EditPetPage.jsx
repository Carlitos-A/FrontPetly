import { Link } from "react-router-dom";
import { GENDERS, PET_TYPES } from "../constants/constantes";
import { useEditPet } from "../hooks/useEditPet";
import Field from "../../../shared/components/Field";

export default function EditPetPage() {
    const {
        formData,
        preview,
        loading,
        saving,
        error,
        success,
        handleChange,
        handlePhoto,
        handleSubmit,
    } = useEditPet();

    if (loading) {
        return (
            <section className="min-h-screen pt-24 px-4 flex justify-center text-white">
                <p>Cargando datos de la mascota...</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-20 pb-10 px-4 flex justify-center overflow-y-auto">
            <div className="w-full max-w-4xl">
                <div className="mb-6">
                    <p className="text-[#5DCAA5] text-sm font-semibold uppercase tracking-wide">Mis mascotas</p>
                    <h1 className="text-3xl text-white font-bold">Editar datos de la mascota</h1>
                    <p className="text-white/60 mt-2">Modifica la información y guarda los cambios.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
                    {error && <p className="rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 p-3 text-sm">{error}</p>}
                    {success && <p className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 p-3 text-sm">{success}</p>}

                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                        <div className="space-y-3">
                            <label className="text-[11px] text-white uppercase tracking-wide font-bold">Foto</label>
                            <label className="block cursor-pointer border-2 border-dashed border-white/20 rounded-2xl min-h-56 bg-white/5 hover:border-[#5DCAA5] transition-colors overflow-hidden">
                                {preview ? (
                                    <img src={preview} alt="Vista previa de la mascota" className="w-full h-56 object-cover" />
                                ) : (
                                    <div className="h-56 flex items-center justify-center text-white/40 text-sm">Subir foto</div>
                                )}
                                <input hidden type="file" accept="image/*" onChange={(e) => handlePhoto(e.target.files[0])} />
                            </label>
                            <p className="text-white/45 text-xs">Haz click en el recuadro para cambiar la imagen.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Field label="Identificador *">
                                <input name="chip" value={formData.chip} onChange={handleChange} placeholder="Nro. chip u otro identificador" />
                            </Field>
                            <Field label="Nombre *">
                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre de la mascota" />
                            </Field>
                            <Field label="Tipo *">
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value="">Selecciona un tipo</option>
                                    {PET_TYPES.map((type) => (
                                        <option key={type.id} value={type.id}>{type.label}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Sexo *">
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Selecciona el sexo</option>
                                    {GENDERS.map((gender) => (
                                        <option key={gender} value={gender}>{gender}</option>
                                    ))}
                                </select>
                            </Field>
                            {formData.type === "OTRO" && (
                                <Field label="Otro tipo *">
                                    <input name="otherPetType" value={formData.otherPetType} onChange={handleChange} placeholder="Ej: Tortuga, conejo" />
                                </Field>
                            )}
                            <Field label="Color *">
                                <input name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
                            </Field>
                            <Field label="Raza *">
                                <input name="breed" value={formData.breed} onChange={handleChange} placeholder="Raza" />
                            </Field>
                            <Field label="Edad en años *">
                                <input name="age" value={formData.age} onChange={handleChange} placeholder="Edad" />
                            </Field>
                            <div className="md:col-span-2 flex flex-col gap-2">
                                <label className="text-[11px] text-white uppercase tracking-wide font-bold">Descripción *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe rasgos importantes de tu mascota"
                                    rows="4"
                                    className="w-full bg-white/6 border border-white/12 rounded-lg px-4 py-3 text-[14px] text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-[rgba(93,202,165,0.8)] focus:bg-[rgba(93,202,165,0.08)]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                        <Link className="text-center text-white bg-white/10 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/20" to="/mis-mascotas">
                            Cancelar
                        </Link>
                        <button disabled={saving} className="bg-[#369467] hover:bg-[#2d7a56] disabled:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors" type="submit">
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

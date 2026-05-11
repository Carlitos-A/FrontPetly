import { Link } from "react-router-dom";
import Field from "../../../shared/components/Field";
import { useEditProfile } from "../hooks/UseEditProfile";
import { useAuth } from "../../auth/context/authContext";

export default function EditProfilePage() {
    const { user } = useAuth();
    const {
        formData,
        loading,    
        error,
        success,
        handleChange,
        handleSubmit,
    } = useEditProfile();

    if (!user) {
        return (
            <section className="min-h-screen pt-24 px-4 flex items-start justify-center">
                <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white">
                    <h1 className="text-2xl font-bold mb-3">Inicia sesión</h1>
                    <p className="text-white/60 mb-6">Debes iniciar sesión para editar tus datos.</p>
                    <Link className="inline-flex bg-[#369467] hover:bg-[#2d7a56] px-5 py-3 rounded-xl font-semibold" to="/login">
                        Ir al login
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-20 pb-10 px-4 flex justify-center overflow-y-auto">
            <div className="w-full max-w-3xl">
                <div className="mb-6">
                    <p className="text-[#5DCAA5] text-sm font-semibold uppercase tracking-wide">Mi cuenta</p>
                    <h1 className="text-3xl text-white font-bold">Editar datos del usuario</h1>
                    <p className="text-white/60 mt-2">Actualiza tu información personal y de contacto.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl space-y-5">
                    {error && <p className="rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 p-3 text-sm">{error}</p>}
                    {success && <p className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 p-3 text-sm">{success}</p>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Nombre *">
                            <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" />
                        </Field>
                        <Field label="Apellido paterno *">
                            <input name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} placeholder="Apellido paterno" />
                        </Field>
                        <Field label="Apellido materno">
                            <input name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} placeholder="Apellido materno" />
                        </Field>
                        <Field label="Teléfono">
                            <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej: 912345678" />
                        </Field>
                        <Field label="Correo *">
                            <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="correo@ejemplo.com" />
                        </Field>
                        <Field label="Dirección">
                            <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
                        </Field>
                        <Field label="RUN">
                            <input name="run" value={formData.run} readOnly disabled placeholder="" className="cursor-not-allowed opacity-70" />
                        </Field>
                        <Field label="DV">
                            <input name="dv" value={formData.dv} onChange={handleChange} placeholder="Dígito verificador" maxLength="1" />
                        </Field>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                        <Link className="text-center text-white bg-white/10 px-5 py-3 rounded-xl border border-white/20 hover:bg-white/20" to="/perfil">
                            Cancelar
                        </Link>
                        <button disabled={loading} className="bg-[#369467] hover:bg-[#2d7a56] disabled:bg-gray-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors" type="submit">
                            {loading ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
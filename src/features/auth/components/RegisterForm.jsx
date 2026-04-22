import { useRegisterForm } from "../hooks/useRegisterForm";
import Field from "../../../shared/components/Field";


export default function RegisterForm() {
    const {
        formData,
        handleChange,
        handleSubmit,
        showPassword,
        togglePassword,
        loading,
        error,
    } = useRegisterForm();


    return (
        <div className="flex h-screen overflow-hidden font-['DM_Sans',sans-serif]">

            {/* PANEL IZQUIERDO */}
            <div className="hidden md:flex md:w-[45%] flex-col justify-between p-10 relative overflow-hidden bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
                <img src="src/assets/heromascotas.jpg" alt="Register" />

            </div>

            {/* PANEL DERECHO */}
            <div className="w-full md:w-[55%] flex flex-col justify-center px-6 md:px-16 py-10 bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] backdrop-blur-xl overflow-y-auto">

                <h2 className="text-[2rem] font-bold text-white mb-1">
                    Crear cuenta
                </h2>
                <p className="text-white/60 text-sm mb-8">Únete a nuestra comunidad</p>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Nombre + Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Nombre ocupa toda la fila */}
                        <div className="sm:col-span-2">
                            <Field label="Nombre">
                                <input
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Field>
                        </div>

                        {/* Apellido Paterno */}
                        <Field label="Apellido Paterno">
                            <input
                                name="apellido_paterno"
                                placeholder="Apellido paterno"
                                value={formData.apellido_paterno}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        {/* Apellido Materno */}
                        <Field label="Apellido Materno">
                            <input
                                name="apellido_materno"
                                placeholder="Apellido materno"
                                value={formData.apellido_materno}
                                onChange={handleChange}
                            />
                        </Field>

                    </div>

                    {/* Teléfono */}
                    <Field label="Teléfono">
                        <input
                            name="telefono"
                            placeholder="912345678"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Dirección */}
                    <Field label="Dirección">
                        <input
                            name="direccion"
                            placeholder="Calle 123, comuna"
                            value={formData.direccion}
                            onChange={handleChange}
                        />
                    </Field>

                    {/* Correo */}
                    <Field label="Correo">
                        <input
                            type="email"
                            name="correo"
                            placeholder="tu@email.com"
                            value={formData.correo}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Contraseña */}
                    <Field label="Contraseña">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="contrasena"
                                placeholder="Mínimo 8 caracteres"
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white/80"
                            >
                                {showPassword ? "Ocultar" : "Ver"}
                            </button>
                        </div>
                    </Field>

                    {/* RUN */}
                    <Field label="RUN">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="run"
                                placeholder="12345678"
                                value={formData.run}
                                onChange={handleChange}
                                required
                            />

                            <span className="text-white/50 font-medium">-</span>

                            <input
                                type="text"
                                name="dv"
                                placeholder="9"
                                value={formData.dv || ""}
                                onChange={handleChange}
                                maxLength={1}
                                required
                            />
                        </div>
                    </Field>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 py-3 px-4 rounded-lg bg-linear-to-r from-[#5dCAA5] to-[#4db896] text-[#0a1a10] font-semibold text-sm hover:shadow-lg hover:shadow-[#5dCAA5]/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                        {loading ? "Creando..." : "Crear cuenta"}
                    </button>

                </form>
            </div>
        </div>
    );
}
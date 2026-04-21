import { useRegisterForm } from "../hooks/useRegisterForm";
import Field from "../../../shared/components/Field";

export default function RegisterForm() {
    const {
        formData,
        handleChange,
        handleSubmit,
        showPassword,
        togglePassword,
        hasPet,
        setHasPet,
        loading,
    } = useRegisterForm();

    const petOptions = [
        { value: "si", label: "Sí, tengo" },
        { value: "no", label: "No tengo" },
    ];

    const cities = [
        "Santiago",
        "Valparaíso",
        "Concepción",
        "La Serena",
        "Antofagasta",
        "Temuco",
        "Rancagua",
        "Talca",
        "Arica",
    ];

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

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Nombre + Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nombre">
                            <input
                                name="nombre"
                                placeholder="Tu nombre completo"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field label="Teléfono">
                            <input
                                name="telefono"
                                placeholder="+56 9 1234 5678"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </Field>
                    </div>

                    {/* Email */}
                    <Field label="Email">
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Field>

                    {/* Password */}
                    <Field label="Contraseña">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Mínimo 8 caracteres"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white/80 transition-colors"
                            >
                                {showPassword ? "Ocultar" : "Ver"}
                            </button>
                        </div>
                    </Field>

                    {/* Ciudad */}
                    <Field label="Ciudad">
                        <select
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Selecciona tu ciudad
                            </option>

                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </Field>

                    {/* HasPet */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] text-white/40 uppercase tracking-wide font-semibold">
                            ¿Tienes mascota?
                        </span>

                        <div className="flex gap-3">
                            {petOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setHasPet(opt.value)}
                                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${hasPet === opt.value
                                        ? "bg-[#5dCAA5] text-[#0a1a10] border-[#5dCAA5]"
                                        : "bg-white/6 text-white border-white/12 hover:border-white/25 hover:bg-white/10"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 py-3 px-4 rounded-lg bg-gradient-to-r from-[#5dCAA5] to-[#4db896] text-[#0a1a10] font-semibold text-sm hover:shadow-lg hover:shadow-[#5dCAA5]/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creando..." : "Crear cuenta"}
                    </button>

                </form>
            </div>
        </div>
    );
}
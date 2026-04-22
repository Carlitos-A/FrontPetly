import { useLoginForm } from "../hooks/useLoginForm";
import Field from "../../../shared/components/Field";

export default function LoginForm() {
    const {
        formData,
        handleChange,
        handleSubmit,
        showPassword,
        togglePassword,
        loading,
        error,
    } = useLoginForm();

    return (
        <div className="flex min-h-screen font-['DM_Sans',sans-serif]">

            {/* PANEL IZQUIERDO (FORMULARIO) */}
            <div className="w-full pb-70 md:w-[55%] flex flex-col justify-center px-6 md:px-16 py-10 bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] backdrop-blur-xl overflow-y-auto">

                <h2 className="text-[2rem] font-bold text-white mb-1">
                    Iniciar sesión
                </h2>
                <p className="text-white/60 text-sm mb-8">
                    Accede a tu cuenta
                </p>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

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
                                placeholder="Tu contraseña"
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 py-3 px-4 rounded-lg bg-linear-to-r from-[#5dCAA5] to-[#4db896] text-[#0a1a10] font-semibold text-sm hover:shadow-lg hover:shadow-[#5dCAA5]/25 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>

                </form>
            </div>

            {/* PANEL DERECHO (IMAGEN) */}
            <div className="hidden md:flex md:w-[45%] items-center justify-center p-10 relative overflow-hidden bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
                <img
                    src="src/assets/herologin.jpg"
                    alt="Login"
                    className="w-full h-full object-contain rounded-xl"
                />
            </div>
        </div>
    );
}
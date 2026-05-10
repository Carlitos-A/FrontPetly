export default function CoincidenciaSection({ onConfirmar, onRechazar, loading, resultado }) {
    if (resultado) {
        return (
            <div
                className={`rounded-2xl border p-4 text-sm font-medium ${
                    resultado.tipo === "exito"
                        ? "border-[#5DCAA5]/30 bg-[#5DCAA5]/10 text-[#5DCAA5]"
                        : resultado.tipo === "error"
                        ? "border-red-400/30 bg-red-500/10 text-red-300"
                        : "border-white/20 bg-white/5 text-white/70"
                }`}
            >
                {resultado.texto}
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
            <div className="mb-4">
                <h3 className="text-base font-semibold text-yellow-300">Coincidencia potencial</h3>
                <p className="mt-1 text-sm text-white/60">
                    ¿Este reporte coincide con tu mascota perdida? Confirma o rechaza la coincidencia.
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onConfirmar}
                    disabled={loading}
                    className="flex-1 rounded-xl border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-4 py-2.5 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20 disabled:opacity-50"
                >
                    Confirmar coincidencia
                </button>
                <button
                    onClick={onRechazar}
                    disabled={loading}
                    className="flex-1 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                >
                    Rechazar coincidencia
                </button>
            </div>
        </div>
    );
}

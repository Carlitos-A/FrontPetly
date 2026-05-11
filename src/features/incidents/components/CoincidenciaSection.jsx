const SCORE_LABELS = [
    { key: "score_especie", label: "Especie" },
    { key: "score_raza", label: "Raza" },
    { key: "score_color", label: "Color" },
    { key: "score_ubicacion", label: "Ubicación" },
    { key: "score_temporal", label: "Fecha" },
    { key: "score_descripcion", label: "Descripción" },
];

function ScoreBar({ label, value }) {
    const pct = Math.round((value ?? 0) * 100);
    const color = pct >= 80 ? "bg-[#5DCAA5]" : pct >= 50 ? "bg-yellow-400" : "bg-red-400";
    return (
        <div className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-[11px] text-white/40">{label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="w-8 text-right text-[11px] font-medium text-white/60">{pct}%</span>
        </div>
    );
}

export default function CoincidenciaSection({ onConfirmar, onRechazar, loading, resultado, coincidencia }) {
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

    const scoreGlobal = coincidencia?.score != null ? Math.round(coincidencia.score * 100) : null;

    return (
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-semibold text-yellow-300">Coincidencia potencial</h3>
                    <p className="mt-1 text-sm text-white/60">
                        ¿Este reporte coincide con tu mascota perdida? Confirma o rechaza la coincidencia.
                    </p>
                </div>
                {scoreGlobal != null && (
                    <span className="shrink-0 rounded-full bg-yellow-400/20 px-3 py-1 text-sm font-bold text-yellow-300">
                        {scoreGlobal}%
                    </span>
                )}
            </div>

            {coincidencia && (
                <div className="mb-4 flex flex-col gap-2 rounded-xl bg-black/10 p-3">
                    {SCORE_LABELS.map(({ key, label }) =>
                        coincidencia[key] != null && (
                            <ScoreBar key={key} label={label} value={coincidencia[key]} />
                        )
                    )}
                </div>
            )}

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

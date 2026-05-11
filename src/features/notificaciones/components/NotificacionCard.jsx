const TIPO_CONFIG = {
    COINCIDENCIA_POTENCIAL: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        label: "Coincidencia",
    },
    MASCOTA_ENCONTRADA: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "text-[#5DCAA5]",
        bg: "bg-[#5DCAA5]/10",
        border: "border-[#5DCAA5]/20",
        label: "Mascota encontrada",
    },
    REPORTE_CREADO: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        label: "Reporte creado",
    },
    REPORTE_ACTUALIZADO: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        ),
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20",
        label: "Reporte actualizado",
    },
    COMENTARIO: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
        ),
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        label: "Comentario",
    },
    SISTEMA: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
        ),
        color: "text-white/60",
        bg: "bg-white/5",
        border: "border-white/10",
        label: "Sistema",
    },
};

function formatFecha(fechaStr) {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const ahora = new Date();
    const diffMs = ahora - fecha;
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);

    if (diffMin < 1) return "Ahora";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    if (diffH < 24) return `Hace ${diffH} h`;
    if (diffD < 7) return `Hace ${diffD} d`;
    return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
}

export default function NotificacionCard({ notificacion, onLeer, onEliminar, onClickCard }) {
    const config = TIPO_CONFIG[notificacion.tipo] ?? TIPO_CONFIG.SISTEMA;
    const tieneReporte = Boolean(notificacion.idReporte ?? notificacion.id_reporte);

    return (
        <div
            onClick={tieneReporte ? () => onClickCard(notificacion) : undefined}
            className={`relative flex gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200
                ${notificacion.leida
                    ? "bg-white/5 border-white/10"
                    : "bg-white/10 border-white/20 shadow-lg"
                }
                ${tieneReporte ? "cursor-pointer hover:bg-white/15" : ""}`}
        >
            {/* Indicador no leída */}
            {!notificacion.leida && (
                <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#5DCAA5]" />
            )}

            {/* Icono tipo */}
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl border ${config.bg} ${config.border} ${config.color}`}>
                {config.icon}
            </div>

            {/* Contenido */}
            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${notificacion.leida ? "text-white/70" : "text-white"}`}>
                        {notificacion.titulo}
                    </p>
                    <span className="shrink-0 text-xs text-white/40">
                        {formatFecha(notificacion.fechaCreacion)}
                    </span>
                </div>

                <p className="mt-1 text-sm text-white/60 leading-relaxed">
                    {notificacion.mensaje}
                </p>

                <div className="mt-3 flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${config.color}`}>
                        {config.label}
                    </span>

                    {!notificacion.leida && (
                        <button
                            onClick={e => { e.stopPropagation(); onLeer(notificacion.id); }}
                            className="text-xs text-[#5DCAA5] hover:text-[#5DCAA5]/80 transition-colors"
                        >
                            Marcar como leída
                        </button>
                    )}

                    <button
                        onClick={e => { e.stopPropagation(); onEliminar(notificacion.id); }}
                        className="ml-auto text-xs text-white/30 hover:text-red-400 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

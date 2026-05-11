import { useEffect, useState } from "react";
import { fetchPetById } from "../../incidents/services/fetchPets";
import PawIcon from "../../../shared/components/PawIcon";
const REPORT_STYLES = {
    PERDIDA: "bg-red-500/20 text-red-300 border-red-400/30",
    ENCONTRADA: "bg-[#5DCAA5]/20 text-[#5DCAA5] border-[#5DCAA5]/30",
    AVISTAMIENTO: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
};

function formatDate(date) {
    if (!date) return "Sin información";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

function DetailRow({ label, value }) {
    if (!value) return null;
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/30">{label}</p>
            <p className="mt-0.5 text-sm text-white/80">{value}</p>
        </div>
    );
}

function StepDetalle({ reporte, esCoincidencia, onVerCoincidencia }) {
    const imageUrl = reporte.photo || reporte.imagen_url;
    const reportStyle = REPORT_STYLES[reporte.tipoReporte] || "bg-white/10 text-white/70 border-white/20";

    return (
        <div className="flex flex-col gap-4">
            {/* Imagen */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f2e1f]">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Imagen del reporte"
                        className="h-52 w-full object-cover sm:h-64"
                    />
                ) : (
                    <div className="flex h-52 items-center justify-center sm:h-64">
                        <PawIcon size="large" />
                    </div>
                )}
            </div>

            {/* Badge tipo + descripción */}
            <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-6 text-white/60">
                    {reporte.description || "Sin descripción registrada."}
                </p>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${reportStyle}`}>
                    {reporte.tipoReporte || "Sin tipo"}
                </span>
            </div>

            {/* Datos de la mascota */}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">Datos de la mascota</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <DetailRow label="Especie" value={reporte.species} />
                    <DetailRow label="Raza" value={reporte.breed} />
                    <DetailRow label="Color" value={reporte.color} />
                    <DetailRow label="Tamaño" value={reporte.size} />
                    <DetailRow label="Sexo" value={reporte.sex} />
                    <DetailRow label="Edad" value={reporte.approximateAge} />
                </div>
            </div>

            {/* Info del reporte */}
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/50">Información del reporte</p>
                <div className="grid grid-cols-2 gap-3">
                    <DetailRow label="ID reporte" value={reporte.id} />
                    <DetailRow label="Fecha" value={formatDate(reporte.fechaReporte)} />
                    <DetailRow label="Estado" value={reporte.estadoReporte} />
                </div>
            </div>

            {/* Contacto */}
            <div className="rounded-2xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/10 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#5DCAA5]/70">Contacto</p>
                <p className="text-sm text-white/80">{reporte.contacto || "Sin contacto registrado"}</p>
            </div>

            {/* CTA para coincidencia */}
            {esCoincidencia && (
                <button
                    onClick={onVerCoincidencia}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    Revisar coincidencia potencial
                    <span aria-hidden="true">→</span>
                </button>
            )}
        </div>
    );
}

function StepCoincidencia({ reporte, onConfirmar, onRechazar, accionLoading, resultado, onVolver }) {
    const imageUrl = reporte.photo || reporte.imagen_url;

    if (resultado) {
        const esConfirmado = resultado === "confirmado";
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${esConfirmado ? "border-[#5DCAA5] bg-[#5DCAA5]/10" : "border-red-400 bg-red-500/10"}`}>
                    {esConfirmado ? (
                        <svg className="w-8 h-8 text-[#5DCAA5]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
                <div>
                    <p className={`text-lg font-bold ${esConfirmado ? "text-[#5DCAA5]" : "text-red-300"}`}>
                        {esConfirmado ? "¡Coincidencia confirmada!" : "Coincidencia rechazada"}
                    </p>
                    <p className="mt-2 text-sm text-white/50">
                        {esConfirmado
                            ? "Hemos notificado al reportante. Pronto recibirás más información."
                            : "Seguiremos buscando coincidencias para tu mascota."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                <p className="text-sm font-semibold text-yellow-300">¿Es tu mascota?</p>
                <p className="mt-1 text-sm text-white/50">
                    Encontramos un reporte que podría coincidir con tu mascota perdida. Revisa los datos y confirma si es ella.
                </p>
            </div>

            {/* Resumen compacto del reporte */}
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0f2e1f]">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Mascota" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <PawIcon />
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center gap-1.5">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70">
                        {reporte.species && <span><span className="text-white/30 text-xs">Especie</span> {reporte.species}</span>}
                        {reporte.breed && <span><span className="text-white/30 text-xs">Raza</span> {reporte.breed}</span>}
                        {reporte.color && <span><span className="text-white/30 text-xs">Color</span> {reporte.color}</span>}
                        {reporte.sex && <span><span className="text-white/30 text-xs">Sexo</span> {reporte.sex}</span>}
                    </div>
                    {reporte.contacto && (
                        <p className="text-xs text-white/40">{reporte.contacto}</p>
                    )}
                </div>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => onConfirmar(reporte.id)}
                    disabled={accionLoading}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 py-3 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20 disabled:opacity-50"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {accionLoading ? "..." : "Sí, es ella"}
                </button>
                <button
                    onClick={() => onRechazar(reporte.id)}
                    disabled={accionLoading}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {accionLoading ? "..." : "No es ella"}
                </button>
            </div>

            <button
                onClick={onVolver}
                className="text-xs text-white/30 hover:text-white/50 transition-colors text-center"
            >
                ← Volver al detalle
            </button>
        </div>
    );
}

export default function NotificacionDetalleModal({ notificacion, onClose, onLeer }) {
    const [step, setStep] = useState("detalle");
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accionLoading, setAccionLoading] = useState(false);
    const [resultado, setResultado] = useState(null);

    const esCoincidencia = notificacion?.tipo === "COINCIDENCIA_POTENCIAL";

    useEffect(() => {
        const reporteId = notificacion?.idReporte;

        if (!reporteId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setReporte(null);
        setStep("detalle");
        setResultado(null);
        fetchPetById(reporteId)
            .then(data => {
                if (!data) throw new Error("No se encontró el reporte");
                setReporte(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));

        if (!notificacion.leida) onLeer(notificacion.id);
    }, [notificacion?.id]);

    async function handleConfirmar() {
        setAccionLoading(true);
        try {
            // TODO: await confirmarCoincidencia(notificacion.idCoincidencia)
            setResultado("confirmado");
        } finally {
            setAccionLoading(false);
        }
    }

    async function handleRechazar() {
        setAccionLoading(true);
        try {
            // TODO: await rechazarCoincidencia(notificacion.idCoincidencia)
            setResultado("rechazado");
        } finally {
            setAccionLoading(false);
        }
    }

    if (!notificacion) return null;

    const stepLabel = esCoincidencia
        ? step === "detalle" ? "1 / 2 — Detalle" : "2 / 2 — Coincidencia"
        : null;

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Panel */}
            <div
                className="relative z-10 w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 bg-[#0f2420] shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Handle drag (solo visual, mobile) */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                    <div className="h-1 w-10 rounded-full bg-white/20" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2 min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{notificacion.titulo}</p>
                        {stepLabel && (
                            <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/40">
                                {stepLabel}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="shrink-0 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                        aria-label="Cerrar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-5">
                    {loading ? (
                        <div className="flex flex-col gap-4 animate-pulse">
                            <div className="h-52 rounded-2xl bg-white/10" />
                            <div className="h-4 w-3/4 rounded bg-white/10" />
                            <div className="h-4 w-1/2 rounded bg-white/10" />
                        </div>
                    ) : error ? (
                        <div className="py-8 text-center">
                            <p className="text-sm text-white/40">{error}</p>
                        </div>
                    ) : !reporte ? (
                        <div className="py-8 text-center">
                            <p className="text-sm text-white/40">Este tipo de notificación no tiene reporte asociado.</p>
                        </div>
                    ) : step === "detalle" ? (
                        <StepDetalle
                            reporte={reporte}
                            esCoincidencia={esCoincidencia}
                            onVerCoincidencia={() => setStep("coincidencia")}
                        />
                    ) : (
                        <StepCoincidencia
                            reporte={reporte}
                            onConfirmar={() => handleConfirmar()}
                            onRechazar={() => handleRechazar()}
                            accionLoading={accionLoading}
                            resultado={resultado}
                            onVolver={() => setStep("detalle")}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

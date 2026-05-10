import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchPetById } from "../features/incidents/services/fetchPets";

const SPECIES_EMOJI = { dog: "🐕", cat: "🐈", other: "🐾" };
const REPORT_STYLES = {
    PERDIDA: "bg-red-500/20 text-red-300 border-red-400/30",
    ENCONTRADA: "bg-[#5DCAA5]/20 text-[#5DCAA5] border-[#5DCAA5]/30",
    AVISTAMIENTO: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
};

function formatDate(date) {
    if (!date) return "Sin información";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(parsedDate);
}

function DetailItem({ label, value }) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">{label}</p>
            <p className="mt-1 text-sm text-white/80">{value || "Sin información"}</p>
        </div>
    );
}

function ConfirmarRechazarSection({ reporteId, onConfirmar, onRechazar, loading }) {
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
                    onClick={() => onConfirmar(reporteId)}
                    disabled={loading}
                    className="flex-1 rounded-xl border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-4 py-2.5 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20 disabled:opacity-50"
                >
                    Confirmar coincidencia
                </button>
                <button
                    onClick={() => onRechazar(reporteId)}
                    disabled={loading}
                    className="flex-1 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                >
                    Rechazar coincidencia
                </button>
            </div>
        </div>
    );
}

export default function ReportDetailPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const tipo = searchParams.get("tipo");
    const navigate = useNavigate();

    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accionLoading, setAccionLoading] = useState(false);
    const [accionMensaje, setAccionMensaje] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchPetById(id)
            .then(data => {
                if (!data) throw new Error("Reporte no encontrado");
                setReporte(data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleConfirmar(reporteId) {
        setAccionLoading(true);
        try {
            // TODO: conectar con el endpoint real de confirmación
            // await confirmarCoincidencia(reporteId);
            setAccionMensaje({ tipo: "exito", texto: "Coincidencia confirmada correctamente." });
        } catch {
            setAccionMensaje({ tipo: "error", texto: "Error al confirmar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    async function handleRechazar(reporteId) {
        setAccionLoading(true);
        try {
            // TODO: conectar con el endpoint real de rechazo
            // await rechazarCoincidencia(reporteId);
            setAccionMensaje({ tipo: "info", texto: "Coincidencia rechazada." });
        } catch {
            setAccionMensaje({ tipo: "error", texto: "Error al rechazar. Intenta de nuevo." });
        } finally {
            setAccionLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5DCAA5] border-t-transparent" />
            </div>
        );
    }

    if (error || !reporte) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
                <p className="text-white/60">{error || "Reporte no encontrado"}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-full border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-4 py-2 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
                >
                    Volver
                </button>
            </div>
        );
    }

    const imageUrl = reporte.photo || reporte.imagen_url;
    const title = reporte.estadoReporte || reporte.name || reporte.tipoReporte || "Detalle del reporte";
    const reportStyle = REPORT_STYLES[reporte.tipoReporte] || "bg-white/10 text-white/70 border-white/20";

    return (
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
            <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-3 py-1.5 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
                    >
                        <span aria-hidden="true">←</span>
                        Volver
                    </button>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportStyle}`}>
                        {reporte.tipoReporte || "Sin tipo"}
                    </span>
                </div>

                {/* Contenido */}
                <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    {/* Imagen */}
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f2e1f]">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`Imagen del reporte ${title}`}
                                className="h-80 w-full object-cover sm:h-[28rem]"
                            />
                        ) : (
                            <div className="flex h-80 w-full items-center justify-center sm:h-[28rem]">
                                <span className="select-none text-8xl">{SPECIES_EMOJI[reporte.species] ?? "🐾"}</span>
                            </div>
                        )}
                    </div>

                    {/* Datos */}
                    <div className="flex flex-col gap-4">
                        <header>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5DCAA5]">
                                Detalle del reporte
                            </p>
                            <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-white/60">
                                {reporte.description || "Este reporte no tiene descripción registrada."}
                            </p>
                        </header>

                        <section className="rounded-2xl border border-white/10 bg-black/10 p-4">
                            <h3 className="mb-3 text-sm font-semibold text-white">Datos de la mascota</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <DetailItem label="Estado mascota" value={reporte.status} />
                                <DetailItem label="Especie" value={reporte.species} />
                                <DetailItem label="Raza" value={reporte.breed} />
                                <DetailItem label="Color" value={reporte.color} />
                                <DetailItem label="Tamaño" value={reporte.size} />
                                <DetailItem label="Sexo" value={reporte.sex} />
                                <DetailItem label="Edad aprox." value={reporte.approximateAge} />
                                <DetailItem label="Estado reporte" value={reporte.estadoReporte} />
                            </div>
                        </section>

                        <section className="rounded-2xl border border-white/10 bg-black/10 p-4">
                            <h3 className="mb-3 text-sm font-semibold text-white">Información del reporte</h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <DetailItem label="ID reporte" value={reporte.id} />
                                <DetailItem label="Fecha" value={formatDate(reporte.fechaReporte)} />
                                <DetailItem label="Latitud" value={reporte.latitud} />
                                <DetailItem label="Longitud" value={reporte.longitud} />
                            </div>
                        </section>

                        <section className="rounded-2xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/10 p-4">
                            <h3 className="mb-2 text-sm font-semibold text-[#5DCAA5]">Contacto</h3>
                            <p className="text-sm text-white/80">{reporte.contacto || "Sin contacto registrado"}</p>
                        </section>

                        {/* Sección confirmar/rechazar solo para coincidencias */}
                        {tipo === "COINCIDENCIA_POTENCIAL" && !accionMensaje && (
                            <ConfirmarRechazarSection
                                reporteId={id}
                                onConfirmar={handleConfirmar}
                                onRechazar={handleRechazar}
                                loading={accionLoading}
                            />
                        )}

                        {accionMensaje && (
                            <div className={`rounded-2xl border p-4 text-sm font-medium
                                ${accionMensaje.tipo === "exito"
                                    ? "border-[#5DCAA5]/30 bg-[#5DCAA5]/10 text-[#5DCAA5]"
                                    : accionMensaje.tipo === "error"
                                        ? "border-red-400/30 bg-red-500/10 text-red-300"
                                        : "border-white/20 bg-white/5 text-white/70"
                                }`}
                            >
                                {accionMensaje.texto}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
}

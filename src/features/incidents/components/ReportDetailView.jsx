import CoincidenciaSection from "./CoincidenciaSection";
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

function DetailItem({ label, value }) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">{label}</p>
            <p className="mt-1 text-sm text-white/80">{value || "Sin información"}</p>
        </div>
    );
}

function CoincidenciasNav({ actual, total, onPrev, onNext }) {
    if (!total || total <= 1) return null;
    return (
        <div className="flex items-center justify-between rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3">
            <button
                type="button"
                onClick={onPrev}
                disabled={!onPrev}
                className="inline-flex items-center gap-1 text-sm font-medium text-yellow-300 transition hover:text-yellow-200 disabled:opacity-30"
            >
                <span aria-hidden="true">←</span>
                Anterior
            </button>
            <span className="text-sm font-semibold text-yellow-300">
                Coincidencia {actual} de {total}
            </span>
            <button
                type="button"
                onClick={onNext}
                disabled={!onNext}
                className="inline-flex items-center gap-1 text-sm font-medium text-yellow-300 transition hover:text-yellow-200 disabled:opacity-30"
            >
                Siguiente
                <span aria-hidden="true">→</span>
            </button>
        </div>
    );
}

export default function ReportDetailView({
    reporte,
    ubicacion,
    tipo,
    idReporteMio,
    esDueñoDeAmbos,
    onVerReporteMio,
    onBack,
    onConfirmar,
    onRechazar,
    accionLoading,
    accionResultado,
    coincidenciaActual,
    totalCoincidencias,
    onPrevCoincidencia,
    onNextCoincidencia,
}) {
    const imageUrl = reporte.photo || reporte.imagen_url;
    const reportStyle = REPORT_STYLES[reporte.tipoReporte] || "bg-white/10 text-white/70 border-white/20";

    const title = ubicacion || "Sin ubicación";

    return (
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 rounded-full border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-3 py-1.5 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
                >
                    <span aria-hidden="true">←</span>
                    Volver
                </button>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${reportStyle}`}>
                    {reporte.tipoReporte || "Sin tipo"}
                </span>
            </div>

            <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="h-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2e1f] sm:h-72 lg:h-full">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`Imagen del reporte ${title}`}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/30">
                            <PawIcon size="large" />
                        </div>
                    )}
                </div>

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
                            <DetailItem label="Ubicación" value={ubicacion} />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#5DCAA5]/20 bg-[#5DCAA5]/10 p-4">
                        <h3 className="mb-2 text-sm font-semibold text-[#5DCAA5]">Contacto</h3>
                        <p className="text-sm text-white/80">{reporte.contacto || "Sin contacto registrado"}</p>
                    </section>

                    <CoincidenciasNav
                        actual={coincidenciaActual}
                        total={totalCoincidencias}
                        onPrev={onPrevCoincidencia}
                        onNext={onNextCoincidencia}
                    />

                    {tipo === "COINCIDENCIA_POTENCIAL" && esDueñoDeAmbos && (
                        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                            <p className="text-sm font-semibold text-yellow-300">Ambos reportes son tuyos</p>
                            <p className="mt-1 text-sm text-white/50">
                                El sistema detectó una coincidencia entre dos de tus propios reportes.
                            </p>
                        </div>
                    )}

                    {tipo === "COINCIDENCIA_POTENCIAL" && !esDueñoDeAmbos && (
                        <CoincidenciaSection
                            onConfirmar={onConfirmar}
                            onRechazar={onRechazar}
                            loading={accionLoading}
                            resultado={accionResultado}
                        />
                    )}

                    {tipo === "COINCIDENCIA_POTENCIAL" && idReporteMio && (
                        <button
                            type="button"
                            onClick={onVerReporteMio}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
                        >
                            <span aria-hidden="true">←</span>
                            Ver mi reporte #{idReporteMio}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}

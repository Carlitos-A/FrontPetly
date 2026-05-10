import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useReportDetail } from "../features/incidents/hooks/useReportDetail";
import ReportDetailView from "../features/incidents/components/ReportDetailView";
import { useAuth } from "../features/auth/context/authContext";

export default function ReportDetailPage() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const tipo = searchParams.get("tipo");
    const idReporteMio = searchParams.get("idReporteMio");
    const coincidenciasParam = searchParams.get("coincidencias");
    const listaCoincidencias = coincidenciasParam ? coincidenciasParam.split(",") : [];
    const currentIdx = listaCoincidencias.findIndex(c => c === id);
    const navigate = useNavigate();
    const { user } = useAuth();

    const { reporte, loading, error, ubicacion, accionLoading, accionResultado, confirmar, rechazar } =
        useReportDetail(id);

    const esDueñoDeAmbos =
        tipo === "COINCIDENCIA_POTENCIAL" &&
        !!idReporteMio &&
        !!reporte?.usuarioId &&
        !!user?.id &&
        String(reporte.usuarioId) === String(user.id);

    function navegarACoincidencia(nuevoId) {
        const params = new URLSearchParams(searchParams);
        navigate(`/reportes/${nuevoId}?${params.toString()}`);
    }

    const onPrevCoincidencia = currentIdx > 0
        ? () => navegarACoincidencia(listaCoincidencias[currentIdx - 1])
        : undefined;
    const onNextCoincidencia = currentIdx !== -1 && currentIdx < listaCoincidencias.length - 1
        ? () => navegarACoincidencia(listaCoincidencias[currentIdx + 1])
        : undefined;

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

    return (
        <div className="h-full overflow-y-auto md:pt-22">
            <div className="mx-auto max-w-5xl px-4 py-6 pb-10 sm:px-6">
                <ReportDetailView
                    reporte={reporte}
                    ubicacion={ubicacion}
                    tipo={tipo}
                    idReporteMio={idReporteMio}
                    esDueñoDeAmbos={esDueñoDeAmbos}
                    onVerReporteMio={idReporteMio ? () => navigate(`/reportes/${idReporteMio}`) : undefined}
                    onBack={() => navigate(-1)}
                    onConfirmar={confirmar}
                    onRechazar={rechazar}
                    accionLoading={accionLoading}
                    accionResultado={accionResultado}
                    coincidenciaActual={currentIdx !== -1 ? currentIdx + 1 : undefined}
                    totalCoincidencias={listaCoincidencias.length > 1 ? listaCoincidencias.length : undefined}
                    onPrevCoincidencia={onPrevCoincidencia}
                    onNextCoincidencia={onNextCoincidencia}
                />
            </div>
        </div>
    );
}

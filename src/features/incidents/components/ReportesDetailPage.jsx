import { useNavigate } from "react-router-dom";

import ReportDetail from "./ReportDetail";
import { useReportDetail } from "../hooks/useReportDetail";

export default function ReportesDetailPage({ id }) {
  const navigate = useNavigate();
  const { reporte, loading, error } = useReportDetail(id);

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
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full border border-[#5DCAA5]/40 bg-[#5DCAA5]/10 px-4 py-2 text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <ReportDetail
        report={reporte}
        onBack={() => navigate(-1)}
      />
    </div>
  );
}
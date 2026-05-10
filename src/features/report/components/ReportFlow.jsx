import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/context/authContext";
import AuthGuardModal from "../../../shared/components/AuthGuardModal";
import ReportModal from "./ReportModal";
import { useReportFlow } from "../hooks/useReportFlow";

export default function ReportFlow({ tipo }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { flow, handleSubmit } = useReportFlow(tipo);
  const [authGuardOpen, setAuthGuardOpen] = useState(true);

  function goBack() {
    navigate("/");
  }

  if (!flow) {
    return (
      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center bg-[#0a1a10] px-4 text-center text-white">
        <div>
          <h1 className="text-2xl font-black">
            Tipo de reporte no disponible
          </h1>

          <button
            type="button"
            onClick={goBack}
            className="mt-5 rounded-lg bg-[#5DCAA5] px-5 py-3 text-sm font-black text-[#0a1a10]"
          >
            Volver a Home
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-3rem)] bg-[#0a1a10]">
        <AuthGuardModal
          open={authGuardOpen}
          onClose={() => {
            setAuthGuardOpen(false);
            goBack();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-[#0a1a10]">
      <ReportModal
        open={true}
        actionType={flow.actionType}
        tipoReporte={flow.tipoReporte}
        onClose={goBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

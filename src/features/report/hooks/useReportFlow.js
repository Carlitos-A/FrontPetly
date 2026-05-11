import { useMemo } from "react";

import { useReport } from "./useReport";
import { REPORT_FLOW_BY_ROUTE } from "../constants/reportType";

export function useReportFlow(tipo) {
  const { submitReport, loading, error } = useReport();

  const flow = useMemo(() => {
    return REPORT_FLOW_BY_ROUTE[tipo] || null;
  }, [tipo]);

  async function handleSubmit(data) {
    if (!flow) return;

    await submitReport(data, flow.tipoReporte);
  }

  return {
    flow,
    loading,
    error,
    handleSubmit,
  };
}

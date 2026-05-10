import { useMemo, useState } from "react";

import { useAuth } from "../../auth/context/authContext";
import { DEFAULT_PET_FILTERS } from "../../incidents/constants/filters";
import { usePets } from "../../incidents/hooks/usePets";
import { normalizeReport } from "../../incidents/utils/normalizeReport";
import { REPORT_TYPE_BY_ACTION } from "../../report/constants/reportType";
import { useReport } from "../../report/hooks/useReport";
import { useUserLocation } from "../../../shared/hooks/useUserLocation";

export function useMapaPage() {
  const { user } = useAuth();
  const { submitReport } = useReport();
  const { location } = useUserLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [authGuardOpen, setAuthGuardOpen] = useState(false);
  const [mapGuardOpen, setMapGuardOpen] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_PET_FILTERS);
  const [actionType, setActionType] = useState(null);
  const [tipoReporte, setTipoReporte] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const { pets, loading } = usePets(filters);

  const selectedReportDetail = useMemo(() => {
    if (!selectedReportId) return null;

    return (
      pets.find((pet) => String(pet.id) === String(selectedReportId)) ||
      normalizeReport(selectedReport)
    );
  }, [pets, selectedReport, selectedReportId]);

  async function handleSubmit(data) {
    await submitReport(data, tipoReporte);
  }

  function closeReportModal() {
    setModalOpen(false);
    setTipoReporte(null);
    setActionType(null);
  }

  function clearSelectedReport() {
    setSelectedReportId(null);
    setSelectedReport(null);
  }

  function handleFiltersChange(nextFilters) {
    clearSelectedReport();
    setFilters(nextFilters);
  }

  function handleSearchChange(search) {
    clearSelectedReport();
    setFilters((currentFilters) => ({
      ...currentFilters,
      search,
    }));
  }

  function handleReportSelect(report) {
    setSelectedReportId(report.id);
    setSelectedReport(report);
  }

  function handleFloatingAction(type) {
    if (!user) {
      setAuthGuardOpen(true);
      return;
    }

    setActionType(type);
    setTipoReporte(REPORT_TYPE_BY_ACTION[type]);
    setModalOpen(true);
  }

  return {
    user,
    pets,
    loading,
    location,
    filters,
    modalOpen,
    authGuardOpen,
    mapGuardOpen,
    actionType,
    tipoReporte,
    selectedReportId,
    selectedReportDetail,
    setAuthGuardOpen,
    setMapGuardOpen,
    handleSubmit,
    closeReportModal,
    clearSelectedReport,
    handleFiltersChange,
    handleSearchChange,
    handleReportSelect,
    handleFloatingAction,
  };
}

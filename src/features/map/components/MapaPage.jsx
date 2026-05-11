import { useNavigate } from "react-router-dom";

import FloatingButton from "../../../shared/components/FloatingButton";
import AuthGuardModal from "../../../shared/components/AuthGuardModal";
import Filters from "../../incidents/components/Filter";
import PetGrid from "../../incidents/components/PetGrid";
import ReportDetail from "../../incidents/components/ReportDetail";
import SearchBar from "../../incidents/components/SearchBar";
import ReportModal from "../../report/components/ReportModal";
import Map from "./mapBox";
import { useMapaPage } from "../hooks/useMapaPage";

export default function MapaPage() {
  const navigate = useNavigate();

  const {
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
  } = useMapaPage();

  if (!user) {
    return (
      <div className="h-full bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
        <AuthGuardModal
          open={mapGuardOpen}
          onClose={() => {
            setMapGuardOpen(false);
            navigate("/");
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-3rem)] min-h-0 flex-col overflow-hidden bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] md:h-full md:flex-row">
      <div className="h-[38dvh] min-h-[260px] w-full shrink-0 md:h-full md:w-1/2">
        <Map
          filters={filters}
          selectedReportId={selectedReportId}
          onReportSelect={handleReportSelect}
        />
      </div>

      <section className="min-h-0 flex-1 overflow-y-auto border-l border-white/10 bg-white/5 p-4 pb-32 backdrop-blur-xl md:h-full md:w-1/2 md:pt-20">
        <SearchBar
          value={filters.search}
          onChange={handleSearchChange}
        />

        <Filters
          value={filters}
          onChange={handleFiltersChange}
        />

        {selectedReportDetail ? (
          <ReportDetail
            report={selectedReportDetail}
            onBack={clearSelectedReport}
          />
        ) : (
          <PetGrid
            pets={pets}
            loading={loading}
            referenceLocation={location}
            selectedPetId={selectedReportId}
            onCardClick={handleReportSelect}
          />
        )}
      </section>

      <FloatingButton onAction={handleFloatingAction} />

      <ReportModal
        open={modalOpen}
        actionType={actionType}
        tipoReporte={tipoReporte}
        onClose={closeReportModal}
        onSubmit={handleSubmit}
      />

      <AuthGuardModal
        open={authGuardOpen}
        onClose={() => setAuthGuardOpen(false)}
      />
    </div>
  );
}

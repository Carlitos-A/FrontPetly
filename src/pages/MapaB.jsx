import { useEffect, useRef, useState } from "react";

import Map from "../features/map/components/mapBox";
import PetGrid from "../features/incidents/components/PetGrid";
import Filters from "../features/incidents/components/Filter";
import SearchBar from "../features/incidents/components/SearchBar";
import { usePets } from "../features/incidents/hooks/usePets";
import { DEFAULT_PET_FILTERS } from "../features/incidents/constants/filters";
import { useUserLocation } from "../shared/hooks/useUserLocation";

export default function MapaB() {
  const [filters, setFilters] = useState(DEFAULT_PET_FILTERS);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const gridRef = useRef(null);
  const { pets, loading } = usePets(filters);
  const { location } = useUserLocation();

  useEffect(() => {
    if (!selectedReportId) return;

    function handlePointerDown(event) {
      if (gridRef.current?.contains(event.target)) return;
      setSelectedReportId(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [selectedReportId]);

  function handleFiltersChange(nextFilters) {
    setSelectedReportId(null);
    setFilters(nextFilters);
  }

  function handleSearchChange(search) {
    setSelectedReportId(null);
    setFilters({ ...filters, search });
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]">
      <section className="flex flex-col md:flex-row h-[calc(100vh-6rem)]">
        <div className="w-full md:w-3/5 h-80 md:h-full">
          <Map
            filters={filters}
            selectedReportId={selectedReportId}
            onReportSelect={(report) => setSelectedReportId(report.id)}
          />
        </div>

        <aside className="w-full md:w-2/5 p-4 bg-white/5 backdrop-blur-xl border-t border-white/10 md:border-t-0 md:border-l md:h-full overflow-y-auto">
          <h2 className="text-white text-lg font-semibold mb-4">
            Mascotas en el area
          </h2>

          <SearchBar
            value={filters.search}
            onChange={handleSearchChange}
          />
          <Filters value={filters} onChange={handleFiltersChange} />

          <div ref={gridRef}>
            <PetGrid
              pets={pets}
              loading={loading}
              referenceLocation={location}
              selectedPetId={selectedReportId}
              onCardClick={(pet) => setSelectedReportId(pet.id)}
            />
          </div>
        </aside>
      </section>
    </div>
  );
}

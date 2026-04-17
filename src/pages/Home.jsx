import { useState } from "react";

import ReportModal from "../features/report/components/ReportModal";
import FloatingButton from "../shared/components/FloatingButton";
import { useReport } from "../features/report/hooks/useReport";
import Map from "../features/map/components/MapBox";
import PetGrid from "../features/incidents/components/petGrid";
import { mockPets } from "../features/incidents/data/MockPets";
import Filters from "../features/incidents/components/Filter";
import { DEFAULT_PET_FILTERS } from "../features/incidents/constants/filters";
import { usePets } from "../features/incidents/hooks/usePets";

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_PET_FILTERS);
  const { submitReport } = useReport();
  const [actionType, setActionType] = useState(null);
  const {pets, loading} =  usePets(filters);
  function handleSubmit(data) {
    submitReport(data);
    setModalOpen(false);
  }

  return (

    <div className="flex h-screen">
      {/*Este mapa esta comentado debido a que me ayuda a no usar de manera innecesaria la capacidad gratis de mapbox, pero en este caso me encantaria que este mapa abarcara la mitad de la pantalla también*/}
      {/* <div className="w-1/2 h-full">
        <Map />
      </div>  */}

      <section className="w-1/2 h-full min-h-0 overflow-y-auto p-4 bg-black/60 backdrop-blur-sm">
        {/* Este es el filtro que realiza el puente entre el front y la lógica del backend, al cambiar el filtro se actualizan los incidentes mostrados en el petgrid, lo ideal es que este filtro se mantuviera fijo en la parte superior de la pantalla mientras se hace scroll por los incidentes. */}
        <Filters value={filters} onChange={setFilters} />
        {/*Este petgrid me ayuda a mostrar los animales disponibles para adopción/búsqueda. Al fin y al cabo es solo muestreo, me encantaría que ocupara solo la mitad de la pantalla*/}

        <PetGrid
          pets={pets}
          loading={loading}
          onCardClick={(pet) => console.log("[Home] mascota seleccionada:", pet)} //Aqui deberia ir la lógica de expansión de mascota para mostrar más detalles, fotos, etc.
        />
      </section>

      {/*Este floating button sirve para crear reportes de pérdida. Lo ideal es lograr que este al medio, es de prueba, por lo tanto no hay que centrarse (Aún) en funcionalidad*/}
      {/* FAB centrado horizontalmente */}
      <FloatingButton
        onAction={(type) => {
          setActionType(type);
          setModalOpen(true);
        }
        } />

      {/*Al presionar el floating button se abre el modal para rellenar el reporte, este deberia abrire en el centro de la pantalla*/}
      <ReportModal
        open={modalOpen}
        actionType={actionType}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
      {/*El onSubmit del modal se encarga de enviar el reporte a la base de datos, y luego cierra el modal*/}


    </div>
  );
}
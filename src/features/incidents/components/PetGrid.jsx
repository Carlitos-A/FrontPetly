import { useMemo } from "react";
import PetCard from "./PetCard";


export default function PetGrid({ pets = [], onCardClick, loading }) {
  if (loading) {
    return (
      <div className="py-20 text-center text-stone-400">
        Cargando...
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-20 text-stone-400">
        <span className="text-4xl">🔍</span>
        <p className="text-sm">No hay resultados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onClick={onCardClick} />
      ))}
    </div>
  );
}
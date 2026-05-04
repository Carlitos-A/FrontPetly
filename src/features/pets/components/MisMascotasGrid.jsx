import MyPetCard from "./MiMascotaCard";

export default function MisMascotasGrid({ pets = [], loading, onEdit, onDelete }) {

  if (loading) {
    return (
      <div className="text-white/40 text-center py-20">
        Cargando...
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-white/40 text-center py-20">
        No tienes mascotas registradas
      </div>
    );
  }

  return (
    <div className="
      w-full
      flex
      justify-center
    ">
      <div className="
        flex
        flex-wrap
        justify-center
        gap-6
        max-w-5xl
      ">
        {pets.map((pet) => (
          <MyPetCard
            key={pet.chip}
            pet={pet}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
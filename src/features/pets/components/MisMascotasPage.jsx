import { useMisMascotas } from "../hooks/useMisMascotas";
import MisMascotasGrid from "./MisMascotasGrid";

export default function MisMascotasPage() {
  const { pets, loading, error } = useMisMascotas();

  function handleEdit(pet) {
    console.log("Editar:", pet);
  }

  function handleDelete(pet) {
    console.log("Eliminar:", pet);
  }

  return (
    <div className="
      min-h-screen
      flex flex-col
      items-center
      justify-start
      pt-20
      px-4
      bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10]
    ">

      <h1 className="text-3xl text-white font-bold mb-10">
        Mis Mascotas
      </h1>

      {error && (
        <p className="text-red-400">{error}</p>
      )}

      <MisMascotasGrid
        pets={pets}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}
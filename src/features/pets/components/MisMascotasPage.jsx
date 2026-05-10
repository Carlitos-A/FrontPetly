import { Link } from "react-router-dom";
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
    <div className="h-full bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] px-4 pb-12 pt-20">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur-xl md:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[#5DCAA5]">
            Perfil / User
          </p>

          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">Mis Mascotas</h1>
              <p className="mt-2 max-w-2xl text-sm text-white/65">
                Revisa las mascotas registradas que tienes asociadas a tu cuenta.
              </p>
            </div>

            <Link
              to="/perfil"
              className="rounded-xl border border-[#5DCAA5]/30 bg-[#5DCAA5]/10 px-4 py-2 text-center text-sm font-semibold text-[#5DCAA5] transition hover:bg-[#5DCAA5]/20"
            >
              Volver a mi perfil
            </Link>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-6xl rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <MisMascotasGrid
          pets={pets}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        </section>
      </div>
    );
  }
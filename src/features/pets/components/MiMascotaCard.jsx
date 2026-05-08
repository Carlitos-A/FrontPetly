export default function MiMascotaCard({ pet, onEdit, onDelete }) {
  return (
    <article className="
      w-64
      bg-white/5 backdrop-blur-xl
      border border-white/10
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    ">

      {/* Imagen */}
      <div className="w-full h-40 bg-[#0f2e1f]">
        {pet.imagenUrl ? (
          <img
            src={pet.imagenUrl}
            alt={pet.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/40">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-white font-semibold text-sm">
          {pet.nombre}
        </h3>

        <p className="text-xs text-white/50">
          {pet.raza} • {pet.color}
        </p>

        <p className="text-xs text-white/40">
          {pet.tipo} {pet.otroTipo && `(${pet.otroTipo})`}
        </p>
      </div>

      {/* Acciones */}
      <div className="flex gap-2 p-3 pt-0">
        <button
          onClick={() => onEdit?.(pet)}
          className="
            flex-1 text-xs
            bg-blue-500/20 border border-blue-500/30
            text-blue-300
            hover:bg-blue-500/30
            rounded-lg py-1.5
            transition-all
          "
        >
          Editar
        </button>

        <button
          onClick={() => onDelete?.(pet)}
          className="
            flex-1 text-xs
            bg-red-500/20 border border-red-500/30
            text-red-300
            hover:bg-red-500/30
            rounded-lg py-1.5
            transition-all
          "
        >
          Eliminar
        </button>
      </div>

    </article>
  );
}
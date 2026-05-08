import { useState } from "react";


export default function FloatingButton({ onAction }) {

  const [isOpen, setIsOpen] = useState(false);
  return (

    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex flex-col items-center gap-2">

        {/* Botones desplegables */}
        <div
          className={`flex flex-row items-center gap-2 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-10 translate-x-0 pointer-events-none"
            }`}
        >
          <button
            type="button"
            onClick={() => onAction("Encontrado")}
            className="h-12 w-12 rounded-full cursor-pointer bg-blue-500 text-white shadow hover:bg-blue-700">
            !
          </button>
          <button
            type="button"
            onClick={() => onAction("Perdido")}
            className="h-12 w-12 rounded-full cursor-pointer bg-red-500 text-white shadow hover:bg-red-700">
            ?
          </button>
        </div>

        {/* Entra el boton principal */}
        <button
          // Al darle click se cambia el estado de isOpen, lo que hace que el botón principal cambie su apariencia y los botones secundarios se desplieguen o se oculten según el valor de isOpen.
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 transition-all
        ${isOpen ? "bg-slate-200" : "bg-white hover:bg-slate-200"}`}
        >
          <div className="space-y-2">

            <span
              className={`block h-1 w-10 origin-center rounded-full transition-all
            ${isOpen ? "bg-red-500 translate-y-1.5 rotate-90" : "bg-slate-500"}`}
            />

            <span
              className={`block h-1 w-8 origin-center rounded-full transition-all
            ${isOpen ? "bg-red-500 w-10 -translate-y-1.5 -rotate-180" : "bg-orange-500"}`}
            />
          </div>
        </button>
      </div >
    </div>
  );
}



import { useState } from "react";


export default function FloatingButton({ onAction }) {

  const [isOpen, setIsOpen] = useState(false);
  return (

    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex flex-col items-center gap-2 pb-4">

        {/* Botones desplegables */}
        <div className={`flex flex-row items-center gap-2 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 -translate-x-1" : "opacity-0 translate-y-10 -translate-x-1 pointer-events-none"
          }`}>

          {/* Encontrado */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => { onAction("Encontrado"); setIsOpen(false); }}
              className="h-12 w-12 rounded-full cursor-pointer bg-[#5DCAA5] text-[#0a1a10] shadow-lg shadow-[#5DCAA5]/20 hover:bg-[#4db896] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center">
              {/* Check */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <span className="text-xs font-medium text-black drop-shadow">Encontrado</span>

          </div>

          {/* Perdido */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={() => { onAction("Perdido"); setIsOpen(false); }}
              className="h-12 w-12 rounded-full cursor-pointer bg-white/5 text-white border border-[#5DCAA5]/30 shadow-lg hover:bg-white/10 hover:border-[#5DCAA5]/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center">
              {/* Huella*/}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <ellipse cx="9" cy="4.5" rx="1.8" ry="2.3" />
                <ellipse cx="15" cy="4.5" rx="1.8" ry="2.3" />
                <ellipse cx="5.5" cy="9" rx="1.6" ry="2" />
                <ellipse cx="18.5" cy="9" rx="1.6" ry="2" />
                <path d="M12 10c-3.5 0-6 2-6 5.5 0 2 1.5 3.5 3 3.5.8 0 1.5-.3 2-.6.3-.2.7-.2 1 0 .5.3 1.2.6 2 .6 1.5 0 3-1.5 3-3.5C17 12 14.5 10 12 10z" />
              </svg>
            </button>
            <span className="text-xs font-medium text-white drop-shadow">Perdido</span>
          </div>
        </div>

        {/* Entra el boton principal */}
        <button
          // Al darle click se cambia el estado de isOpen, lo que hace que el botón principal cambie su apariencia y los botones secundarios se desplieguen o se oculten según el valor de isOpen.
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-3xl p-2 transition-all duration-300
        ${isOpen ? "bg-[#5DCAA5] text-[#0a1a10] shadow-lg shadow-[#5DCAA5]/30" : "bg-white/80 text-white border border-[#5DCAA5]/30 shadow-lg hover:bg-white/90 hover:border-[#5DCAA5]/60"}`}
        >
          <div className="space-y-2">

            <span
              className={`block h-1 w-10 origin-center rounded-full transition-all
            ${isOpen ? "bg-[#0a1a10]" : "bg-[#5DCAA5] translate-y-1.5 rotate-90"}`}
            />

            <span
              className={`block h-1 w-8 origin-center rounded-full transition-all
            ${isOpen ? "bg-[#0a1a10]" : "bg-[#5DCAA5] w-10 -translate-y-1.5 -rotate-180"}`}
            />
          </div>
        </button>
      </div >
    </div >
  );
}



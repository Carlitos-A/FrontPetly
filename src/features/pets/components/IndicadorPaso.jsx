export default function IndicadorPaso({ Paso, onStepClick }) {
    const pasos = [
        { numero: 1, titulo: "Tipo y foto" },
        { numero: 2, titulo: "Información" },
        { numero: 3, titulo: "Confirmación" },
    ];

    return (
        <div className="flex justify-center items-center gap-2 flex-wrap">

            {pasos.map((paso, index) => (
                
                <div key={paso.numero} className="flex items-center">
                    {/* Círculo del paso */}
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => onStepClick && paso.numero <= Paso && onStepClick(paso.numero)}
                            disabled={paso.numero > Paso}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 cursor-pointer disabled:cursor-not-allowed ${paso.numero <= Paso
                                    ? "bg-[#369467] border-[#5DCAA5] text-white shadow-lg shadow-[#369467]/50 hover:shadow-lg hover:shadow-[#5DCAA5]/50"
                                    : paso.numero === Paso + 1
                                        ? "bg-white/10 border-[#5DCAA5] text-gray-800"
                                        : "bg-white/5 border-white/20 text-gray-600"
                                }`}
                        >
                            {paso.numero <= Paso ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                paso.numero
                            )}
                        </button>
                        <span className="text-xs text-gray-400 mt-2 text-center w-16">{paso.titulo}</span>
                    </div>

                    {/* Línea de conexión */}
                    {index < pasos.length - 1 && (
                        <div
                            className={`h-1 w-8 sm:w-12 transition-all duration-300 ${paso.numero < Paso
                                    ? "bg-[#369467]"
                                    : "bg-white/10"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
export default function PantallaExitosa({ onReset }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#1a1a1a] via-[#0f2818] to-[#1a1a1a] pt-24 pb-16 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animación de éxito */}
                <div className="flex justify-center">
                    <div className="text-8xl animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-30 h-30" viewBox="0 0 24 24" fill="currentColor">
                            <ellipse cx="9" cy="4.5" rx="1.8" ry="2.3" />
                            <ellipse cx="15" cy="4.5" rx="1.8" ry="2.3" />
                            <ellipse cx="5.5" cy="9" rx="1.6" ry="2" />
                            <ellipse cx="18.5" cy="9" rx="1.6" ry="2" />
                            <path d="M12 10c-3.5 0-6 2-6 5.5 0 2 1.5 3.5 3 3.5.8 0 1.5-.3 2-.6.3-.2.7-.2 1 0 .5.3 1.2.6 2 .6 1.5 0 3-1.5 3-3.5C17 12 14.5 10 12 10z" />
                        </svg></div>
                </div>

                {/* Título */}
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-white">¡Registro exitoso!</h2>
                    <p className="text-gray-400">Tu mascota ha sido registrada exitosamente</p>
                </div>

                {/* Icono de check */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#369467] flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-lg text-gray-300">Ahora tu mascota está registrada en Petly</p>

                {/* Botón */}
                <button
                    onClick={onReset}
                    className="w-full bg-[#369467] hover:bg-[#2d7a56] text-white cursor-pointer font-semibold py-4 rounded-xl transition-colors duration-300 text-lg"
                >
                    Registrar otra mascota
                </button>

                {/* Botón secundario */}
                <a
                    href="/mis-mascotas"
                    className="bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-20 rounded-xl transition-colors duration-300 border border-white/20"
                >
                    Ver mis mascotas
                </a>
            </div>
        </div>
    );
}
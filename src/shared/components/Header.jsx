import React from "react";

export default function Header() {
    return (


        <nav className="bg-black/30 backdrop-blur fixed w-full top-0 left-0 z-20 border-b border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-3 items-center p-1">

                {/* IZQUIERDA → Logo */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center gap-2">
                        <img
                            src="src/assets/logo.png"
                            className="h-7"
                            alt="Logo"
                        />
                        <span className="text-white text-xl font-semibold">
                            Petly
                        </span>
                    </a>
                </div>

                {/* CENTRO → Menú */}
                <ul className="hidden md:flex justify-center gap-8 text-white">
                    <li>
                        <a className="hover:text-blue-400 transition-colors" href="#">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="hover:text-blue-400 transition-colors" href="#">
                            Servicios
                        </a>
                    </li>
                    <li>
                        <a className="hover:text-blue-400 transition-colors" href="#">
                            Contacto
                        </a>
                    </li>
                </ul>

                {/* DERECHA → Botón */}
                <div className="flex justify-end">
                    <button
                        className="text-white bg-white/10 backdrop-blur px-3 py-2 rounded-lg 
                       border border-white/20 shadow-sm
                       transition-all duration-200 ease-out
                       hover:bg-white/20 hover:scale-105 active:scale-95 hover:cursor-pointer"
                    >
                        Get started
                    </button>
                </div>

            </div>
        </nav>

    );
}

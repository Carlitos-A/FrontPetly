import React, { useState, useRef, useEffect, useMemo } from "react";
import { useAuth } from "../../features/auth/context/authContext";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import pfpImg from "../../assets/pfp.jpg";
import { useNotificacionesCount } from "../../features/notificaciones/hooks/useNotificacionesCount";
import { useNotificaciones } from "../../features/notificaciones/hooks/useNotificaciones";

function formatNotificationDate(fechaStr) {
    if (!fechaStr) return "";

    const fecha = new Date(fechaStr);
    const ahora = new Date();
    const diffMin = Math.floor((ahora - fecha) / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffD = Math.floor(diffH / 24);
    

    if (diffMin < 1) return "Ahora";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    if (diffH < 24) return `Hace ${diffH} h`;
    if (diffD < 7) return `Hace ${diffD} d`;

    return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "short" });
}


export default function Header() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [bellOpen, setBellOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { count: noLeidasCount } = useNotificacionesCount();
    const {
        notificaciones,
        loading: notificacionesLoading,
        noLeidasCount: noLeidasPreviewCount,
        recargar: recargarNotificaciones,
    } = useNotificaciones();
    const dropdownRef = useRef(null);
    const bellRef = useRef(null);

    const previewNotificaciones = useMemo(() => {
        return [...notificaciones]
            .sort((a, b) => new Date(b.fechaCreacion ?? 0) - new Date(a.fechaCreacion ?? 0))
            .slice(0, 3);
    }, [notificaciones]);

    const campanaNoLeidasCount = notificacionesLoading
        ? noLeidasCount
        : noLeidasPreviewCount;

    function toggleBell() {
        const nextOpen = !bellOpen;
        setBellOpen(nextOpen);
        setOpen(false);

        if (nextOpen) {
            recargarNotificaciones();
        }
    }
    function closeMenus() {
    setMobileMenuOpen(false);
    setOpen(false);
    setBellOpen(false);
}

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }

            if (bellRef.current && !bellRef.current.contains(e.target)) {
                setBellOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-[#1a412f]/95 backdrop-blur fixed w-full top-0 left-0 z-20 border-b border-white/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-1">

                {/* IZQUIERDA */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center gap-2">
                        <img src={logoImg} className="h-7" alt="Logo" />
                        <span className="text-white text-xl font-semibold">
                            Petly
                        </span>
                    </a>
                </div>

                {/* CENTRO */}
                <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-8 text-white">
                    <li><a className="hover:text-[#5DCAA5]" href="/">Home</a></li>
                    <li><a className="hover:text-[#5DCAA5]" href="/Mapa">Mapa</a></li>
                    <li><a className="hover:text-[#5DCAA5]" href="/Reportes">Reportes</a></li>
                </ul>

                <div className="flex justify-end gap-2 items-center">

                    {/* Campana de notificaciones */}
                    {user && (
                        <div className="relative" ref={bellRef}>
                            <button
                                type="button"
                                onClick={toggleBell}
                                className="relative cursor-pointer flex h-9 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-2.5 text-white transition-all hover:bg-white/20 hover:text-[#5DCAA5] focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/50"
                                aria-label="Notificaciones"
                                aria-expanded={bellOpen}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5DCAA5] px-1.5 text-[10px] font-bold text-[#0a1a10]">
                                    {campanaNoLeidasCount > 9 ? "9+" : campanaNoLeidasCount}
                                </span>
                            </button>

                            <div
                                className={`absolute right-0 mt-2 w-80 rounded-xl border border-white/10 bg-black shadow-xl transition-all duration-200 origin-top-right z-50 ${
                                    bellOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                }`}
                            >
                                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                    <p className="text-sm font-semibold text-white">Notificaciones</p>
                                    <span className="rounded-full bg-[#5DCAA5]/15 px-2 py-0.5 text-xs font-semibold text-[#5DCAA5]">
                                        {campanaNoLeidasCount} sin leer
                                    </span>
                                </div>

                                <div className="max-h-80 overflow-y-auto p-2">
                                    {notificacionesLoading ? (
                                        <p className="px-3 py-4 text-sm text-white/50">Cargando...</p>
                                    ) : previewNotificaciones.length === 0 ? (
                                        <p className="px-3 py-4 text-sm text-white/50">No tienes notificaciones.</p>
                                    ) : (
                                        previewNotificaciones.map((notificacion) => (
                                            <div
                                                key={notificacion.id}
                                                className={`rounded-lg px-3 py-2 ${
                                                    notificacion.leida ? "text-white/60" : "bg-white/10 text-white"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <p className="line-clamp-1 text-sm font-semibold">
                                                        {notificacion.titulo}
                                                    </p>
                                                    <span className="shrink-0 text-[11px] text-white/40">
                                                        {formatNotificationDate(notificacion.fechaCreacion)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">
                                                    {notificacion.mensaje}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <Link
                                    to="/notificaciones"
                                    onClick={() => setBellOpen(false)}
                                    className="block border-t border-white/10 px-4 py-3 text-center text-sm font-semibold text-[#5DCAA5] hover:bg-white/10"
                                >
                                    Ver todas las notificaciones
                                </Link>
                            </div>
                        </div>
                    )}

                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menú"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* DERECHA DINÁMICO */}
                    <div className="hidden md:flex justify-end relative">

                        {!user ? (
                            <section className="flex gap-4">
                                <a
                                    className="text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:text-[#5DCAA5]"
                                    href="/register"
                                >
                                    Registrarse
                                </a>
                                <a
                                    className="text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:text-[#5DCAA5]"
                                    href="/login"
                                >
                                    Iniciar Sesión
                                </a>
                            </section>
                        ) : (
                            //LOGUEADO
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20 
               hover:bg-white/20 transition-all duration-200
               focus:outline-none focus:ring-2 focus:ring-[#5DCAA5]/50 cursor-pointer"
                                >
                                    <span className="text-sm font-medium">
                                        {user.nombre}
                                    </span>

                                    <img
                                        src={pfpImg}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                                    />
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`absolute right-0 mt-2 w-52 rounded-xl border border-white/10 shadow-xl z-50
                bg-black backdrop-blur-lg
                transition-all duration-200 origin-top-right
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none "}`}
                                >

                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-white text-sm font-semibold">
                                            {user.nombre}
                                        </p>
                                        <p className="text-white/50 text-xs truncate">
                                            {user.correo}
                                        </p>
                                    </div>

                                    {/* Links */}
                                    <ul className="p-2 text-sm text-white">
                                        <li>
                                            <Link
                                                to="/agregar-mascota"
                                                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                            >
                                                Agregar mascota
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/perfil"
                                                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                            >
                                                Perfil
                                            </Link>
                                        </li>

                                         <li>
                                            <Link
                                                to="/mis-reportes"
                                                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                            >
                                                Mis reportes
                                            </Link>
                                        </li>
                                         <li>
                                            <Link
                                                to="/mis-mascotas"
                                                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                            >
                                                Mis mascotas
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/notificaciones"
                                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                            >
                                                Notificaciones
                                                {noLeidasCount > 0 && (
                                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5DCAA5] px-1 text-[10px] font-bold text-[#0a1a10]">
                                                        {noLeidasCount > 9 ? "9+" : noLeidasCount}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>

                                        <li className="mt-1 border-t border-white/10 pt-1">
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-3 py-2 rounded-lg text-red-300 
                     hover:bg-red-500/20 transition cursor-pointer"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden bg-black/1 backdrop-blur border-t border-white/10 px-4 py-4 flex flex-col gap-4 ">
                    <ul className="flex flex-col gap-2 text-white text-sm">
                        <li><Link className="block py-2 hover:text-[#5DCAA5]" to="/" onClick={closeMenus}>Home</Link></li>
                        <li><Link className="block py-2 hover:text-[#5DCAA5]" to="/Mapa" onClick={closeMenus}>Mapa</Link></li>
                        <li><Link className="block py-2 hover:text-[#5DCAA5]" to="/Reportes" onClick={closeMenus}>Reportes</Link></li>
                    </ul>

                    <div className="border-t border-white/10 pt-3">
                        {!user ? (
                            <div className="flex flex-col gap-2">
                                <Link className="text-center text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20" to="/register" onClick={closeMenus}>
                                    Registrarse
                                </Link>
                                <Link className="text-center text-white bg-white/10 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/20" to="/login" onClick={closeMenus}>
                                    Iniciar Sesión
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 text-sm text-white">
                                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                                    <img src={pfpImg} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-white/20" />
                                    <div>
                                        <p className="font-medium">{user.nombre}</p>
                                        <p className="text-white/50 text-xs">{user.correo}</p>
                                    </div>
                                </div>
                                <Link className="py-2 hover:text-[#5DCAA5]" to="/perfil" onClick={closeMenus}>
                                    Perfil
                                </Link>
                                <Link className="py-2 hover:text-[#5DCAA5]" to="/mis-reportes" onClick={closeMenus}>
                                    Mis reportes
                                </Link>
                                <Link className="flex items-center justify-between py-2 hover:text-[#5DCAA5]" to="/notificaciones" onClick={closeMenus}>
                                    Notificaciones
                                    {noLeidasCount > 0 && (
                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5DCAA5] px-1 text-[10px] font-bold text-[#0a1a10]">
                                            {noLeidasCount > 9 ? "9+" : noLeidasCount}
                                        </span>
                                    )}
                                </Link>
                                <button onClick={logout} className="text-left py-2 text-red-300 hover:text-red-400">
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

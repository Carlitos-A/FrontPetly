import { useState } from "react";
import { useAuth } from "../../auth/context/authContext";
import { useNotificaciones } from "../hooks/useNotificaciones";
import NotificacionCard from "./NotificacionCard";
import NotificacionDetalleModal from "./NotificacionDetalleModal";

function BellIcon() {
    return (
        <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
    );
}

function SkeletonCard() {
    return (
        <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-white/10 shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/10" />
                <div className="h-3 w-1/2 rounded bg-white/10" />
            </div>
        </div>
    );
}

const FILTROS = [
    { value: "todas", label: "Todas" },
    { value: "no-leidas", label: "No leídas" },
];

export default function NotificacionesPage() {
    const { user } = useAuth();
    const [notificacionSeleccionada, setNotificacionSeleccionada] = useState(null);

    const {
        notificaciones,
        loading,
        error,
        noLeidasCount,
        filtro,
        setFiltro,
        leerUna,
        leerTodas,
        eliminar,
    } = useNotificaciones();

    if (!user) {
        return (
            <div className="min-h-screen bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] pt-20 flex items-center justify-center px-4">
                <div className="text-center text-white/60">
                    <BellIcon />
                    <p className="mt-4">Inicia sesión para ver tus notificaciones.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-[#369467] via-[#1a412f] to-[#0a1a10] pt-20 pb-6 px-4">
            <div className="mx-auto flex max-w-2xl flex-col">

                {/* Encabezado */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#5DCAA5]">Centro de alertas</p>
                        <h1 className="mt-1 text-3xl font-bold text-white">Notificaciones</h1>
                        {noLeidasCount > 0 && (
                            <p className="mt-1 text-sm text-white/50">
                                {noLeidasCount} sin leer
                            </p>
                        )}
                    </div>

                    {noLeidasCount > 0 && (
                        <button
                            onClick={leerTodas}
                            className="text-sm text-[#5DCAA5] border border-[#5DCAA5]/30 bg-[#5DCAA5]/10 px-4 py-2 rounded-xl hover:bg-[#5DCAA5]/20 transition-colors"
                        >
                            Marcar todas como leídas
                        </button>
                    )}
                </div>

                {/* Filtros */}
                <div className="mb-5 flex gap-2">
                    {FILTROS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFiltro(f.value)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                                filtro === f.value
                                    ? "bg-[#5DCAA5] border-[#5DCAA5] text-[#0a1a10]"
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {f.label}
                            {f.value === "no-leidas" && noLeidasCount > 0 && (
                                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                                    filtro === "no-leidas" ? "bg-[#0a1a10]/30" : "bg-[#5DCAA5]/20 text-[#5DCAA5]"
                                }`}>
                                    {noLeidasCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Contenido */}
                <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-2">
                {loading ? (
                    <div className="flex flex-col gap-3 pb-4">
                        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-300">
                        <p className="font-medium">Error al cargar notificaciones</p>
                        <p className="mt-1 text-sm text-red-300/70">{error}</p>
                    </div>
                ) : notificaciones.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 py-16 text-center backdrop-blur-sm">
                        <BellIcon />
                        <div>
                            <p className="font-medium text-white/70">
                                {filtro === "no-leidas" ? "No tienes notificaciones sin leer" : "No tienes notificaciones"}
                            </p>
                            <p className="mt-1 text-sm text-white/40">
                                Aquí aparecerán las alertas sobre tus mascotas y reportes.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {notificaciones.map((n) => (
                            <NotificacionCard
                                key={n.id}
                                notificacion={n}
                                onLeer={leerUna}
                                onEliminar={eliminar}
                                onClickCard={setNotificacionSeleccionada}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>

        {notificacionSeleccionada && (
            <NotificacionDetalleModal
                notificacion={notificacionSeleccionada}
                onClose={() => setNotificacionSeleccionada(null)}
                onLeer={leerUna}
            />
        )}
        </div>
    );
}

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../../../assets/heromascotas.jpg";
import { useAuth } from "../../auth/context/authContext";
import AuthGuardModal from "../../../shared/components/AuthGuardModal";
import { useRecentReports } from "../hooks/useRecentReports";
import ActionCard from "./ActionCard";
import ReportPreview from "./ReportPreview";
import MiniReport from "./MiniReport";

export default function HomePage() {
  const carouselRef = useRef(null);
  const [authGuardOpen, setAuthGuardOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { reports, loading, error } = useRecentReports(8);

  function handleReportAction(routeType) {
    if (!user) {
      setAuthGuardOpen(true);
      return;
    }

    navigate(`/reportar/${routeType}`);
  }

  function scrollCarousel(direction) {
    carouselRef.current?.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  }

  return (
    <div className="h-full overflow-y-auto bg-[#f7faf6] pb-16 text-[#102218] md:h-[calc(100vh-6rem)]">
      <section className="relative min-h-95 overflow-hidden bg-[#143624] md:min-h-110">
        <img
          src={heroImage}
          alt="Persona abrazando a una mascota"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#07170f]/90 via-[#143624]/55 to-[#07170f]/20" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#f7faf6] to-transparent" />

        <div className="relative z-10 mx-auto grid min-h-95 max-w-7xl items-center gap-8 px-4 py-10 md:min-h-110 md:grid-cols-[1fr_360px] md:px-8">
          <div className="max-w-2xl pt-4 text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              Red comunitaria Petly
            </span>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-[3.35rem]">
              Ayudemos a que cada mascota vuelva a casa
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
              Publica reportes claros, revisa avisos recientes y conecta rapido
              con personas cerca de tu sector.
            </p>
          </div>

          <div className="rounded-[24px] border border-white/30 bg-white/92 p-5 shadow-2xl backdrop-blur">
            <div className="mb-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2f7f5a]">
                Comienza aqui
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#102218]">
                Crear un reporte
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ActionCard
                title="Mascota perdida"
                text="Necesito encontrarla"
                tone="lost"
                onClick={() => handleReportAction("perdido")}
              />

              <ActionCard
                title="Mascota encontrada"
                text="Quiero ayudar"
                tone="found"
                onClick={() => handleReportAction("encontrado")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#2f7f5a]">
              Comunidad activa
            </p>
            <h2 className="mt-1 text-3xl font-black text-[#102218]">
              Reportes recientes
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              aria-label="Ver reportes anteriores"
              onClick={() => scrollCarousel(-1)}
              className="cursor-pointer grid h-11 w-11 place-items-center rounded-full border border-[#143624]/15 bg-white text-[#143624] shadow-sm transition hover:bg-[#e7f6ef]"
            >
              {"<"}
            </button>

            <button
              type="button"
              aria-label="Ver mas reportes"
              onClick={() => scrollCarousel(1)}
              className="cursor-pointer grid h-11 w-11 place-items-center rounded-full border border-[#143624]/15 bg-white text-[#143624] shadow-sm transition hover:bg-[#e7f6ef]"
            >
              {">"}
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[260px] min-w-[230px] animate-pulse rounded-2xl bg-[#dce9df]"
                />
              ))
            : reports.map((report) => (
                <ReportPreview key={report.id} report={report} />
              ))}
        </div>

        {!loading && reports.length === 0 && (
          <div className="rounded-2xl border border-[#143624]/10 bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-bold text-[#102218]/70">
              {error || "Aun no hay reportes publicados desde el servidor."}
            </p>
          </div>
        )}
      </section>

      <section className="bg-[#1a412f] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-9 md:grid-cols-[1fr_340px] md:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#9fe2c9]">
              Mas ojos, mas oportunidades
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Ayuda a reunir mascotas perdidas
            </h2>

            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/75">
              Revisa los reportes, comparte con tus vecinos y avisa si tienes
              informacion. Petly funciona mejor cuando la comunidad se mueve.
            </p>

            <button
              type="button"
              onClick={() => handleReportAction("encontrado")}
              className="mt-6 rounded-lg bg-[#082c4f] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-[#061f38]"
            >
              Reportar mascota encontrada
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {reports.slice(0, 2).map((report) => (
              <MiniReport key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      <AuthGuardModal
        open={authGuardOpen}
        onClose={() => setAuthGuardOpen(false)}
      />
    </div>
  );
}

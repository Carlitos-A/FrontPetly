import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapReports } from "../services/reportMapService";
import { reportsToGeoJson } from "../utils/reportsToGeoJson";

const EMPTY_GEOJSON = {
    type: "FeatureCollection",
    features: [],
};


function Map({
    filters = {},
    selectedReportId,
    onReportSelect,
    selectable = false,
    selectedCoords = null,
    onLocationSelect, }) {


    const mapRef = useRef();
    const mapContainerRef = useRef();
    const onReportSelectRef = useRef(onReportSelect);
    const popupRef = useRef(null);
    const selectionMarkerRef = useRef(null);
    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    const [mapReady, setMapReady] = useState(false);
    const [error] = useState(() =>
        mapboxgl.supported()
            ? ""
            : "Tu navegador no tiene WebGL disponible. Activa la aceleracion por hardware o prueba con otro navegador.",
    );

    useEffect(() => {
        onReportSelectRef.current = onReportSelect;
    }, [onReportSelect]);

    useEffect(() => {
        if (!token || error) return;

        mapboxgl.accessToken = token;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-70.6693, -33.4489],
            zoom: 11,
        });

        mapRef.current = map;

        map.on("load", () => {
            if (!selectable) {
                addReportsLayer(map);
                bindReportEvents(map, onReportSelectRef, popupRef);
            }
            map.resize();
            setMapReady(true);
        });

        //Verifica si la seleccion esta activada, sino, no hace nada
        //En caso de que si se extraen las coordenadas del punto donde se hizo click
        map.on("click", (e) => {
            if (!selectable) return;

            const { lng, lat } = e.lngLat;
            onLocationSelect?.({ lat, lng });
        });

        map.on("error", (event) => {
            console.error("Error al cargar Mapbox:", event.error);
        });

        return () => {
            map.remove();
            mapRef.current = null;
            popupRef.current?.remove();
            popupRef.current = null;
            setMapReady(false);
            selectionMarkerRef.current?.remove();
            selectionMarkerRef.current = null;
        };
    }, [token, error, selectable]);


    useEffect(() => {
        if (!mapReady || !mapRef.current || selectable) return;

        let ignore = false;

        async function loadReports() {
            try {
                const reports = await getMapReports(filters);
                const filteredReports = filterReports(reports, filters);
                const geoJson = reportsToGeoJson(filteredReports);
                const source = mapRef.current?.getSource("reportes");

                if (!ignore && source) {
                    source.setData(geoJson);
                }
            } catch (err) {
                console.error("Error al cargar reportes del mapa:", err);
            }
        }

        loadReports();

        return () => {
            ignore = true;
        };
    }, [filters, mapReady]);


    useEffect(() => {
        if (!mapReady || !mapRef.current) return;

        function handleResize() {
            mapRef.current?.resize();
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [mapReady]);


    useEffect(() => {
        if (!mapReady || !mapRef.current || selectable) return;

        const selectedId = selectedReportId == null ? "" : String(selectedReportId);

        if (mapRef.current.getLayer("reportes-seleccionado")) {
            mapRef.current.setFilter("reportes-seleccionado", [
                "==",
                ["to-string", ["get", "id"]],
                selectedId,
            ]);
        }

        if (selectedReportId == null) {
            popupRef.current?.remove();
            popupRef.current = null;
            return;
        }

        const selectedFeature = findReportFeatureById(mapRef.current, selectedId);

        if (selectedFeature) {
            if (!isMobileViewport()) {
            showReportPopup(mapRef.current, selectedFeature, popupRef);
             } else {
                popupRef.current?.remove();
                popupRef.current = null;
            }       
            mapRef.current.easeTo({
                center: selectedFeature.geometry.coordinates,
                duration: 700,
            });
        }
    }, [selectedReportId, mapReady]);

    useEffect(() => {
        if (!mapReady || !mapRef.current || !selectable) return;
        if (!selectedCoords) return;

        // eliminar anterior
        selectionMarkerRef.current?.remove();

        // crear nuevo
        selectionMarkerRef.current = new mapboxgl.Marker({ color: "#5DCAA5" })
            .setLngLat([selectedCoords.lng, selectedCoords.lat])
            .addTo(mapRef.current);

        // centrar mapa al punto seleccionado
        mapRef.current.easeTo({
            center: [selectedCoords.lng, selectedCoords.lat],
            //Hace un zoom
            zoom: 14,
            //Lento
            duration: 500,
        });
    }, [selectedCoords, selectable, mapReady]);


    if (!token || token === "tu_token_de_mapbox") {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white/10 text-white">
                Falta configurar VITE_MAPBOX_TOKEN en .env
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-white/10 px-6 text-center text-white">
                {error}
            </div>
        );
    }

    return (
        <div
            ref={mapContainerRef}
            className="w-full h-full border-b border-stone-200"
            aria-label="Mapa de mascotas perdidas"
        />
    );
}

function addReportsLayer(map) {
    map.addSource("reportes", {
        type: "geojson",
        data: EMPTY_GEOJSON,
    });

    map.addLayer({
        id: "reportes-puntos",
        type: "circle",
        source: "reportes",
        paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 6, 14, 14],
            "circle-color": [
                "match",
                ["get", "tipo_reporte"],
                "PERDIDA",
                "#ef4444",
                "ENCONTRADA",
                "#5DCAA5",
                "AVISTAMIENTO",
                "#facc15",
                "#facc15",
            ],
            "circle-opacity": 0.95,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
            "circle-blur": 0.15,
        },
    });

    map.addLayer({
        id: "reportes-seleccionado",
        type: "circle",
        source: "reportes",
        filter: ["==", ["to-string", ["get", "id"]], ""],
        paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, 10, 14, 20],
            "circle-color": "rgba(255, 255, 255, 0)",
            "circle-stroke-width": 4,
            "circle-stroke-color": "#ffffff",
            "circle-opacity": 1,
        },
    });
}




function bindReportEvents(map, onReportSelectRef, popupRef) {
    map.on("click", "reportes-puntos", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;

        const props = feature.properties;
        onReportSelectRef.current?.(props);

        if (!isMobileViewport()) {
            showReportPopup(map, feature, popupRef);
        }

    });
    map.on("mouseenter", "reportes-puntos", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "reportes-puntos", () => {
        map.getCanvas().style.cursor = "";
    });
}

function findReportFeatureById(map, reportId) {
    return map
        .querySourceFeatures("reportes")
        .find((feature) => String(feature.properties?.id) === String(reportId));
}

function isMobileViewport() {
    return window.matchMedia("(max-width: 767px)").matches;
}


function showReportPopup(map, feature, popupRef) {
    const props = feature.properties;

    popupRef.current?.remove();
    popupRef.current = new mapboxgl.Popup({ offset: 15 })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`
<div class="w-64 rounded-xl bg-white shadow-xl p-4 text-slate-800">
    <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
            <img class="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" />
            <div>
                <p class="text-sm font-semibold">${props.tipo_reporte || "Reporte"}</p>
                <p class="text-xs text-slate-500">@usuario</p>
            </div>
        </div>
        <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded">
            Contactar
        </button>
    </div>

    <div class="grid grid-cols-2 gap-x-3 gap-y-1 mt-2 text-xs">
        <p><span class="font-medium">Especie:</span> ${props.especie || "Sin dato"}</p>
        <p><span class="font-medium">Raza:</span> ${props.raza || "Sin dato"}</p>
        <p><span class="font-medium">Color:</span> ${props.color_principal || props.colorPrincipal || "Sin dato"}</p>
        <p><span class="font-medium">Tamaño:</span> ${props.tamanio || "Sin dato"}</p>
        <p><span class="font-medium">Sexo:</span> ${props.sexo || "Sin dato"}</p>
        <p><span class="font-medium">Edad:</span> ${props.edad_aproximada || props.edadAproximada || "Sin dato"}</p>
    </div>

    <p class="text-xs mt-2">
        <span class="font-medium">Descripcion:</span> ${props.descripcion || "Sin descripcion"}
    </p>

    <p class="text-xs mt-2">
        <span class="font-medium">Contacto:</span> ${props.contacto || "Sin contacto"}
    </p>
</div>
`)
        .addTo(map);
}

function filterReports(reports = [], filters = {}) {
    const tipoReporte = filters.tipoReporte || filters.tipo_reporte;

    return reports.filter((report) => {
        if (tipoReporte && report.tipoReporte !== tipoReporte && report.tipo_reporte !== tipoReporte) return false;
        if (filters.search) {
            const searchableText = [
                report.nombre,
                report.tipoReporte,
                report.tipo_reporte,
                report.especie,
                report.raza,
                report.colorPrincipal,
                report.color_principal,
                report.tamanio,
                report.sexo,
                report.edadAproximada,
                report.edad_aproximada,
                report.descripcion,
                report.contacto,
            ].join(" ").toLowerCase();

            if (!searchableText.includes(filters.search.toLowerCase())) return false;
        }

        return true;
    });
}

export default Map;

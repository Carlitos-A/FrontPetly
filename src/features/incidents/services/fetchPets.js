import { mockPets } from "../data/MockPets";
import { normalizeReport } from "../utils/normalizeReport";

const USE_MOCK = import.meta.env.VITE_USE_MOCKS === "true";
const REPORTS_API_URL = import.meta.env.VITE_REPORTS_MAP_URL || "http://localhost:8080/petly/reportes";
const REPORTS_BY_TYPE_API_URL = `${REPORTS_API_URL}/filtrar/tipo`;

function getReportTypeFilter(filters) {
    return filters.tipoReporte || filters.tipo_reporte;
}

function buildReportsUrl(filters = {}) {
    const tipoReporte = getReportTypeFilter(filters);

    if (tipoReporte) {
        const query = new URLSearchParams({ tipoReporte });
        return `${REPORTS_BY_TYPE_API_URL}?${query.toString()}`;
    }

    const query = new URLSearchParams();

    if (filters.search) query.append("search", filters.search);

    const queryString = query.toString();
    return queryString ? `${REPORTS_API_URL}?${queryString}` : REPORTS_API_URL;
}

function normalizePets(data) {
  return data.map(normalizeReport);
}

function filterPets(pets, filters) {
    return pets.filter(p => {
        const tipoReporte = getReportTypeFilter(filters);

        if (tipoReporte && p.tipoReporte !== tipoReporte && p.tipo_reporte !== tipoReporte) return false;
        if (filters.search) {
            const searchableText = [
                p.name,
                p.species,
                p.breed,
                p.color,
                p.size,
                p.sex,
                p.approximateAge,
                p.description,
                p.contacto,
                p.latitud,
                p.longitud,
            ].join(" ").toLowerCase();

            if (!searchableText.includes(filters.search.toLowerCase())) return false;
        }
        return true;
    });
}

export async function fetchPetById(id) {
    if (USE_MOCK) {
        const pet = mockPets.find(p => String(p.id) === String(id));
        return pet ? normalizePets([pet])[0] : null;
    }
    try {
        const [detailRes, listRes] = await Promise.all([
            fetch(`${REPORTS_API_URL}/${id}`),
            fetch(REPORTS_API_URL),
        ]);
        if (!detailRes.ok) throw new Error(`HTTP ${detailRes.status}`);
        const detail = await detailRes.json();
        if (listRes.ok) {
            const list = await listRes.json();
            const match = Array.isArray(list)
                ? list.find(r => String(r.id ?? r.idreporte) === String(id))
                : null;
            if (match?.latitud) detail.latitud = match.latitud;
            if (match?.longitud) detail.longitud = match.longitud;
        }
        return normalizePets([detail])[0];
    } catch (error) {
        console.warn("Error al obtener reporte:", error);
        return null;
    }
}

export async function fetchPets(filters = {}) {
    if (USE_MOCK) {
        return filterPets(mockPets, filters);
    }

    const url = buildReportsUrl(filters);

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        return normalizePets(data);
    } catch (error) {
        console.warn("Fallback a mock:", error);
        return filterPets(mockPets, filters);
    }
}

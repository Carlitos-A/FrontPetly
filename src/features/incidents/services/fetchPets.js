import { mockPets } from "../data/MockPets";
const USE_MOCK = import.meta.env.VITE_USE_MOCKS === "true";
const REPORTS_API_URL = "http://localhost:8081/petly/reportes";

function buildQuery(filters) {
    const query = new URLSearchParams();

    if (filters.estado) query.append("estado", filters.estado);
    if (filters.tipo_reporte) query.append("tipo_reporte", filters.tipo_reporte);
    if (filters.search) query.append("search", filters.search);

    return query.toString();
}

function normalizePets(data) {
    return data.map((pet) => ({
        id: pet.id,
        name: pet.nombre || pet.tipo_reporte || "Sin nombre",
        species: pet.especie,
        breed: pet.raza,
        color: pet.color_principal,
        size: pet.tamanio,
        sex: pet.sexo,
        approximateAge: pet.edad_aproximada,
        tipoReporte: pet.tipo_reporte,
        status: pet.estado_mascota,
        description: pet.descripcion,
        contacto: pet.contacto,
        imagen_url: pet.imagen_url,
        latitud: pet.latitud,
        longitud: pet.longitud,
        fechaReporte: pet.fecha_reporte,
        estadoReporte: pet.estado_reporte,
    }));
}

function filterPets(pets, filters) {
    return pets.filter(p => {
        if (filters.tipo_reporte && p.tipoReporte !== filters.tipo_reporte && p.tipo_reporte !== filters.tipo_reporte) return false;
        if (filters.estado && p.estadoReporte !== filters.estado && p.estado_reporte !== filters.estado) return false;
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
            ].join(" ").toLowerCase();

            if (!searchableText.includes(filters.search.toLowerCase())) return false;
        }
        return true;
    });
}

export async function fetchPets(filters = {}) {
    if (USE_MOCK) {
        return filterPets(mockPets, filters);
    }

    const query = buildQuery(filters);
    const url = query ? `${REPORTS_API_URL}?${query}` : REPORTS_API_URL;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        return filterPets(normalizePets(data), filters);
    } catch (error) {
        console.warn("Fallback a mock:", error);
        return filterPets(mockPets, filters);
    }
}


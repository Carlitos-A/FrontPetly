import { mockPets } from "../data/MockPets";
const USE_MOCK = import.meta.env.VITE_USE_MOCKS === "true";

function buildQuery(filters) {
    const query = new URLSearchParams();

    if (filters.species) query.append("species", filters.species);
    if (filters.status) query.append("status", filters.status);
    if (filters.search) query.append("search", filters.search);

    return query.toString();
}
function normalizePets(data) {
    return data.map((pet) => ({
        id: pet.id,
        name: pet.name,
        species: pet.species,
        status: pet.status,
    }));
}
function filterPets(pets, filters) {
    return pets.filter(p => {
        if (filters.species && p.species !== filters.species) return false;
        if (filters.status && p.status !== filters.status) return false;
        if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
    });
}

export async function fetchPets(filters = {}) {
    // Modo mock forzado
    if (USE_MOCK) {
        return filterPets(mockPets, filters);
    }


    const query = buildQuery(filters);

    try {
        const res = await fetch(`/api/pets?${query}`);

        //Validación HTTP
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // Normalización
        return normalizePets(data);

    } catch (error) {
        console.warn("Fallback a mock:", error);

        //Fallback automático
        return filterPets(mockPets, filters);
    }
}


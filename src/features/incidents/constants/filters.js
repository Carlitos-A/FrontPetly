export const DEFAULT_PET_FILTERS = {
    species: "all",
    status: "all",
};

export const FILTER_OPTIONS = {
    species: [
        { value: "all", label: "Todas" },
        { value: "dog", label: "Perros" },
        { value: "cat", label: "Gatos" },
    ],
    status: [
        { value: "all", label: "Todos" },
        { value: "lost", label: "Perdidos" },
        { value: "found", label: "Encontrados" },
    ],
};
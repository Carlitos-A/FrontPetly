export const DEFAULT_PET_FILTERS = {
    species: null,
    status: null,
    search: "",
};
export const FILTER_OPTIONS = {
    species: [
        { value: "dog", label: "Perros" },
        { value: "cat", label: "Gatos" },
        { value: "others", label: "Otros" },

    ],
    status: [
        { value: "lost", label: "Perdidos" },
        { value: "found", label: "Encontrados" },
    ],
};
import { useEffect, useState } from "react";

// Esto debe ser usado para las llamadas a la API, para evitar hacer una llamada cada vez que el usuario escribe una letra en el filtro de búsqueda, lo ideal es esperar a que el usuario deje de escribir por un momento (300ms por ejemplo) para hacer la llamada a la API con el valor actualizado del filtro.

export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}
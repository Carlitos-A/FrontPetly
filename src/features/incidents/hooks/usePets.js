import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { fetchPets } from "../services/fetchPets";

export function usePets(filters) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedFilters = useDebounce(filters, 400);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await fetchPets(debouncedFilters);
        setPets(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [debouncedFilters]);

  return { pets, loading };
}


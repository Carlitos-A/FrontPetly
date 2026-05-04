import { useEffect, useState } from "react";
import { getMisMascotas } from "../services/misMascotasService";

export function useMisMascotas() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPets() {
      setLoading(true);

      const result = await getMisMascotas();

      if (result.success) {
        setPets(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    }

    fetchPets();
  }, []);

  return {
    pets,
    loading,
    error,
  };
}
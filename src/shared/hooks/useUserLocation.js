import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(() =>
    "geolocation" in navigator ? null : "Geolocalizacion no disponible",
  );

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });
        setError(null);
      },
      (geoError) => {
        setError(geoError.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 10_000,
      },
    );
  }, []);

  return { location, error };
}

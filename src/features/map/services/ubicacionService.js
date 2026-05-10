const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export async function ubicacionCoord(lat, lng, signal) {
  if (!MAPBOX_TOKEN) return "Ubicación no informada";

  const latitude = Number(lat);
  const longitude = Number(lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return "Ubicación no informada";
  }

  const params = new URLSearchParams({
    access_token: MAPBOX_TOKEN,
    language: "es",
    types: "address,neighborhood,locality,place",
    limit: "1",
  });

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?${params.toString()}`,
      { signal }
    );

    if (!response.ok) return "Ubicación no informada";

    const data = await response.json();
    const feature = data.features?.[0];

    return formatearUbicacion(feature);
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return "Ubicación no informada";
  }
}


export async function ubicacionCoord2(lat, lng, signal) {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  if (!MAPBOX_TOKEN) return "Ubicación no informada";

  const latitude = Number(lat);
  const longitude = Number(lng);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return "Ubicación no informada";
  }

  const params = new URLSearchParams({
    access_token: MAPBOX_TOKEN,
    language: "es",
    types: "address",
    limit: "1",
  });

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?${params.toString()}`,
      { signal }
    );

    if (!response.ok) return "Ubicación no informada";

    const data = await response.json();
    const feature = data.features?.[0];

    return formatearUbicacion2(feature) || "Ubicación no informada";
  } catch (error) {
    if (error.name === "AbortError") throw error;
    return "Ubicación no informada";
  }
}

function formatearUbicacion(feature) {
  if (!feature) return "Ubicación no informada";

  const calle = feature.text;

  const comuna =
    feature.context?.find((item) => item.id?.startsWith("locality"))?.text ||
    feature.context?.find((item) => item.id?.startsWith("place"))?.text ||
    feature.context?.find((item) => item.id?.startsWith("region"))?.text;

  const partes = [calle, comuna].filter(Boolean);

  return partes.length > 0
    ? partes.join(", ")
    : feature.place_name || "Ubicación no informada";
}

function formatearUbicacion2(feature) {
  if (!feature) return "Ubicación no informada";

  const calle = quitarNumeroCalle(feature.text);

  const comuna =
    feature.context?.find((item) => item.id?.startsWith("locality"))?.text ||
    feature.context?.find((item) => item.id?.startsWith("place"))?.text ||
    feature.context?.find((item) => item.id?.startsWith("region"))?.text;

  const partes = [calle, comuna].filter(Boolean);

  return partes.length > 0
    ? partes.join(", ")
    : feature.place_name || "Ubicación no informada";
}

function quitarNumeroCalle(calle) {
  if (!calle) return "";

  return calle
    .replace(/\s+\d+[A-Za-z]?(?:-\d+)?$/, "")
    .trim();
}

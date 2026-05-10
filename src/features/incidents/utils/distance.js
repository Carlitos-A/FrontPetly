export function getDistanceFromReference(referenceLocation, item) {
  const refLat = Number(referenceLocation?.latitud);
  const refLng = Number(referenceLocation?.longitud);

  const lat = Number(item?.latitud ?? item?.lat ?? item?.latitude);
  const lng = Number(item?.longitud ?? item?.lng ?? item?.lon ?? item?.longitude);

  if (
    Number.isFinite(refLat) &&
    Number.isFinite(refLng) &&
    Number.isFinite(lat) &&
    Number.isFinite(lng)
  ) {
    return haversineDistance(refLat, refLng, lat, lng);
  }

  const distance = Number(item?.distance ?? item?.distancia);

  return Number.isFinite(distance) ? distance : null;
}

export function comparePetsByDistance(referenceLocation) {
  return (petA, petB) => {
    const distanceA = getDistanceFromReference(referenceLocation, petA);
    const distanceB = getDistanceFromReference(referenceLocation, petB);

    if (distanceA == null && distanceB == null) return 0;
    if (distanceA == null) return 1;
    if (distanceB == null) return -1;

    return distanceA - distanceB;
  };
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

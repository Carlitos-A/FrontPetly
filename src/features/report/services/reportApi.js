const API_URL = "http://localhost:8080";

export async function createReport(data, tipoReporte) {
  const formData = new FormData();

  const json = {
    latitud: data.lat,
    longitud: data.lng,
    tipoReporte: tipoReporte,
    descripcion: data.descripcion,
    contacto: data.contacto,
    especie: data.especie,
    raza: data.raza || "",
    colorPrincipal: data.colorPrincipal || "",
    tamanio: data.tamanio,
    sexo: data.sexo,
    edadAproximada: data.edadAproximada || null,
    otraEspecie:
      data.especie === "OTRO" ? data.especiePersonalizada : null
  };


  formData.append(
    "data",
    new Blob([JSON.stringify(json)], { type: "application/json" })
  );
  // especie personalizada si aplica


  // imagen
  if (data.photo) {
    formData.append("imagen", data.photo);
  }



  const token = localStorage.getItem("token");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 13000);

  try {
    const res = await fetch(`${API_URL}/petly/reportes`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
      signal: controller.signal,
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Error al crear reporte");
    }

    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("El servidor tardó demasiado. Intenta de nuevo en unos segundos.");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
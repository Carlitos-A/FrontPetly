const PET_API_URL = "http://localhost:8080/petly/mascotas";

export function getPetId(pet) {
    return pet?.id ?? pet?.idMascota ?? pet?.mascotaId ?? pet?.chip;
}

export async function updatePet(petId, data) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append(
            "data",
            new Blob(
                [JSON.stringify({
                    chip: data.chip,
                    nombre: data.name,
                    sexo: data.gender,
                    edad: data.age,
                    tipo: data.type,
                    color: data.color,
                    raza: data.breed,
                    descripcion: data.description,
                    otroTipo: data.otherPetType,
                })],
                { type: "application/json" }
            )
        );

        if (data.photo) {
            formData.append("file", data.photo);
        }

        const response = await fetch(`${PET_API_URL}/editar/${petId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const text = await response.text();
        const result = text ? JSON.parse(text) : data;

        return {
            success: true,
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
}
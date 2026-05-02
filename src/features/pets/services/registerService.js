export async function registerService(Data) {
    try {

        const data = new FormData();


        data.append("data", JSON.stringify({
            chip: Data.chip,
            name: Data.name,
            gender: Data.gender,
            age: Data.age,
            type: Data.type,
            color: Data.color,
            breed: Data.breed,
            description: Data.description,
            otherPetType: Data.otherPetType,
        }));


        if (Data.photo) {
            data.append("file", Data.photo);
        }

        console.log("=== PAYLOAD ENVIADO ===");
        for (let [key, value] of data.entries()) {
            if (key === "data") {
                console.log(key, JSON.parse(value)); // bonito
            } else {
                console.log(key, value); // file
            }
        }

        const response = await fetch("http://localhost:8080/petly/mascotas/registrar", {
            method: "POST",
            body: data, // ⚠️ SIN headers
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }



        const result = await response.json();

        return {
            success: true,
            data: result,
        };

    } catch (error) {

        if (error.message === "Failed to fetch") {
            console.error("Microservicio caído, endpoint incorrecto o CORS:");
        } else {
            console.error("Error al registrar mascota:", error);
        }

        return {
            success: false,
            error: error.message,
        };
    }
}


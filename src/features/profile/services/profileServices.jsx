const USER_API_URL = "http://localhost:8080/petly/usuarios";

export async function updateUserProfile(data) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${USER_API_URL}/${data.run}/actualizar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
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
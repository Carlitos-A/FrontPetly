export async function registerUser(data) {
    console.log("[MOCK API] Enviando datos al backend:", data);

    // Simulación de latencia real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulación de respuesta exitosa
    return {
        success: true,
        userId: "mock-123",
    };
}
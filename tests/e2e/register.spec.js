import { expect, test } from "@playwright/test";

async function mockRegister(context) {
  await context.route("**/petly/usuarios/registrar", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify({
        id: 99,
        nombre: "Nuevo Usuario",
        correo: "nuevo@petly.cl",
      }),
    });
  });
}

test.beforeEach(async ({ context }) => {
  await mockRegister(context);
});

test("registro no avanza si faltan campos requeridos", async ({ page }) => {
  await page.goto("/register");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: "Crear cuenta" })).toBeVisible();
});

test("registro exitoso redirige al login", async ({ page }) => {
  await page.goto("/register");

  await page.locator('input[name="nombre"]').fill("Nuevo Usuario");
  await page.locator('input[name="apellido_paterno"]').fill("Tester");
  await page.locator('input[name="apellido_materno"]').fill("Demo");
  await page.locator('input[name="telefono"]').fill("912345678");
  await page.locator('input[name="direccion"]').fill("Calle 123");
  await page.locator('input[name="correo"]').fill("nuevo@petly.cl");
  await page.locator('input[name="contrasena"]').fill("12345678");
  await page.locator('input[name="run"]').fill("12345678");
  await page.locator('input[name="dv"]').fill("9");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: /Iniciar/i })).toBeVisible();
});
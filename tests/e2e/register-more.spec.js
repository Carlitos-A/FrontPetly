import { expect, test } from "@playwright/test";

async function fillValidRegisterForm(page) {
  await page.locator('input[name="nombre"]').fill("Nuevo Usuario");
  await page.locator('input[name="apellido_paterno"]').fill("Tester");
  await page.locator('input[name="apellido_materno"]').fill("Demo");
  await page.locator('input[name="telefono"]').fill("912345678");
  await page.locator('input[name="direccion"]').fill("Calle 123");
  await page.locator('input[name="correo"]').fill("nuevo@petly.cl");
  await page.locator('input[name="contrasena"]').fill("12345678");
  await page.locator('input[name="run"]').fill("12345678");
  await page.locator('input[name="dv"]').fill("9");
}

test("registro permite mostrar y ocultar contraseña", async ({ page }) => {
  await page.goto("/register");

  const passwordInput = page.locator('input[name="contrasena"]');

  await expect(passwordInput).toHaveAttribute("type", "password");

  await page.getByRole("button", { name: "Ver" }).click();
  await expect(passwordInput).toHaveAttribute("type", "text");

  await page.getByRole("button", { name: "Ocultar" }).click();
  await expect(passwordInput).toHaveAttribute("type", "password");
});

test("registro con telefono invalido permanece en register", async ({ page }) => {
  await page.goto("/register");

  await fillValidRegisterForm(page);
  await page.locator('input[name="telefono"]').fill("abc");

  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: "Crear cuenta" })).toBeVisible();
});

test("registro muestra error del backend si el correo ya existe", async ({ context, page }) => {
  await context.route("**/petly/usuarios/registrar", async (route) => {
    await route.fulfill({
      status: 409,
      contentType: "text/plain",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: "Correo ya existe",
    });
  });

  await page.goto("/register");

  await fillValidRegisterForm(page);
  await page.getByRole("button", { name: "Crear cuenta" }).click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByText(/Correo ya existe/i)).toBeVisible();
});
import { expect, test } from "@playwright/test";

test("mapa bloquea acceso si no hay usuario autenticado", async ({ page }) => {
  await page.goto("/Mapa");

  await expect(page.getByRole("heading", { name: /Petly/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Iniciar/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Registrarse/i })).toBeVisible();

  await page.getByRole("button", { name: /Iniciar/i }).click();

  await expect(page).toHaveURL(/\/login$/);
});

test("ruta reportar bloquea acceso si no hay usuario autenticado", async ({ page }) => {
  await page.goto("/reportar/perdido");

  await expect(page.getByRole("heading", { name: /Petly/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Iniciar/i })).toBeVisible();

  await page.getByRole("button", { name: /Registrarse/i }).click();

  await expect(page).toHaveURL(/\/register$/);
});

test("tipo de reporte invalido muestra pantalla de error", async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("token", "fake.jwt.token");
    sessionStorage.setItem(
      "usuario",
      JSON.stringify({
        id: 1,
        nombre: "Usuario Test",
        correo: "test@petly.cl",
        run: "12345678",
      })
    );
  });

  await page.goto("/reportar/no-existe");

  await expect(page.getByRole("heading", { name: /Tipo de reporte no disponible/i })).toBeVisible();

  await page.getByRole("button", { name: /Volver/i }).click();

  await expect(page).toHaveURL("/");
});
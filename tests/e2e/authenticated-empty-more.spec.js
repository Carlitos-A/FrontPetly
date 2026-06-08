import { expect, test } from "@playwright/test";

const user = {
  id: 1,
  nombre: "Usuario Test",
  correo: "test@petly.cl",
  run: "12345678",
};

async function seedSession(page) {
  await page.addInitScript((storedUser) => {
    sessionStorage.setItem("token", "fake.jwt.token");
    sessionStorage.setItem("usuario", JSON.stringify(storedUser));
  }, user);
}

test("perfil sin sesion muestra mensaje para iniciar sesion", async ({ page }) => {
  await page.goto("/perfil");

  await expect(page.getByRole("heading", { name: "Mi perfil" })).toBeVisible();
  await expect(page.getByText(/Inicia sesi/i)).toBeVisible();
});

test("mis mascotas autenticado muestra empty state si no hay mascotas", async ({ context, page }) => {
  await context.route("**/petly/mascotas/filtrar/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  await seedSession(page);
  await page.goto("/mis-mascotas");

  await expect(page.getByRole("heading", { name: "Mis Mascotas" })).toBeVisible();
  await expect(page.getByText(/No tienes mascotas registradas/i)).toBeVisible();
});

test("mis reportes autenticado muestra empty state si no hay reportes", async ({ context, page }) => {
  await context.route("**/petly/reportes/filtrar/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  await seedSession(page);
  await page.goto("/mis-reportes");

  await expect(page.getByRole("heading", { name: "Mis reportes" })).toBeVisible();
  await expect(page.getByText(/No tienes reportes creados/i)).toBeVisible();
});
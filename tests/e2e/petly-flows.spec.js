import { expect, test } from "@playwright/test";

const user = {
  id: 1,
  nombre: "Usuario Test",
  correo: "test@petly.cl",
  run: "12345678",
  dv: "9",
};

const reports = [
  {
    id: 101,
    nombre: "Luna",
    tipoReporte: "PERDIDA",
    estadoMascota: "PERDIDA",
    especie: "Perro",
    raza: "Mestiza",
    colorPrincipal: "Cafe",
    tamanio: "Mediano",
    sexo: "Hembra",
    edadAproximada: "2 anos",
    contacto: "999999999",
    descripcion: "Se perdio cerca de la plaza",
    fechaReporte: "2026-06-01",
    estadoReporte: "ACTIVO",
    comuna: "Santiago",
  },
];

const pets = [
  {
    chip: "chip-1",
    nombre: "Firulais",
    raza: "Mestizo",
    color: "Negro",
    tipo: "Perro",
  },
];

const notifications = [
  {
    id: 1,
    titulo: "Coincidencia encontrada",
    mensaje: "Hay una posible coincidencia para tu reporte.",
    leida: false,
    tipo: "COINCIDENCIA_POTENCIAL",
    idReporte: 101,
    idReporteCoincidencia: 102,
    fechaCreacion: new Date().toISOString(),
  },
];

async function mockBackend(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  };

  await context.route("**/petly/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify({
        token: "fake.jwt.token",
        ...user,
      }),
    });
  });

  await context.route("**/petly/reportes**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify(reports),
    });
  });

  await context.route("**/petly/mascotas/filtrar/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify(pets),
    });
  });

  await context.route("**/petly/notificaciones/contador", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify(1),
    });
  });

  await context.route("**/petly/notificaciones/**", async (route) => {
    if (["PATCH", "DELETE"].includes(route.request().method())) {
      await route.fulfill({
        status: 204,
        headers: corsHeaders,
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify(notifications),
    });
  });

  await context.route("**/petly/notificaciones", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders,
      body: JSON.stringify(notifications),
    });
  });
}

async function seedSession(page) {
  await page.addInitScript((storedUser) => {
    sessionStorage.setItem("token", "fake.jwt.token");
    sessionStorage.setItem("usuario", JSON.stringify(storedUser));
  }, user);
}

test.beforeEach(async ({ context }) => {
  await mockBackend(context);
});

test("usuario invitado ve modal de autenticacion al intentar reportar", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Mascota perdida").click();

  await expect(page.getByRole("heading", { name: /Petly/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Iniciar/i })).toBeVisible();

  await page.getByRole("button", { name: /Registrarse/i }).click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: /Crear cuenta/i })).toBeVisible();
});

test("login guarda sesion en sessionStorage y permite cerrar sesion", async ({ page }) => {
  await page.goto("/login");

  await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  await page.getByPlaceholder(/contrase/i).fill("12345678");
  await page.getByRole("button", { name: /Iniciar/i }).click();

  await expect(page).toHaveURL("/");

  await expect.poll(() =>
    page.evaluate(() => sessionStorage.getItem("token"))
  ).toBe("fake.jwt.token");

  await expect.poll(() =>
    page.evaluate(() => localStorage.getItem("token"))
  ).toBeNull();

  await page.getByRole("button", { name: /Usuario Test/i }).click();
  await page.getByRole("button", { name: /Cerrar/i }).click();

  await expect.poll(() =>
    page.evaluate(() => sessionStorage.getItem("token"))
  ).toBeNull();
});

test("usuario autenticado navega por perfil, mascotas, reportes y notificaciones", async ({ page }) => {
  await seedSession(page);

  await page.goto("/perfil");
  await expect(page.getByText("Usuario Test").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mis reportes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Mis Mascotas" })).toBeVisible();
  await page.goto("/mis-mascotas");
  await expect(page.getByRole("heading", { name: "Mis Mascotas" })).toBeVisible();
  await expect(page.getByText("Firulais")).toBeVisible();
  await expect(page.getByText(/Mestizo/i)).toBeVisible();

  await page.goto("/mis-reportes");
  await expect(page.getByRole("heading", { name: "Mis reportes" })).toBeVisible();
  await expect(page.getByText("Luna")).toBeVisible();
  await expect(page.getByText(/Se perdio cerca/i)).toBeVisible();

  await page.goto("/notificaciones");
  await expect(page.getByRole("heading", { name: "Notificaciones" })).toBeVisible();
  await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();

  await page.getByRole("button", { name: /No le/i }).click();
  await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();

  await page.getByRole("button", { name: /Marcar todas/i }).click();
  await expect(page.getByText(/No tienes notificaciones sin leer/i)).toBeVisible();

  await page.getByRole("button", { name: "Todas" }).click();
  await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();
});
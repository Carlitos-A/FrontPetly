import { expect, test } from "@playwright/test";

const reports = [
  {
    id: 1,
    nombre: "Luna",
    tipoReporte: "PERDIDA",
    tipo_reporte: "PERDIDA",
    especie: "Perro",
    raza: "Mestiza",
    colorPrincipal: "Cafe",
    descripcion: "Perdida cerca de la plaza",
    fechaReporte: "2026-06-01",
    estadoReporte: "ACTIVO",
  },
  {
    id: 2,
    nombre: "Michi",
    tipoReporte: "ENCONTRADA",
    tipo_reporte: "ENCONTRADA",
    especie: "Gato",
    raza: "Domestico",
    colorPrincipal: "Blanco",
    descripcion: "Encontrado en avenida principal",
    fechaReporte: "2026-06-02",
    estadoReporte: "ACTIVO",
  },
  {
    id: 3,
    nombre: "Rocky",
    tipoReporte: "AVISTAMIENTO",
    tipo_reporte: "AVISTAMIENTO",
    especie: "Perro",
    raza: "Pastor",
    colorPrincipal: "Negro",
    descripcion: "Avistado cerca del parque",
    fechaReporte: "2026-06-03",
    estadoReporte: "ACTIVO",
  },
];

async function mockReports(context) {
  await context.route("**/petly/reportes**", async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname.includes("/filtrar/tipo")) {
      const tipo = url.searchParams.get("tipoReporte");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(reports.filter((report) => report.tipoReporte === tipo)),
      });
      return;
    }

    const search = url.searchParams.get("search")?.toLowerCase();

    const filtered = search
      ? reports.filter((report) =>
          [report.nombre, report.especie, report.raza, report.colorPrincipal, report.descripcion]
            .join(" ")
            .toLowerCase()
            .includes(search)
        )
      : reports;

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(filtered),
    });
  });
}

test.beforeEach(async ({ context }) => {
  await mockReports(context);
});

test("reportes publicos filtra por encontrados", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByRole("button", { name: "Encontrados" }).click();

  await expect(page.getByText("Michi").first()).toBeVisible();
  await expect(page.getByText("Luna")).toHaveCount(0);
  await expect(page.getByText("Rocky")).toHaveCount(0);
});

test("reportes publicos filtra por avistados", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByRole("button", { name: "Avistados" }).click();

  await expect(page.getByText("Rocky").first()).toBeVisible();
  await expect(page.getByText("Luna")).toHaveCount(0);
  await expect(page.getByText("Michi")).toHaveCount(0);
});

test("reportes publicos muestra empty state si no hay busqueda", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByPlaceholder(/Buscar por especie/i).fill("noexiste");

  await expect(page.getByRole("heading", { name: "Sin reportes" })).toBeVisible();
  await expect(page.getByText(/No hay reportes/i)).toBeVisible();
});

test("click en reporte navega al detalle", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByText("Luna").first().click();

  await expect(page).toHaveURL(/\/reportes\/1/);
});
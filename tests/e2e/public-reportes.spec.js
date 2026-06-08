import { expect, test } from "@playwright/test";

const reports = [
  {
    id: 1,
    nombre: "Luna",
    nombreMascota: "Luna",
    tipoReporte: "PERDIDA",
    tipo_reporte: "PERDIDA",
    especie: "Perro",
    raza: "Mestiza",
    colorPrincipal: "Cafe",
    color_principal: "Cafe",
    tamanio: "Mediano",
    sexo: "Hembra",
    edadAproximada: "2 anos",
    descripcion: "Perdida cerca de la plaza",
    fechaReporte: "2026-06-01",
    estadoReporte: "ACTIVO",
    comuna: "Santiago",
  },
  {
    id: 2,
    nombre: "Michi",
    nombreMascota: "Michi",
    tipoReporte: "ENCONTRADA",
    tipo_reporte: "ENCONTRADA",
    especie: "Gato",
    raza: "Domestico",
    colorPrincipal: "Blanco",
    color_principal: "Blanco",
    tamanio: "Pequeno",
    sexo: "Macho",
    edadAproximada: "1 ano",
    descripcion: "Encontrado en avenida principal",
    fechaReporte: "2026-06-02",
    estadoReporte: "ACTIVO",
    comuna: "Providencia",
  },
];

async function mockReports(context) {
  await context.route("**/petly/reportes**", async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname.includes("/petly/reportes/filtrar/tipo")) {
      const tipo = url.searchParams.get("tipoReporte");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(reports.filter((report) => report.tipoReporte === tipo)),
      });
      return;
    }

    const search = url.searchParams.get("search")?.toLowerCase();

    const filteredReports = search
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
      body: JSON.stringify(filteredReports),
    });
  });
}

test.beforeEach(async ({ context }) => {
  await mockReports(context);
});

test("reportes publicos carga listado inicial", async ({ page }) => {
  await page.goto("/reportes");

  await expect(page.getByRole("heading", { name: "Todos los reportes" })).toBeVisible();
  await expect(page.getByText("Luna").first()).toBeVisible();
  await expect(page.getByText("Michi").first()).toBeVisible();
  await expect(page.getByText(/2 reportes/i)).toBeVisible();
});

test("reportes publicos filtra por tipo perdido", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByRole("button", { name: "Perdidos" }).click();

  await expect(page.getByText("Luna").first()).toBeVisible();
  await expect(page.getByText("Michi")).toHaveCount(0);
});

test("reportes publicos filtra por busqueda", async ({ page }) => {
  await page.goto("/reportes");

  await page.getByPlaceholder(/Buscar por especie/i).fill("gato");

  await expect(page.getByText("Michi").first()).toBeVisible();
  await expect(page.getByText("Luna")).toHaveCount(0);
});
import { expect, test } from "@playwright/test";

test("login guarda el usuario solo en sessionStorage", async ({ context, page }) => {
  await context.route("**/petly/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: "fake.jwt.token",
        id: 1,
        nombre: "Usuario Test",
        correo: "test@petly.cl",
        run: "12345678",
        dv: "9",
      }),
    });
  });

  await page.goto("/login");

  await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  await page.getByPlaceholder(/contrase/i).fill("12345678");
  await page.getByRole("button", { name: /Iniciar/i }).click();

  await expect(page).toHaveURL("/");

  const sessionToken = await page.evaluate(() => sessionStorage.getItem("token"));
  const sessionUser = await page.evaluate(() => sessionStorage.getItem("usuario"));
  const localToken = await page.evaluate(() => localStorage.getItem("token"));
  const localUser = await page.evaluate(() => localStorage.getItem("usuario"));

  expect(sessionToken).toBe("fake.jwt.token");
  expect(sessionUser).toContain("Usuario Test");
  expect(localToken).toBeNull();
  expect(localUser).toBeNull();
});

test("al abrir el navegador de nuevo no mantiene el usuario guardado", async ({ browser }) => {
  const context = await browser.newContext();

  await context.route("**/petly/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: "fake.jwt.token",
        id: 1,
        nombre: "Usuario Test",
        correo: "test@petly.cl",
      }),
    });
  });

  const page = await context.newPage();

  await page.goto("http://127.0.0.1:5173/login");

  await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  await page.getByPlaceholder(/contrase/i).fill("12345678");
  await page.getByRole("button", { name: /Iniciar/i }).click();

  await expect(page).toHaveURL("http://127.0.0.1:5173/");

  expect(await page.evaluate(() => sessionStorage.getItem("token"))).toBe("fake.jwt.token");

  await context.close();

  const newContext = await browser.newContext();
  const newPage = await newContext.newPage();

  await newPage.goto("http://127.0.0.1:5173/");

  expect(await newPage.evaluate(() => sessionStorage.getItem("token"))).toBeNull();
  expect(await newPage.evaluate(() => sessionStorage.getItem("usuario"))).toBeNull();

  await newContext.close();
});
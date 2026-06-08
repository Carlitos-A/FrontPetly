import { expect, test } from "@playwright/test";

test("logo vuelve al home desde login", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("link", { name: /Logo Petly/i }).click();

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: /Ayudemos/i })).toBeVisible();
});

test("header navega a login", async ({ page }) => {
  await page.goto("/");

  await page.locator('a[href="/login"]').first().click();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: /Iniciar/i })).toBeVisible();
});

test("header navega a registro", async ({ page }) => {
  await page.goto("/");

  await page.locator('a[href="/register"]').first().click();

  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByRole("heading", { name: /Crear cuenta/i })).toBeVisible();
});

test("login permite mostrar y ocultar contraseña", async ({ page }) => {
  await page.goto("/login");

  const passwordInput = page.locator('input[name="contrasena"]');

  await expect(passwordInput).toHaveAttribute("type", "password");

  await page.getByRole("button", { name: "Ver" }).click();
  await expect(passwordInput).toHaveAttribute("type", "text");

  await page.getByRole("button", { name: "Ocultar" }).click();
  await expect(passwordInput).toHaveAttribute("type", "password");
});
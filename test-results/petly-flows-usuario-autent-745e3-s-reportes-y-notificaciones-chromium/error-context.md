# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: petly-flows.spec.js >> usuario autenticado navega por perfil, mascotas, reportes y notificaciones
- Location: tests\e2e\petly-flows.spec.js:177:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Usuario Test').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Usuario Test').first()

```

```yaml
- navigation:
  - link "Logo Petly":
    - /url: /
    - img "Logo"
    - text: Petly
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Mapa":
        - /url: /Mapa
    - listitem:
      - link "Reportes":
        - /url: /Reportes
  - link "Registrarse":
    - /url: /register
  - link "Iniciar Sesión":
    - /url: /login
- main:
  - paragraph: Perfil / User
  - img "Avatar de usuario"
  - heading "Mi perfil" [level=1]
  - paragraph: Inicia sesión para gestionar tu actividad en Petly.
  - link "📍 Ver reportes → Mis reportes Consulta los reportes que publicaste desde tu cuenta.":
    - /url: /mis-reportes
    - text: 📍 Ver reportes →
    - heading "Mis reportes" [level=2]
    - paragraph: Consulta los reportes que publicaste desde tu cuenta.
  - link "🐾 Ver mascotas → Mis mascotas Administra las mascotas registradas en tu perfil.":
    - /url: /mis-mascotas
    - text: 🐾 Ver mascotas →
    - heading "Mis mascotas" [level=2]
    - paragraph: Administra las mascotas registradas en tu perfil.
- contentinfo:
  - paragraph: © 2026 Petly. All rights reserved.
  - link "Trademark Policy":
    - /url: "#"
  - link "GitHub":
    - /url: https://github.com/Carlitos-A
    - text: GitHub
    - img
```

# Test source

```ts
  81  | 
  82  |   await context.route("**/petly/mascotas/filtrar/**", async (route) => {
  83  |     await route.fulfill({
  84  |       status: 200,
  85  |       contentType: "application/json",
  86  |       headers: corsHeaders,
  87  |       body: JSON.stringify(pets),
  88  |     });
  89  |   });
  90  | 
  91  |   await context.route("**/petly/notificaciones/contador", async (route) => {
  92  |     await route.fulfill({
  93  |       status: 200,
  94  |       contentType: "application/json",
  95  |       headers: corsHeaders,
  96  |       body: JSON.stringify(1),
  97  |     });
  98  |   });
  99  | 
  100 |   await context.route("**/petly/notificaciones/**", async (route) => {
  101 |     if (["PATCH", "DELETE"].includes(route.request().method())) {
  102 |       await route.fulfill({
  103 |         status: 204,
  104 |         headers: corsHeaders,
  105 |       });
  106 |       return;
  107 |     }
  108 | 
  109 |     await route.fulfill({
  110 |       status: 200,
  111 |       contentType: "application/json",
  112 |       headers: corsHeaders,
  113 |       body: JSON.stringify(notifications),
  114 |     });
  115 |   });
  116 | 
  117 |   await context.route("**/petly/notificaciones", async (route) => {
  118 |     await route.fulfill({
  119 |       status: 200,
  120 |       contentType: "application/json",
  121 |       headers: corsHeaders,
  122 |       body: JSON.stringify(notifications),
  123 |     });
  124 |   });
  125 | }
  126 | 
  127 | async function seedSession(page) {
  128 |   await page.addInitScript((storedUser) => {
  129 |     sessionStorage.setItem("token", "fake.jwt.token");
  130 |     sessionStorage.setItem("usuario", JSON.stringify(storedUser));
  131 |   }, user);
  132 | }
  133 | 
  134 | test.beforeEach(async ({ context }) => {
  135 |   await mockBackend(context);
  136 | });
  137 | 
  138 | test("usuario invitado ve modal de autenticacion al intentar reportar", async ({ page }) => {
  139 |   await page.goto("/");
  140 | 
  141 |   await page.getByText("Mascota perdida").click();
  142 | 
  143 |   await expect(page.getByRole("heading", { name: /Petly/i })).toBeVisible();
  144 |   await expect(page.getByRole("button", { name: /Iniciar/i })).toBeVisible();
  145 | 
  146 |   await page.getByRole("button", { name: /Registrarse/i }).click();
  147 | 
  148 |   await expect(page).toHaveURL(/\/register$/);
  149 |   await expect(page.getByRole("heading", { name: /Crear cuenta/i })).toBeVisible();
  150 | });
  151 | 
  152 | test("login guarda sesion en sessionStorage y permite cerrar sesion", async ({ page }) => {
  153 |   await page.goto("/login");
  154 | 
  155 |   await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  156 |   await page.getByPlaceholder(/contrase/i).fill("12345678");
  157 |   await page.getByRole("button", { name: /Iniciar/i }).click();
  158 | 
  159 |   await expect(page).toHaveURL("/");
  160 | 
  161 |   await expect.poll(() =>
  162 |     page.evaluate(() => sessionStorage.getItem("token"))
  163 |   ).toBe("fake.jwt.token");
  164 | 
  165 |   await expect.poll(() =>
  166 |     page.evaluate(() => localStorage.getItem("token"))
  167 |   ).toBeNull();
  168 | 
  169 |   await page.getByRole("button", { name: /Usuario Test/i }).click();
  170 |   await page.getByRole("button", { name: /Cerrar/i }).click();
  171 | 
  172 |   await expect.poll(() =>
  173 |     page.evaluate(() => sessionStorage.getItem("token"))
  174 |   ).toBeNull();
  175 | });
  176 | 
  177 | test("usuario autenticado navega por perfil, mascotas, reportes y notificaciones", async ({ page }) => {
  178 |   await seedSession(page);
  179 | 
  180 |   await page.goto("/perfil");
> 181 |   await expect(page.getByText("Usuario Test").first()).toBeVisible();
      |                                                        ^ Error: expect(locator).toBeVisible() failed
  182 |   await expect(page.getByRole("heading", { name: "Mis reportes" })).toBeVisible();
  183 |   await expect(page.getByRole("heading", { name: "Mis Mascotas" })).toBeVisible();
  184 |   await page.goto("/mis-mascotas");
  185 |   await expect(page.getByRole("heading", { name: "Mis Mascotas" })).toBeVisible();
  186 |   await expect(page.getByText("Firulais")).toBeVisible();
  187 |   await expect(page.getByText(/Mestizo/i)).toBeVisible();
  188 | 
  189 |   await page.goto("/mis-reportes");
  190 |   await expect(page.getByRole("heading", { name: "Mis reportes" })).toBeVisible();
  191 |   await expect(page.getByText("Luna")).toBeVisible();
  192 |   await expect(page.getByText(/Se perdio cerca/i)).toBeVisible();
  193 | 
  194 |   await page.goto("/notificaciones");
  195 |   await expect(page.getByRole("heading", { name: "Notificaciones" })).toBeVisible();
  196 |   await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();
  197 | 
  198 |   await page.getByRole("button", { name: /No le/i }).click();
  199 |   await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();
  200 | 
  201 |   await page.getByRole("button", { name: /Marcar todas/i }).click();
  202 |   await expect(page.getByText(/No tienes notificaciones sin leer/i)).toBeVisible();
  203 | 
  204 |   await page.getByRole("button", { name: "Todas" }).click();
  205 |   await expect(page.getByRole("main").getByText("Coincidencia encontrada")).toBeVisible();
  206 | });
```
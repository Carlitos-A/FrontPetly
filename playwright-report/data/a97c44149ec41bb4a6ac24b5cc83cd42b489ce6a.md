# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: petly-flows.spec.js >> login guarda sesion en sessionStorage y permite cerrar sesion
- Location: tests\e2e\petly-flows.spec.js:152:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "fake.jwt.token"
Received: null

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "Logo Petly" [ref=e7] [cursor=pointer]:
        - /url: /
        - img "Logo" [ref=e8]
        - generic [ref=e9]: Petly
      - list [ref=e10]:
        - listitem [ref=e11]:
          - link "Home" [ref=e12] [cursor=pointer]:
            - /url: /
        - listitem [ref=e13]:
          - link "Mapa" [ref=e14] [cursor=pointer]:
            - /url: /Mapa
        - listitem [ref=e15]:
          - link "Reportes" [ref=e16] [cursor=pointer]:
            - /url: /Reportes
      - generic [ref=e17]:
        - generic [ref=e18]:
          - button "Notificaciones" [ref=e19] [cursor=pointer]:
            - img [ref=e20]
            - generic [ref=e22]: "0"
          - generic:
            - generic:
              - paragraph: Notificaciones
              - generic: 0 sin leer
            - generic:
              - paragraph: No tienes notificaciones.
            - link "Ver todas las notificaciones":
              - /url: /notificaciones
        - generic [ref=e24]:
          - button "Usuario Test avatar" [ref=e25] [cursor=pointer]:
            - generic [ref=e26]: Usuario Test
            - img "avatar" [ref=e27]
          - generic:
            - generic:
              - paragraph: Usuario Test
              - paragraph: test@petly.cl
            - list:
              - listitem:
                - link "Agregar mascota":
                  - /url: /agregar-mascota
              - listitem:
                - link "Perfil":
                  - /url: /perfil
              - listitem:
                - link "Mis reportes":
                  - /url: /mis-reportes
              - listitem:
                - link "Mis mascotas":
                  - /url: /mis-mascotas
              - listitem:
                - link "Notificaciones":
                  - /url: /notificaciones
              - listitem:
                - button "Cerrar sesión"
  - main [ref=e28]:
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img "Persona abrazando a una mascota" [ref=e31]
        - generic [ref=e34]:
          - generic [ref=e35]:
            - generic [ref=e36]: Red comunitaria Petly
            - heading "Ayudemos a que cada mascota vuelva a casa" [level=1] [ref=e37]
            - paragraph [ref=e38]: Publica reportes claros, revisa avisos recientes y conecta rapido con personas cerca de tu sector.
          - generic [ref=e39]:
            - generic [ref=e40]:
              - paragraph [ref=e41]: Comienza aqui
              - heading "Crear un reporte" [level=2] [ref=e42]
            - generic [ref=e43]:
              - button "Mascota perdida Necesito encontrarla" [ref=e44] [cursor=pointer]:
                - img [ref=e46]
                - generic [ref=e50]: Mascota perdida
                - generic [ref=e51]: Necesito encontrarla
              - button "Mascota encontrada Quiero ayudar" [ref=e52] [cursor=pointer]:
                - img [ref=e54]
                - generic [ref=e60]: Mascota encontrada
                - generic [ref=e61]: Quiero ayudar
      - generic [ref=e62]:
        - generic [ref=e63]:
          - generic [ref=e64]:
            - paragraph [ref=e65]: Comunidad activa
            - heading "Reportes recientes" [level=2] [ref=e66]
          - generic [ref=e67]:
            - button "Ver reportes anteriores" [ref=e68] [cursor=pointer]: <
            - button "Ver mas reportes" [ref=e69] [cursor=pointer]: ">"
        - article [ref=e71] [cursor=pointer]:
          - generic [ref=e72]:
            - img [ref=e74]
            - generic [ref=e80]: Perdida
          - generic [ref=e81]:
            - heading "Perro" [level=3] [ref=e82]
            - paragraph [ref=e83]: Mestiza
            - generic [ref=e84]:
              - generic [ref=e85]: Cafe
              - generic [ref=e86]: Hace 7 d
              - generic [ref=e87]: Santiago
      - generic [ref=e89]:
        - generic [ref=e90]:
          - paragraph [ref=e91]: Mas ojos, mas oportunidades
          - heading "Ayuda a reunir mascotas perdidas" [level=2] [ref=e92]
          - paragraph [ref=e93]: Revisa los reportes, comparte con tus vecinos y avisa si tienes informacion. Petly funciona mejor cuando la comunidad se mueve.
          - button "Reportar mascota encontrada" [ref=e94]
        - article [ref=e96] [cursor=pointer]:
          - generic [ref=e98]: 🐾
          - generic [ref=e99]:
            - paragraph [ref=e100]: Perdida
            - heading "Perro" [level=3] [ref=e101]
            - paragraph [ref=e102]: Santiago
  - contentinfo [ref=e103]:
    - generic [ref=e104]:
      - generic [ref=e105]:
        - paragraph [ref=e106]: © 2026 Petly. All rights reserved.
        - link "Trademark Policy" [ref=e107] [cursor=pointer]:
          - /url: "#"
      - link "GitHub" [ref=e109] [cursor=pointer]:
        - /url: https://github.com/Carlitos-A
        - generic [ref=e110]: GitHub
        - img [ref=e111]
```

# Test source

```ts
  63  |       status: 200,
  64  |       contentType: "application/json",
  65  |       headers: corsHeaders,
  66  |       body: JSON.stringify({
  67  |         token: "fake.jwt.token",
  68  |         ...user,
  69  |       }),
  70  |     });
  71  |   });
  72  | 
  73  |   await context.route("**/petly/reportes**", async (route) => {
  74  |     await route.fulfill({
  75  |       status: 200,
  76  |       contentType: "application/json",
  77  |       headers: corsHeaders,
  78  |       body: JSON.stringify(reports),
  79  |     });
  80  |   });
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
> 163 |   ).toBe("fake.jwt.token");
      |     ^ Error: expect(received).toBe(expected) // Object.is equality
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
  181 |   await expect(page.getByText("Usuario Test").first()).toBeVisible();
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
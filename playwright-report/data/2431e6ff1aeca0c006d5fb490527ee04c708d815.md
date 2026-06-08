# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-session.spec.js >> al abrir el navegador de nuevo no mantiene el usuario guardado
- Location: tests\e2e\auth-session.spec.js:41:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "fake.jwt.token"
Received: null
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
      - generic [ref=e63]:
        - generic [ref=e64]:
          - paragraph [ref=e65]: Comunidad activa
          - heading "Reportes recientes" [level=2] [ref=e66]
        - generic [ref=e67]:
          - button "Ver reportes anteriores" [ref=e68] [cursor=pointer]: <
          - button "Ver mas reportes" [ref=e69] [cursor=pointer]: ">"
      - generic [ref=e77]:
        - paragraph [ref=e78]: Mas ojos, mas oportunidades
        - heading "Ayuda a reunir mascotas perdidas" [level=2] [ref=e79]
        - paragraph [ref=e80]: Revisa los reportes, comparte con tus vecinos y avisa si tienes informacion. Petly funciona mejor cuando la comunidad se mueve.
        - button "Reportar mascota encontrada" [ref=e81]
  - contentinfo [ref=e82]:
    - generic [ref=e83]:
      - generic [ref=e84]:
        - paragraph [ref=e85]: © 2026 Petly. All rights reserved.
        - link "Trademark Policy" [ref=e86] [cursor=pointer]:
          - /url: "#"
      - link "GitHub" [ref=e88] [cursor=pointer]:
        - /url: https://github.com/Carlitos-A
        - generic [ref=e89]: GitHub
        - img [ref=e90]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("login guarda el usuario solo en sessionStorage", async ({ context, page }) => {
  4  |   await context.route("**/petly/auth/login", async (route) => {
  5  |     await route.fulfill({
  6  |       status: 200,
  7  |       contentType: "application/json",
  8  |       headers: {
  9  |         "Access-Control-Allow-Origin": "*",
  10 |       },
  11 |       body: JSON.stringify({
  12 |         token: "fake.jwt.token",
  13 |         id: 1,
  14 |         nombre: "Usuario Test",
  15 |         correo: "test@petly.cl",
  16 |         run: "12345678",
  17 |         dv: "9",
  18 |       }),
  19 |     });
  20 |   });
  21 | 
  22 |   await page.goto("/login");
  23 | 
  24 |   await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  25 |   await page.getByPlaceholder(/contrase/i).fill("12345678");
  26 |   await page.getByRole("button", { name: /Iniciar/i }).click();
  27 | 
  28 |   await expect(page).toHaveURL("/");
  29 | 
  30 |   const sessionToken = await page.evaluate(() => sessionStorage.getItem("token"));
  31 |   const sessionUser = await page.evaluate(() => sessionStorage.getItem("usuario"));
  32 |   const localToken = await page.evaluate(() => localStorage.getItem("token"));
  33 |   const localUser = await page.evaluate(() => localStorage.getItem("usuario"));
  34 | 
  35 |   expect(sessionToken).toBe("fake.jwt.token");
  36 |   expect(sessionUser).toContain("Usuario Test");
  37 |   expect(localToken).toBeNull();
  38 |   expect(localUser).toBeNull();
  39 | });
  40 | 
  41 | test("al abrir el navegador de nuevo no mantiene el usuario guardado", async ({ browser }) => {
  42 |   const context = await browser.newContext();
  43 | 
  44 |   await context.route("**/petly/auth/login", async (route) => {
  45 |     await route.fulfill({
  46 |       status: 200,
  47 |       contentType: "application/json",
  48 |       body: JSON.stringify({
  49 |         token: "fake.jwt.token",
  50 |         id: 1,
  51 |         nombre: "Usuario Test",
  52 |         correo: "test@petly.cl",
  53 |       }),
  54 |     });
  55 |   });
  56 | 
  57 |   const page = await context.newPage();
  58 | 
  59 |   await page.goto("http://127.0.0.1:5173/login");
  60 | 
  61 |   await page.getByPlaceholder("tu@email.com").fill("test@petly.cl");
  62 |   await page.getByPlaceholder(/contrase/i).fill("12345678");
  63 |   await page.getByRole("button", { name: /Iniciar/i }).click();
  64 | 
  65 |   await expect(page).toHaveURL("http://127.0.0.1:5173/");
  66 | 
> 67 |   expect(await page.evaluate(() => sessionStorage.getItem("token"))).toBe("fake.jwt.token");
     |                                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  68 | 
  69 |   await context.close();
  70 | 
  71 |   const newContext = await browser.newContext();
  72 |   const newPage = await newContext.newPage();
  73 | 
  74 |   await newPage.goto("http://127.0.0.1:5173/");
  75 | 
  76 |   expect(await newPage.evaluate(() => sessionStorage.getItem("token"))).toBeNull();
  77 |   expect(await newPage.evaluate(() => sessionStorage.getItem("usuario"))).toBeNull();
  78 | 
  79 |   await newContext.close();
  80 | });
```
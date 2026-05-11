# Petly - Frontend

Interfaz web de la plataforma Petly para la localizacion y recuperacion de mascotas extraviadas.

---

## Tecnologias

- React 19
- Vite 8
- Tailwind CSS 4
- Mapbox GL JS
- React Router DOM 7

---

## Opcion 1: Ejecucion con Docker

La imagen del frontend ya esta incluida en el `docker-compose.yml` del backend. Al ejecutar:

```bash
docker compose up -d
```

El frontend queda disponible en: **http://localhost**

---

## Opcion 2: Ejecucion en desarrollo local

### Requisitos

- Node.js 18+
- npm

### Pasos

**1. Instalar dependencias:**
```bash
npm install
```

**2. Iniciar en modo desarrollo:**
```bash
npm run dev
```

El frontend queda disponible en: **http://localhost:5173**

> Para que funcione correctamente, el backend debe estar corriendo (con Docker o localmente).

---

## Scripts disponibles

| Comando | Descripcion |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de produccion |
| `npm run preview` | Previsualiza el build de produccion |
| `npm run lint` | Ejecuta el linter |

---

## Estructura del proyecto

```
src/
├── app/              # Configuracion global (Router, Providers)
├── pages/            # Paginas principales
├── features/         # Modulos por dominio
│   ├── auth/         # Login y registro
│   ├── incidents/    # Listado de reportes
│   ├── map/          # Mapa interactivo con Mapbox
│   ├── notificaciones/ # Alertas y notificaciones
│   ├── pets/         # Gestion de mascotas
│   ├── profile/      # Perfil de usuario
│   └── report/       # Creacion de reportes
├── shared/           # Componentes y utilidades reutilizables
└── main.jsx          # Entry point
```

---

## Flujo principal del usuario

1. **Registro / Login** — El usuario crea una cuenta o inicia sesion
2. **Mapa** — Visualiza reportes de mascotas perdidas y encontradas geolocalizados
3. **Crear reporte** — Publica un aviso de mascota perdida o encontrada con foto y ubicacion
4. **Mis mascotas** — Gestiona el registro de sus mascotas
5. **Notificaciones** — Recibe alertas cuando el sistema detecta una posible coincidencia con su mascota

---

## Conexion con el backend

En desarrollo local el frontend apunta directamente a cada microservicio:

| Servicio | URL |
|---|---|
| usuarios-service | http://localhost:8084 |
| mascotas-service | http://localhost:8083 |
| reportes-service | http://localhost:8081 |
| geolocalizacion-service | http://localhost:8082 |
| notificaciones-service | http://localhost:8086 |

---

## Patrones de diseno aplicados

- **Facade** — Capa de servicios encapsula las llamadas HTTP (loginService, reportService, etc.)
- **Observer** — AuthContext notifica cambios de sesion a todos los componentes
- **Adapter** — reportsToGeoJson convierte datos del backend al formato GeoJSON de Mapbox
- **Builder** — buildQuery construye URLs con parametros opcionales de forma progresiva
- **Component Pattern** — UI dividida en componentes reutilizables e independientes

---

## Equipo

- Carlos Munoz
- Carlos Camero
- Bastian Brisso

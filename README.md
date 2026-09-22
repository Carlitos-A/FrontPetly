# Petly — Frontend

Petly es una plataforma colaborativa que centraliza la búsqueda de mascotas
extraviadas en un solo lugar. Olvida los carteles en postes y los grupos de
WhatsApp desorganizados: aquí los reportes están geolocalizados en un mapa
interactivo, el sistema cruza automáticamente mascotas perdidas con
encontradas usando Machine Learning, y notifica cuando hay una posible
coincidencia.

## ¿Cómo funciona?

1. Un dueño publica que perdió a su perro en Maipú el martes.
2. Un ciudadano reporta que encontró un perro en Maipú ese mismo día.
3. El motor de ML compara especie, raza, color, ubicación y descripción.
4. Si hay coincidencia, el dueño recibe una notificación al instante.

Todo esto sin que nadie tenga que buscar manualmente. La plataforma trabaja
sola.

## ¿Por qué Petly y no las redes sociales?

Porque en redes sociales la información se pierde entre miles de
publicaciones, nadie cruza los datos y dependes de que alguien haya visto tu
post en el momento exacto. Petly mantiene todos los reportes organizados, los
cruza automáticamente y los muestra en un mapa para que cualquier persona en
la zona pueda colaborar.

## 🚀 Tecnologías

- **React 19** — UI por componentes
- **Vite** — bundler y dev server
- **Tailwind CSS 4** — estilos utility-first
- **Mapbox GL** — mapa interactivo con geolocalización de reportes
- **ESLint** — linting con reglas de React Hooks

La aplicación consume los microservicios del backend a través de un
**API Gateway**, lo que permite una comunicación segura, escalable y
desacoplada entre los módulos del sistema.

## 📂 Arquitectura

Arquitectura modular basada en **features**: cada módulo del dominio agrupa
sus componentes, hooks y servicios, de modo que el dominio es visible desde
la estructura de carpetas.

```text
src/
├── app/              # Configuración global (App, Router, Providers)
├── pages/            # Páginas principales
├── features/         # Módulos del dominio
│   ├── map/          # Mapa interactivo (componentes, hooks, services)
│   ├── incidents/    # Gestión de incidentes
│   └── report/       # Creación de reportes
├── shared/           # Componentes, hooks y utilidades reutilizables
└── main.jsx          # Entry point
```

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # build de producción
npm run lint      # eslint
```

> Requiere un token de Mapbox configurado para el mapa.

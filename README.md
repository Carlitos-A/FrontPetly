# Petly - Frontend

Frontend de una aplicación tipo Mapa para reporte y visualización de perdidad de mascotas en tiempo real.

---

## Descripción

Petly es una aplicación web que permite a los usuarios:

- Ver perdidas de mascotas en un mapa en tiempo real
- Reportar eventos como encuentro o perdida de mascotas
- Visualizar información geolocalizada
- Interactuar con un mapa estilo navegación

Inspirado en herramientas como Waze y sistemas de reportes ciudadanos.

---

## Arquitectura Básica del proyecto

El proyecto sigue una arquitectura modular basada en **features**, separando responsabilidades:

Se incluyó un ejemplo de uso en el primer commit para determinar y enseñar la manera en la que esta tipologia de arquitectura será usada

```bash
src/
├── app/              # Configuración global (App, Router, Providers)
├── pages/            # Páginas principales
├── features/         # Módulos del dominio
│   ├── map/          # Lógica y UI del mapa
│   ├── incidents/    # Gestión de incidentes
│   ├── report/       # Creación de reportes
├── shared/           # Componentes reutilizables
└── main.jsx          # Entry point

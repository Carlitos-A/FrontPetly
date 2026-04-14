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

Para la creacion de carpetas:

>> mkdir -p src/features/map/components
>> mkdir -p src/features/map/hooks
>> mkdir -p src/features/map/services

>> mkdir -p src/features/report/components
>> mkdir -p src/features/report/hooks
>> mkdir -p src/features/report/services
>> mkdir -p src/features/report/model

>> mkdir -p src/features/auth/components
>> mkdir -p src/features/auth/hooks
>> mkdir -p src/features/auth/services
>> 
>> mkdir -p src/shared/components
>> mkdir -p src/shared/hooks
>> mkdir -p src/shared/utils
>> mkdir -p src/shared/constants
>> 
>> mkdir -p src/pages
>> mkdir -p src/assets




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



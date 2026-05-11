# Petly - Frontend

Petly es una plataforma colaborativa que centraliza la búsqueda de mascotas extraviadas en un solo lugar. Olvida los carteles en postes y los grupos de WhatsApp desorganizados: aquí los reportes están geolocalizados en un mapa interactivo, el sistema cruza automáticamente mascotas perdidas con mascotas encontradas usando Machine Learning, y te notifica cuando hay una posible coincidencia.

¿Cómo funciona?

Un dueño publica que perdió a su perro en Maipú el martes.
Un ciudadano reporta que encontró un perro en Maipú ese mismo día.
El motor de ML compara especie, raza, color, ubicación y descripción.
Si hay coincidencia, el dueño recibe una notificación al instante.

Todo esto sin que nadie tenga que buscar manualmente. La plataforma trabaja sola.

¿Por qué Petly y no las redes sociales?

Porque en redes sociales la información se pierde entre miles de publicaciones, nadie cruza los datos y dependes de que alguien haya visto tu post en el momento exacto. Petly mantiene todos los reportes organizados, los cruza automáticamente y los muestra en un mapa para que cualquier persona en la zona pueda colaborar.

Cada reporte suma. Cada avistamiento importa. Juntos aumentamos las probabilidades de reencuentro.
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



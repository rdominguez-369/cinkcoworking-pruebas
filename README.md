# Pruebas técnicas - Cink Coworking

Repositorio que contiene dos ejercicios de programación desarrollados como parte de un proceso de selección para prácticas.

Los ejercicios consisten en consultar datos meteorológicos mediante una API, realizar cálculos de consumo energético, exportar los resultados a archivos CSV y generar dashboards web utilizando Apache ECharts.

## Ejercicios

### Prueba 4 - Consumo de calefacción

Este ejercicio consulta las temperaturas medias diarias de Madrid para los próximos 7 días mediante la API Open-Meteo.

A partir de las temperaturas obtenidas, calcula el consumo estimado de calefacción utilizando las siguientes condiciones:

- Si la temperatura media es menor o igual a 15 °C, el consumo se calcula mediante:

  `Consumo (kWh) = (15 - Temperatura media) × 10`

- Si la temperatura media es superior a 15 °C, el consumo es 0 kWh.

Los resultados se guardan en `calefaccion.csv`.

Posteriormente, un segundo programa lee este archivo CSV y genera automáticamente `dashboard.html`, que contiene dos gráficas:

- Evolución de la temperatura media diaria.
- Consumo estimado diario de calefacción.

### Prueba 5 - Uso de ventilación

Este ejercicio consulta las velocidades medias diarias del viento en Madrid para los próximos 7 días mediante Open-Meteo.

El uso estimado de ventilación se calcula mediante las siguientes condiciones:

- Si la velocidad del viento es menor o igual a 10 km/h:

  `Uso estimado (kWh) = (10 - Velocidad del viento) × 5`

- Si la velocidad del viento es superior a 10 km/h, el uso estimado es 0 kWh.

Los resultados se guardan en `ventilacion.csv`.

Posteriormente, un segundo programa genera automáticamente `dashboard.html` con dos gráficas:

- Evolución de la velocidad media diaria del viento.
- Uso estimado diario de ventilación.

## Tecnologías utilizadas

- **JavaScript:** implementación de la lógica de ambos ejercicios.
- **Node.js:** ejecución de los programas JavaScript.
- **Open-Meteo:** API meteorológica para obtener temperaturas y velocidades del viento.
- **CSV:** almacenamiento de los resultados calculados.
- **HTML y CSS:** estructura y presentación de los dashboards.
- **Apache ECharts:** visualización de los datos mediante gráficas.
- **Git y GitHub:** control de versiones y publicación de los avances.

## Estructura del proyecto

```text
cinkcoworking-pruebas/
├── prueba4-calefaccion/
│   ├── app.js
│   ├── calefaccion.csv
│   ├── generar-dashboard.js
│   └── dashboard.html
│
├── prueba5-ventilacion/
│   ├── app.js
│   ├── ventilacion.csv
│   ├── generar-dashboard.js
│   └── dashboard.html
│
├── .gitignore
└── README.md
```

### Descripción de los archivos

- `app.js`: consulta la API, procesa los datos meteorológicos, realiza los cálculos y genera el archivo CSV.
- `generar-dashboard.js`: lee el archivo CSV y genera automáticamente el dashboard HTML.
- `calefaccion.csv` / `ventilacion.csv`: contienen los datos diarios y los resultados calculados.
- `dashboard.html`: muestra las dos gráficas correspondientes a cada ejercicio.

## Requisitos previos

Para ejecutar los ejercicios es necesario disponer de:

- Node.js versión 18 o superior.
- Conexión a Internet para consultar la API Open-Meteo.
- Un navegador web para visualizar los dashboards.

Los dashboards utilizan Apache ECharts mediante un CDN, por lo que también necesitan conexión a Internet para cargar esta biblioteca.

No es necesario instalar dependencias adicionales mediante npm.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/rdominguez-369/cinkcoworking-pruebas.git
```

Acceder a la carpeta del proyecto:

```bash
cd cinkcoworking-pruebas
```

### 2. Ejecutar la Prueba 4 - Calefacción

Consultar los datos meteorológicos y generar el CSV:

```bash
node prueba4-calefaccion/app.js
```

Generar el dashboard:

```bash
node prueba4-calefaccion/generar-dashboard.js
```

Abrir el archivo:

`prueba4-calefaccion/dashboard.html`

en un navegador web.

### 3. Ejecutar la Prueba 5 - Ventilación

Consultar los datos meteorológicos y generar el CSV:

```bash
node prueba5-ventilacion/app.js
```

Generar el dashboard:

```bash
node prueba5-ventilacion/generar-dashboard.js
```

Abrir el archivo:

`prueba5-ventilacion/dashboard.html`

en un navegador web.

## Actualización automática de los dashboards

Ambos ejercicios permiten regenerar sus dashboards a partir de los archivos CSV.

El funcionamiento es el siguiente:

1. `app.js` consulta Open-Meteo y genera el CSV con los datos meteorológicos y los cálculos correspondientes.
2. `generar-dashboard.js` lee el CSV y construye el archivo HTML.
3. El navegador muestra las gráficas generadas mediante Apache ECharts.

Si se modifica el contenido del CSV, basta con ejecutar nuevamente `generar-dashboard.js` y actualizar la página del navegador para visualizar los nuevos datos.

No es necesario modificar manualmente el código HTML.

**Nota:** si se ejecuta nuevamente `app.js`, el CSV se sobrescribe con los datos actualizados de la API y los cálculos correspondientes.

## Consideraciones

- Los consumos y usos energéticos son estimaciones basadas en las fórmulas proporcionadas en los enunciados.
- Los datos meteorológicos pueden variar entre ejecuciones porque proceden de una API de previsiones.
- Cada ejercicio utiliza dos programas independientes: uno para obtener y procesar los datos y otro para generar la visualización.
- Los archivos CSV y HTML se guardan en la carpeta correspondiente a cada ejercicio.

## Estado del proyecto

Desarrollo funcional completado.

Ambos ejercicios permiten consultar datos meteorológicos, calcular los valores solicitados, generar archivos CSV y crear dashboards web automáticamente.

El historial de commits del repositorio documenta las distintas etapas del desarrollo.
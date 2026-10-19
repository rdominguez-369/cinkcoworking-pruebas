const fs = require("node:fs");

// Leemos el archivo CSV
const contenidoCSV = fs.readFileSync("ventilacion.csv", "utf8");

// Dividimos el contenido en líneas
const lineas = contenidoCSV.trim().split(/\r?\n/);

// Eliminamos la cabecera
const filas = lineas.slice(1);

// Arrays para almacenar los datos
const dias = [];
const velocidades = [];
const usos = [];

// Recorremos las filas del CSV
for (const fila of filas) {
    const [dia, velocidad, uso] = fila.split(",");

    dias.push(dia);
    velocidades.push(Number(velocidad));
    usos.push(Number(uso));
}

// Comprobamos los datos obtenidos
console.log("Días:", dias);
console.log("Velocidades:", velocidades);
console.log("Usos:", usos);

// Creamos el contenido HTML del dashboard
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de ventilación</title>

    <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f6f8;
        }

        h1, h2 {
            text-align: center;
        }

        .grafica {
            width: 100%;
            height: 400px;
            background-color: white;
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <h1>Dashboard de uso de ventilación</h1>

    <div id="grafica-viento" class="grafica"></div>

    <h2>Uso estimado de ventilación</h2>

    <div id="grafica-usos" class="grafica"></div>

    <script>
        // Datos obtenidos del CSV
        const dias = ${JSON.stringify(dias)};
        const velocidades = ${JSON.stringify(velocidades)};
        const usos = ${JSON.stringify(usos)};

        // Primera gráfica: velocidad del viento
        const graficaViento = echarts.init(
            document.getElementById("grafica-viento")
        );

        const opcionesViento = {
            title: {
                text: "Evolución de la velocidad media del viento"
            },

            tooltip: {
                trigger: "axis"
            },

            xAxis: {
                type: "category",
                name: "Días",
                data: dias
            },

            yAxis: {
                type: "value",
                name: "Viento (km/h)"
            },

            series: [{
                name: "Velocidad media",
                type: "line",
                data: velocidades
            }]
        };

        graficaViento.setOption(opcionesViento);

        // Segunda gráfica: uso de ventilación
        const graficaUsos = echarts.init(
            document.getElementById("grafica-usos")
        );

        const opcionesUsos = {
            title: {
                text: "Uso diario de ventilación"
            },

            tooltip: {
                trigger: "axis"
            },

            xAxis: {
                type: "category",
                name: "Días",
                data: dias
            },

            yAxis: {
                type: "value",
                name: "Uso (kWh)"
            },

            series: [{
                name: "Uso estimado",
                type: "bar",
                data: usos
            }]
        };

        graficaUsos.setOption(opcionesUsos);
    </script>
</body>
</html>
`;

// Guardamos el HTML generado
fs.writeFileSync("dashboard.html", html, "utf8");

console.log("Archivo dashboard.html generado correctamente.");
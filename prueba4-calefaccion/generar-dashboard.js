
const fs = require("node:fs");
const path = require("node:path");

// Rutas absolutas de los archivos
const rutaCSV = path.join(__dirname, "calefaccion.csv");
const rutaHTML = path.join(__dirname, "dashboard.html");

// Leemos el archivo CSV
const contenidoCSV = fs.readFileSync(rutaCSV, "utf8");

// Dividimos el contenido en líneas
const lineas = contenidoCSV.trim().split(/\r?\n/);

// Separamos la cabecera de los datos
const filas = lineas.slice(1);

// Arrays para almacenar la información
const dias = [];
const temperaturas = [];
const consumos = [];

// Recorremos cada fila del CSV
for (const fila of filas) {
    const [dia, temperatura, consumo] = fila.split(",");

    dias.push(dia);
    temperaturas.push(Number(temperatura));
    consumos.push(Number(consumo));
}

// Mostramos los resultados
console.log("Días:", dias);
console.log("Temperaturas:", temperaturas);
console.log("Consumos:", consumos);

// Creamos el contenido HTML del dashboard
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de calefacción</title>

    <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f6f8;
        }

        h1 {
            text-align: center;
        }

        #grafica-temperaturas {
            width: 100%;
            height: 400px;
            background-color: white;
        }

        #grafica-consumos {
            width: 100%;
            height: 400px;
            background-color: white;
            margin-top: 20px;
        }

        h2 {
            text-align: center;
            margin-top: 40px;
        }

    </style>
</head>

<body>
    <h1>Dashboard de consumo de calefacción</h1>

    <div id="grafica-temperaturas"></div>

    <h2>Consumo estimado de calefacción</h2>

    <div id="grafica-consumos"></div>

    <script>
        const dias = ${JSON.stringify(dias)};
        const temperaturas = ${JSON.stringify(temperaturas)};
        const consumos = ${JSON.stringify(consumos)};

        const grafica = echarts.init(
            document.getElementById("grafica-temperaturas")
        );

        const opciones = {
            title: {
                text: "Evolución de la temperatura media diaria"
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
                name: "Temperatura (°C)"
            },

            series: [{
                name: "Temperatura media",
                type: "line",
                data: temperaturas
            }]
        };

        grafica.setOption(opciones);

        // Inicializamos la gráfica de consumo
        const graficaConsumos = echarts.init(
            document.getElementById("grafica-consumos")
        );

        // Configuración de la gráfica
        const opcionesConsumos = {
            title: {
                text: "Consumo diario de calefacción"
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
                name: "Consumo (kWh)"
            },

            series: [{
                name: "Consumo estimado",
                type: "bar",
                data: consumos
            }]
        };

        // Mostramos la gráfica
        graficaConsumos.setOption(opcionesConsumos);
        
    </script>
</body>
</html>
`;

// Guardamos el HTML generado
fs.writeFileSync(rutaHTML, html, "utf8");

console.log("Archivo dashboard.html generado correctamente.");
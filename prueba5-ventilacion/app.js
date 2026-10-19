
const fs = require("node:fs");
const path = require("node:path");

// Ruta absoluta del archivo CSV
const rutaCSV = path.join(__dirname, "ventilacion.csv");

// URL de la API meteorológica Open-Meteo
const url = "https://api.open-meteo.com/v1/forecast"
    + "?latitude=40.4168"
    + "&longitude=-3.7038"
    + "&daily=wind_speed_10m_mean"
    + "&wind_speed_unit=kmh"
    + "&timezone=Europe%2FMadrid"
    + "&forecast_days=7";

// Calcula el uso estimado de ventilación
function calcularVentilacion(velocidadViento) {
    if (velocidadViento <= 10) {
        const uso = (10 - velocidadViento) * 5;

        return Number(uso.toFixed(2));
    }

    return 0;
}

// Función para obtener las velocidades del viento
async function obtenerVientos() {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // Extraemos las fechas y velocidades del viento
        const dias = datos.daily.time;
        const velocidades = datos.daily.wind_speed_10m_mean;

        // Preparamos la cabecera del CSV
        let contenidoCSV = "Dia,Velocidad viento (km/h),Uso ventilacion (kWh)\n";

        console.log("Uso estimado de ventilación:");
        console.log("--------------------------------");

        // Recorremos los siete días
        for (let i = 0; i < dias.length; i++) {
            const dia = dias[i];
            const velocidad = velocidades[i];

            const uso = calcularVentilacion(velocidad);

            console.log(
                `Día: ${dia} | Viento: ${velocidad} km/h | Uso: ${uso} kWh`
            );

            // Añadimos una fila al CSV
            contenidoCSV += `${dia},${velocidad},${uso}\n`;
        }

        // Guardamos el archivo CSV
        fs.writeFileSync(rutaCSV, contenidoCSV, "utf8");

        console.log("\nArchivo ventilacion.csv generado correctamente.");

    } catch (error) {
        console.error("Error al obtener velocidades del viento:", error);
    }
}

// Ejecutamos la función
obtenerVientos();
// URL de la API meteorológica Open-Meteo
const url = "https://api.open-meteo.com/v1/forecast"
    + "?latitude=40.4168"
    + "&longitude=-3.7038"
    + "&daily=wind_speed_10m_mean"
    + "&wind_speed_unit=kmh"
    + "&timezone=Europe%2FMadrid"
    + "&forecast_days=7";

// Función para obtener las velocidades del viento
async function obtenerVientos() {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        console.log("Datos de viento recibidos de Open-Meteo:");
        console.log(datos.daily);

    } catch (error) {
        console.error("Error al obtener velocidades del viento:", error);
    }
}

// Ejecutamos la función
obtenerVientos();
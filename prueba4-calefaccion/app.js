// URL de la API meteorológica Open-Meteo
const url = "https://api.open-meteo.com/v1/forecast"
+ "?latitude=40.4168"
+ "&longitude=-3.739399"
+ "&daily=temperature_2m_mean"
+ "&timezone=Europe%2FMadrid"
+ "&forecast_days=7";

// Calcula el consumo estimado según la temperatura media
function calcularConsumo(temperatura) {
    if (temperatura <= 15) {
        const consumo = (15 - temperatura) * 10;

        return Number(consumo.toFixed(2));
    }

    return 0;
}

// Función para obtener las temperaturas
async function obtenerTemperaturas() {
    try{
        //Realizamos la peticion HTTP
        const respuesta = await fetch(url);

        // Comprobamos si la respuesta es correcta
        if (!respuesta.ok){
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        //Convertimos la respuesta JSON en un objeto
        const datos = await respuesta.json();

        // Extraemos las fichas y temperaturas
        const dias = datos.daily.time;
        const temperaturas = datos.daily.temperature_2m_mean;

        console.log("Consumo estimado de calefacción:");
        console.log("--------------------------------");

        // Recorremos los siete días
        for (let i = 0; i < dias.length; i++){
            const dia = dias[i];
            const temperatura = temperaturas[i];

            const consumo = calcularConsumo(temperatura);

            console.log(
                `Día: ${dia} | Temperatura: ${temperatura} °C | Consumo: ${consumo} kWh`
            );
        }

    } catch (error) {
        console.error("Error al obtener temperaturas:", error);
    }    
}

// Ejecutamos la función
obtenerTemperaturas();
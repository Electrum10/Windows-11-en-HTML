const Horas = document.getElementById("Hora");
const Fechas = document.getElementById("Fecha");
const IconoTiempo = document.getElementById("IconoTiempo")
const Temperatura = document.getElementById("Temperatura")
const Descripción = document.getElementById("Descripción")

const horaActual = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
const fechaActual = new Date().toLocaleDateString();

Horas.textContent = horaActual;
Fechas.textContent = fechaActual;

function tiempo() {
    navigator.geolocation.getCurrentPosition((posición) => {
        const latitud = posición.coords.latitude;
        const longitud = posición.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=0f33901d085922ce186457a1a8080b62&units=metric&lang=es`)
        .then(respuesta => respuesta.json())
        .then((data) => {
            Temperatura.textContent = Math.round(data.main.feels_like) + " Cº";
            switch (data.weather[0].main) {
                case "Thunderstorm":
                  IconoTiempo.src = "src/IconosTiempo/thunder.svg";
                  Descripción.textContent = ("Tormenta");
                  break;
                case "Drizzle":
                  IconoTiempo.src = "src/IconosTiempo/rainy-2.svg";
                  Descripción.textContent = ("Chubascos");
                  break;
                case "Rain":
                  IconoTiempo.src = "src/IconosTiempo/rainy-7.svg";
                  Descripción.textContent = ("Lluvia");
                  break;
                case "Snow":
                  IconoTiempo.src = "src/IconosTiempo/snowy-6.svg";
                  Descripción.textContent = ("Nieve");
                  break;
                case "Clear":
                  IconoTiempo.src = "src/IconosTiempo/day.svg";
                  Descripción.textContent = ("Soleado");
                  break;
                case "Atmosphere":
                  IconoTiempo.src = "src/IconosTiempo/weather.svg";
                  Descripción.textContent = ("De todo");
                  break;
                case "Clouds":
                  IconoTiempo.src = "src/IconosTiempo/cloudy-day-1.svg";
                  Descripción.textContent = ("Nubes");
                  break;
                default:
                  IconoTiempo.src = "src/IconosTiempo/cloudy-day-1.svg";
                  Descripción.textContent = ("error al medir");
              }
        })
    })
}

window.addEventListener("DOMContentLoaded", tiempo())
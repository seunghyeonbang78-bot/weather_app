async function getWeather() {

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        const response = await fetch(url);

        const data = await response.json();

        document.getElementById("weather").innerHTML =
            `Temperature: ${data.current_weather.temperature}°C`;
    });
}

let map;

async function getWeather() {

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            try {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // 도시 이름 찾기
                const locationResponse = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
                );

                const locationData = await locationResponse.json();

                const city =
                    locationData.address.city ||
                    locationData.address.town ||
                    locationData.address.village ||
                    "Unknown Location";

                // 날씨 가져오기
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=precipitation_probability`
                );

                const weatherData = await weatherResponse.json();

                const temperature =
                    weatherData.current.temperature_2m;

                const humidity =
                    weatherData.current.relative_humidity_2m;

                const wind =
                    weatherData.current.wind_speed_10m;

                const rain =
                    weatherData.hourly.precipitation_probability[0];

                document.getElementById("weatherCard").innerHTML = `
                    <h2>📍 ${city}</h2>

                    <p>🌡 Temperature: ${temperature}°C</p>

                    <p>💧 Humidity: ${humidity}%</p>

                    <p>🌬 Wind Speed: ${wind} km/h</p>

                    <p>🌧 Rain Chance: ${rain}%</p>
                `;

                // 지도
                if (map) {
                    map.remove();
                }

                map = L.map("map").setView([lat, lon], 13);

                L.tileLayer(
                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution:
                            "&copy; OpenStreetMap contributors"
                    }
                ).addTo(map);

                L.marker([lat, lon])
                    .addTo(map)
                    .bindPopup("You are here")
                    .openPopup();

            } catch (error) {

                console.error(error);

                document.getElementById("weatherCard").innerHTML =
                    "Error loading weather data.";

            }

        },

        (error) => {

            document.getElementById("weatherCard").innerHTML =
                "Location access denied.";

            console.error(error);

        }

    );
}

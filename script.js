const locationResponse =
await fetch(
`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
);

const locationData =
await locationResponse.json();

const city =
locationData.address.city ||
locationData.address.town ||
locationData.address.village;


const weatherResponse =
await fetch(
`https://api.open-meteo.com/v1/forecast?
latitude=${lat}
&longitude=${lon}
&current=temperature_2m,
relative_humidity_2m,
wind_speed_10m
&hourly=precipitation_probability`
);


const map =
L.map('map')
.setView([lat, lon], 13);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

L.marker([lat, lon])
.addTo(map);

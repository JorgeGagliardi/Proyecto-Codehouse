let map = L.map('map').setView([-34.56932175392403, -58.41737642003411],14)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.56932175392403, -58.41737642003411]).addTo(map).bindPopup("El Rosedal").openPopup()

const circulo = L.circle([-34.56932175392403, -58.41737642003411],{
    radius: 100,
    color: "green"
}).addTo(map)

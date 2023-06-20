let map = L.map('map').setView([-37.15999,-56.90526],12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-37.15999,-56.90526]).addTo(map).bindPopup("Jardín de colibries").openPopup()

const circulo = L.circle([-37.15999,-56.90526],{
    radius: 100,
    color: "green"
}).addTo(map)

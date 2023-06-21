let map = L.map('map').setView([-32.88647332627088, -68.8627141268496],12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.88647332627088, -68.8627141268496]).addTo(map).bindPopup("Parque Gral. San Martín").openPopup()

const circulo = L.circle([-37.15999,-56.90526],{
    radius: 100,
    color: "green"
}).addTo(map)

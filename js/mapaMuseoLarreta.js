let map = L.map('map').setView([-34.56104455197416, -58.45567201929108],12)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.56104455197416, -58.45567201929108]).addTo(map).bindPopup("Museo de Arte Enrique Larreta").openPopup()

const circulo = L.circle([-34.56104455197416, -58.45567201929108],{
    radius: 100,
    color: "green"
}).addTo(map)

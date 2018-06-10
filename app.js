var map = L.map('map').setView([37.270323, -120.612423], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/michelletang/cji9ayg5n2jvo2rlmca26xqx5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGV0YW5nIiwiYSI6ImNqaTlhbzhrMDBybm8za21sdWlnd2dyOHMifQ.MUXzAlB-Zw6WRJFoFJvqKg', {
    attribution: 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox://styles/michelletang/cji9ayg5n2jvo2rlmca26xqx5',
    accessToken: 'pk.eyJ1IjoibWljaGVsbGV0YW5nIiwiYSI6ImNqaTlhbzhrMDBybm8za21sdWlnd2dyOHMifQ.MUXzAlB-Zw6WRJFoFJvqKg'
}).addTo(map);


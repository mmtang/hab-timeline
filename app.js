var map = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/michelletang/cji9ayg5n2jvo2rlmca26xqx5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGV0YW5nIiwiYSI6ImNqaTlhbzhrMDBybm8za21sdWlnd2dyOHMifQ.MUXzAlB-Zw6WRJFoFJvqKg', {
    attribution: 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox://styles/michelletang/cji9ayg5n2jvo2rlmca26xqx5'
}).addTo(map);

var years = ['2016', '2017', '2018'];

map.on('load', function() {
    d3.csv('data-clean.csv', function(d) {
        // create a year property value used for filtering
        var parseDate = d3.timeParse('%-m/%-d/%y'),
            date = parseDate(d['Bloom Last Verified']),
            year = date.getFullYear();
        // process data 
        return {
            county : d['County Name'],
            date : date,
            latitude : +d['Latitude'],
            longitude : +d['Longitude'],
            region : d['Regional Water Board'],
            wbname : d['Waterbody Name'],
            wbtype : d['Water Body Type'],
            year: year
        };
    }, function(data) {
        console.log(data);
    });
}).setView([37.270323, -120.612423], 6);



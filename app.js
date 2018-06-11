/*

California State Water Resources Control Board (SWRCB)
Office of Information Management and Analysis (OIMA) 

Author: Michelle Tang
https://github.com/mmtang

*/


var map = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/michelletang/cji9ayg5n2jvo2rlmca26xqx5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGVsbGV0YW5nIiwiYSI6ImNqaTlhbzhrMDBybm8za21sdWlnd2dyOHMifQ.MUXzAlB-Zw6WRJFoFJvqKg', {
    attribution: 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox://styles/michelletang/cji9ayg5n2jvo2rlmca26xqx5'
}).addTo(map);

var years = ['2016', '2017', '2018'];

function processData(data) {
    features = [];
    // check for valid data
    for (var i = 0; i < data.length; i++) {
        var point = {};
        // check for missing coordinates
        if (!(data[i].longitude) || !(data[i].latitude)) { 
            continue; 
        } else {
            // convert to geoJSON
            point.type = 'Feature';
            point.geometry = {'type': 'Point', 'coordinates': [data[i].longitude, data[i].latitude]};
            point.properties = { 
                'county': data[i].count, 
                'date': data[i].date,
                'region': data[i].region,
                'wbname': data[i].wbname,
                'wbtype': data[i].wbtype,
                'year': data[i].year,
                'printyear' : data[i].printyear
            };
            features.push(point);
        }
    }
    return features;
}

map.on('load', function() {

    // define icon class
    var icon = {
        radius: 5,
        fillColor: '#ea911c',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    // initialize incident layer
    var incidents = L.geoJson([], {
        onEachFeature: function(feature, layer) {
            // add site name tooltip
            layer.bindPopup(feature.properties.wbname + '<br>' + feature.properties.printyear, {closeButton: false, offset: L.point(0, 0)});
            layer.on('mouseover', function() { layer.openPopup(); });
            layer.on('mouseout', function() { layer.closePopup(); });
        },
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, icon);
        }
    }).addTo(map);

    // load data from local
    d3.csv('data-clean.csv', function(d) {
        // create a year property value used for filtering
        var parseDate = d3.timeParse('%-m/%-d/%y'),
            date = parseDate(d['Bloom Last Verified']),
            year = date.getFullYear();
        return {
            county : d['County Name'],
            date : date,
            latitude : +d['Latitude'],
            longitude : +d['Longitude'],
            region : d['Regional Water Board'],
            wbname : d['Waterbody Name'],
            wbtype : d['Water Body Type'],
            year: year,
            printyear : d['Bloom Last Verified']
        };
    }, function(data) {
        var incidentData = processData(data);
        console.log(incidentData);
        incidents.addData(incidentData);
    });

}).setView([37.270323, -120.612423], 6);





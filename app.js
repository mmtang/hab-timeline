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

    var icon = {
        radius: 5,
        fillColor: '#ef4136',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

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

        function clearFeatures() {
            map.eachLayer(function(layer) {
                if( layer instanceof L.GeoJSON )
                   map.removeLayer(layer);
            });
        }

        function filterBy(year) {
            if (year === '2016') {
                clearFeatures();
                incidents2016.addTo(map);
            } else if (year === '2017') {
                clearFeatures();
                incidents2017.addTo(map);
            } else if (year === '2018') {
                clearFeatures();
                incidents2018.addTo(map);
            }
            // change filter label
            document.getElementById('year').textContent = year;
        }

        var incidentData = processData(data);

        // initialize layers
        var incidents2016 = L.geoJson(incidentData, {
            filter: function(feature, layer) {
                return feature.properties.year == '2016';
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.wbname + '<br>' + feature.properties.printyear, {closeButton: false, offset: L.point(0, 0)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, icon);
            }
        });

        var incidents2017 = L.geoJson(incidentData, {
            filter: function(feature, layer) {
                return feature.properties.year == '2017';
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.wbname + '<br>' + feature.properties.printyear, {closeButton: false, offset: L.point(0, 0)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, icon);
            }
        });

        var incidents2018 = L.geoJson(incidentData, {
            filter: function(feature, layer) {
                return feature.properties.year == '2018';
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.wbname + '<br>' + feature.properties.printyear, {closeButton: false, offset: L.point(0, 0)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, icon);
            }
        });

        // set filter default
        document.getElementById('slider').value = '2016';
        filterBy('2016');

        document.getElementById('slider').addEventListener('input', function(e) {
            var year = e.target.value;
            filterBy(year);
        });

    });

}).setView([37.270323, -120.612423], 6);





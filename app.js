/*

California State Water Resources Control Board (SWRCB)
Office of Information Management and Analysis (OIMA) 

Author: Michelle Tang
https://github.com/mmtang

*/


const initializeMap = () => {
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
}

const getData = config => {
    $.ajax({
        type: 'GET',
        url: config.url,
        dataType: 'jsonp',
        success: function(res) {
            // config.success(res, config);
            config.success(res.result.records);
        },
        error: function(xhr, textStatus, error) {
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}


const processData = data => {
    features = [];
    console.log(data);
}

const map = L.map('map');

map.on('load', () => {
    let years = ['2016', '2017', '2018'];
    let icon = {
        radius: 5,
        fillColor: '#ef562d',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    const config = {
        url: 'https://data.ca.gov/api/action/datastore/search.jsonp?resource_id=9332c877-98cf-4e34-95e9-20ca0f7741b4&limit=500',
        success: processData
    };

    initializeMap();
    getData(config);

    /*
    // load data from local
    d3.csv('data-clean.csv', d => {
        // create a year property value used for filtering
        let parseDate = d3.timeParse('%-m/%-d/%y'),
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
    }, data => {

        class YearLayer {
            constructor(year, data) {
                this.layer = L.geoJson(data, {
                    filter: (feature, layer) => feature.properties.year == year,
                    onEachFeature: (feature, layer) => {
                        layer.bindPopup(feature.properties.wbname + '<br>' + feature.properties.printyear, {closeButton: false, offset: L.point(0, 0)});
                        layer.on('mouseover', () => { layer.openPopup(); });
                        layer.on('mouseout', () => { layer.closePopup(); });
                    },
                    pointToLayer: (feature, latlng) => L.circleMarker(latlng, icon)
                });
            }
            addLayer() {
                this.layer.addTo(map);
            }
        }

        const clearFeatures = () => {
            map.eachLayer(layer => {
                if( layer instanceof L.GeoJSON )
                   map.removeLayer(layer);
            });
        }

        const filterBy = year => {
            clearFeatures();
            mapLayers[year].addLayer();
            // change filter label
            document.getElementById('year').textContent = year;
        }

        const incidentData = processData(data);

        // initialize layers
        const mapLayers = {};
        for (let i = 0; i < years.length; i++) {
            mapLayers[years[i]] = new YearLayer(years[i], incidentData);
        }

        // set filter default
        document.getElementById('slider').value = '2016';
        filterBy('2016');

        document.getElementById('slider').addEventListener('input', e => {
            let year = e.target.value;
            filterBy(year);
        });

    });
    */

}).setView([37.270323, -120.612423], 6);





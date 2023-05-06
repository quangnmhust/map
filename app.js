const currentTemp = document.querySelector('.temperature')
const currentHumid = document.querySelector('.humidity')
const AQIindex = document.querySelector('.aqi-index')

const API_key = '20ec6b44f4246937e3befcf4bfe33e08'
const cityname1 = 'Hanoi'
const cityname2 = 'HaiPhong'

var map = L.map(document.getElementById('map')).setView([20.8016, 106.5049], 9);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

function getColor(value) {
    if (value >= 90) {
        return '#bd0026';
    } else if (value >= 70) {
        return '#f03b20';
    } else if (value >= 50) {
        return '#fd8d3c';
    } else if (value >= 30) {
        return '#feb24c';
    } else if (value >= 10) {
        return '#fed976';
    } else {
        return '#ffffb2';
    }
}


async function fetchData() {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname2}&appid=${API_key}&units=metric&lang=vi`)
        .then(async res => {
            data1 = await res.json();
            console.log(data1);
            const point = {
                "type": "Feature",
                "properties": {
                    "popupContent": "PM2.5",
                    "location": data1.name,
                    "pollutant": "PM2.5",
                    "value": data1.wind.speed,
                    "unit": "µg/m³",
                    "text": ""+data1.wind.speed,
                    "radius": 20,
                    "temp": data1.main.temp,
                    "humidity": data1.main.humidity
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [data1.coord.lon, data1.coord.lat]
                }
            };
            airQuality.push(point);
    


            var airLayer = new L.geoJson(airQuality, {
                pointToLayer: function(feature, latlng) {
                    const marker = new L.CircleMarker([latlng.lat, latlng.lng], {
                        radius: feature.properties.radius,
                        fillColor: getColor(feature.properties.value),
                        color: getColor(feature.properties.value),
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 1
                    });
                    return marker;
                },
                onEachFeature: function(feature, layer) {
                    var text = L.tooltip({
                        permanent: true,
                        direction: 'center',
                        className: 'text',
                        color: getColor(feature.properties.value),
                    })
                    .setContent(feature.properties.text)
                    .setLatLng(layer.getLatLng());
                    text.addTo(map);
                }
            }).addTo(map);
            let i = 0;
            airLayer.eachLayer(function (layer) {
                layer._path.id = i++;
            });

            const pointList = document.getElementsByClassName("leaflet-interactive");
            for (let i = 0; i < pointList.length; i++) {
                // console.log(pointList[i].id);
                pointList[i].setAttribute('onclick',`openPopout(this.id)`);
            }
        })
}


function openPopout(idVaLue) {
    // Set data for popup window
    document.getElementsByClassName("detail-venue")[0].innerHTML = airQuality[idVaLue].properties.location;
    document.getElementsByClassName("index-aqi")[0].innerHTML = airQuality[idVaLue].properties.value;
    document.getElementById("current-temp").innerHTML = airQuality[idVaLue].properties.temp;
    document.getElementById("current-humid").innerHTML = airQuality[idVaLue].properties.humidity;

    const popoutEle = document.getElementById("popout");
    popoutEle.style.transform = "translateX(0%)";
    popoutEle.value = 1;

}

function closePopout() {
    const popoutEle = document.getElementById("popout");
    popoutEle.style.transform = "translateX(100%)";
}
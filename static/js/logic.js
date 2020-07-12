// Creating map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
    minZoom: 3,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);



// url of earthquake data
var earthdata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var earthjson;

// Grab the data with d3
d3.json(earthdata, function(data) {
    var earthquakes =data.features
    console.log(data)

    // Loop through data
    for (var i = 0; i < earthquakes.length; i++) {
          // Conditionals for countries points
    var color = "";
    if (earthquakes[i].properties.mag > 5) {
        color = "#FC031A";
    }
    else if (earthquakes[i].properties.mag > 2) {
        color = "#FD2D40";
    }
    else if (earthquakes[i].properties.mag > 4) {
        color = "#FF5666";
    }
    else if (earthquakes[i].properties.mag > 3) {
        color = "#FD7C88";
    }

    else if (earthquakes[i].properties.mag > 1) {
        color = "#FE9EA7";
    }
    else {
        color = "#FECBCF";
    }

    // Add circles to map
    L.circle([earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        color: "",
        fillColor: color,
        // Adjust radius
        radius: earthquakes[i].properties.mag * 35000
    }).bindPopup("<h1>"+ earthquakes[i].properties.place + "<hr> <h3>Magnitude: " + earthquakes[i].properties.mag + "</h3>")
    .addTo(myMap);
    }

    // var legend = L.control({ position: "bottomright" });

    // legend.onAdd = function() {

    //     var div = L.DomUtil.create("div", "info legend");
    //     intensity = [0, 1, 2, 3, 4, 5];
    //     colors = ["#FECBCF","#FE9EA7","#FD7C88","#FF5666","#FD2D40","#FC031A"]
    //     for(var i=0; i<intensity.length;i++){

    //         div.innerHTML +=
    //             "<i style='background: " + colors[i] + "'></i> " +
    //             intensity[i] + (intensity[i + 1] ? " - " + intensity[i + 1] + "<br>" : "+");
    //         }
    //         return div;

    //     };
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ["0-1","1-2","2-3","3-4","4-5","5+"];
        var colors = ["#FECBCF","#FE9EA7","#FD7C88","#FF5666","#FD2D40","#FC031A"];
        var labels = [];
      // Add min & max
        var legendInfo = "<h3>Magnitudes</h3>" 
        var contents = "<div>"
        for (var i = 0; i < 6; i++){
            var item = `<div class="legend-item" style="background-color: ${colors[i]}"></div><div class="limits">${limits[i]}</div><br></br>`
            contents += item;
        }
        contents += "</div>"
        legendInfo += contents;
    
    div.innerHTML = legendInfo;

    return div
    };
    legend.addTo(myMap);
});


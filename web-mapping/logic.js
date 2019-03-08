
// link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function circle_size(mag) {
  return mag * 20000;
}

function circle_color(mag) {
  if (mag <= 1) {
      return "#90ff2f";
  } else if (mag <= 2) {
      return "#ddff00";
  } else if (mag <= 3) {
      return "#ffff00";
  } else if (mag <= 4) {
      return "#ffd700";
  } else if (mag <= 5) {
      return "#ff9900";
  } else {
      return "#FF0000";
  };
}

// Grabbing our GeoJSON data..
d3.json(link, function(response) {

  console.log(response);

  var earthquakes = L.geoJSON(response, {
   onEachFeature : function (feature, layer) {  
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + 
        "<p> Magnitude: " +  feature.properties.mag + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng, {
          radius: circle_size(feature.properties.mag),
          fillColor: circle_color(feature.properties.mag),
          fillOpacity: 0.7,
          stroke: false}
      )
    }
})
// Add a tile layer
var tilelayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
});
//.addTo(myMap);

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [tilelayer, earthquakes]
});


var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [0, 1, 2, 3, 4, 5];
  
      for (var i = 0; i < magnitudes.length; i++) {
          div.innerHTML +=
              '<i style="background:' + circle_color(magnitudes[i] + 1) + '"></i> ' + 
      + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

})
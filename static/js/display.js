// Creating the map object
let myMap = L.map("map", {
    center: [31.1231, 70.7790],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Load the GeoJSON data.
  let geoData = "http://localhost:5000/polygons";
  
  let geojson;
  
  // Get the data with d3.
  d3.json(geoData).then(function(data) {
  
    // Create a new choropleth layer.
    geojson = L.choropleth(data, {
  
      // Define which property in the features to use.
      valueProperty: "year_2020",
  
      // Set the colour scale.
      scale: ["#ffffb2", "#b10026"],
  
      // The number of breaks in the step range
      steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border colour
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a popup to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<strong>" + feature.properties.Country + "</strong><br /><br />Maternal Mortality Rate for '2020': " +
        "<strong>" + feature.properties.year_2020 + "</strong><br /><br />Maternal Mortality Rate for '2015': " +
        "<strong>" +  feature.properties.year_2015 + "</strong><br /><br />Maternal Mortality Rate for '2010': " +
        "<strong>" +  feature.properties.year_2010 + "</strong><br /><br />Maternal Mortality Rate for '2005': " +
        "<strong>" +  feature.properties.year_2005);
      }
    }).addTo(myMap);
  
    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let limits = geojson.options.limits;
      let colors = geojson.options.colors;
      let labels = [];
  
      // Add the minimum and maximum.
      let legendInfo = "<h1>Maternal Mortality Rate<br />(per 100,000)</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding the legend to the map
    legend.addTo(myMap);
  
  });
  
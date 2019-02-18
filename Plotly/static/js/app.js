function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json("/metadata/" + sample, function(error, response){
    if (error) return console.warn(error);
    var resKeys = Object.keys(response);
    console.log(resKeys)
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html(""); 
    // Use `Object.entries` to add each key and value pair to the panel
    for (var i=0; i<resKeys.length; i++){
      var $newDataLine = document.createElement('p');
      $newDataLine.innerHTML = resKeys[i] + ": " + response[resKeys[i]];
      $panel.appendChild($newDataLine)
    };   
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var labels = sampleData[0]['otu_ids'].map(function(item) {
    return otuData[item]
  });
    // @TODO: Build a Bubble Chart using the sample data
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: { title: 'OTU ID' }
  };
  var bubbleData = [{
      x: sampleData[0]['otu_ids'],
      y: sampleData[0]['sample_values'],
      text: labels,
      mode: 'markers',
      marker: {
          size: sampleData[0]['sample_values'],
          color: sampleData[0]['otu_ids'],
          colorscale: "Portland",
      }
  }];
  var BUBBLE = document.getElementById('bubble');
  Plotly.plot(BUBBLE, bubbleData, bubbleLayout);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pieData = [{
      values: sampleData[0]['sample_values'].slice(0, 10),
      labels: sampleData[0]['otu_ids'].slice(0, 10),
      hovertext: labels.slice(0, 10),
      hoverinfo: 'hovertext',
      type: 'pie',
      marker: {
          colors: ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf']
      }
    }];

    var pieLayout = {
      margin: { t: 0, l: 0 }
    };

    var PIE = document.getElementById('pie');
    Plotly.plot(PIE, pieData, pieLayout);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#sample-metadata");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

// @TODO: YOUR CODE HERE!

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 4;
var margin = 20;
var labels = 110;
var bottom_padding = 40;
var left_padding = 40;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var radius;
function get_radius() {
  if (width <= 530) {
    radius = 5;
  }
  else {
    radius = 10;
  }
}
get_radius();

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

function xTextupdate() {
  xText.attr(
    "transform",
    "translate(" +
      ((width - labels) / 2 + labels) +
      ", " +
      (height - margin - bottom_padding) +
      ")"
  );
}
xTextupdate();

//poverty
xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

//age
xText
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");

//income
xText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");

//Y Axis
var leftTextX = margin + left_padding;
var leftTextY = (height + labels) / 2 - labels;
svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

function yTextupdate() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextupdate();

//obesity
yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");

//smokes
yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");

//healthcarelow
yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");

//import data
  d3.csv("assets/data/data.csv").then(function(data) {
  plot_data(data);
});

function plot_data(theData) {
  var x = "poverty";
  var y = "obesity";
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      console.log(d)
      var theX;
      var theState = "<div>" + d.state + "</div>";
      var theY = "<div>" + y + ": " + d[y] + "%</div>";
      if (x === "poverty") {
        theX = "<div>" + x + ": " + d[x] + "%</div>";
      }
      else {
        theX = "<div>" +
          x +
          ": " +
          parseFloat(d[x]).toLocaleString("en") +
          "</div>";
      }
      return theState + theX + theY;
    });
  svg.call(toolTip);

  function x_MM() {
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[x]) * 0.90;
    });
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[x]) * 1.10;
    });
  }

  function y_MM() {
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[y]) * 0.90;
    });
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[y]) * 1.10;
    });
  }

  function labelChange(axis, clickedText) {
    d3
      .selectAll(".aText")
      .filter("." + axis)
      .filter(".active")
      .classed("active", false)
      .classed("inactive", true);
    clickedText.classed("inactive", false).classed("active", true);
  }

  x_MM();
  y_MM();
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labels, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labels, margin]);

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();

  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labels) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labels) + ", 0)");

  var theCircles = svg.selectAll("g theCircles").data(theData).enter();
  theCircles
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d[x]);
    })
    .attr("cy", function(d) {
      return yScale(d[y]);
    })
    .attr("r", radius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })
    .on("mouseover", function(d) {
      toolTip.show(d, this);
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      toolTip.hide(d);
      d3.select(this).style("stroke", "#e3e3e3");
    });

  theCircles
    .append("text")
    .text(function(d) {
      return d.abbr;
    })
    .attr("dx", function(d) {
      return xScale(d[x]);
    })
    .attr("dy", function(d) {
      return yScale(d[y]) + radius / 2.5;
    })
    .attr("font-size", radius)
    .attr("class", "stateText")
    .on("mouseover", function(d) {
      toolTip.show(d);
      d3.select("." + d.abbr).style("stroke", "#323232");
    })
    .on("mouseout", function(d) {
      toolTip.hide(d);
      d3.select("." + d.abbr).style("stroke", "#e3e3e3");
    });

  d3.selectAll(".aText").on("click", function() {
    var clicked = d3.select(this);
    if (clicked.classed("inactive")) {
      var axis = clicked.attr("data-axis");
      var name = clicked.attr("data-name");
      if (axis === "x") {
        x = name;
        x_MM();

        xScale.domain([xMin, xMax]);

        svg.select(".xAxis").transition().duration(300).call(xAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cx", function(d) {
              return xScale(d[x]);
            })
            .duration(300);
        });

        d3.selectAll(".stateText").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dx", function(d) {
              return xScale(d[x]);
            })
            .duration(300);
        });

        labelChange(axis, clicked);
      }
      else {
        y = name;
        y_MM();

        yScale.domain([yMin, yMax]);

        svg.select(".yAxis").transition().duration(300).call(yAxis);

        d3.selectAll("circle").each(function() {
          d3
            .select(this)
            .transition()
            .attr("cy", function(d) {
              return yScale(d[y]);
            })
            .duration(300);
        });

        d3.selectAll(".stateText").each(function() {
          d3
            .select(this)
            .transition()
            .attr("dy", function(d) {
              return yScale(d[y]) + radius / 3;
            })
            .duration(300);
        });

        labelChange(axis, clicked);
      }
    }
  });

  d3.select(window).on("resize", resize);

  function resize() {
    width = parseInt(d3.select("#scatter").style("width"));
    height = width - width / 4;
    leftTextY = (height + labels) / 2 - labels;

    svg.attr("width", width).attr("height", height);

    xScale.range([margin + labels, width - margin]);
    yScale.range([height - margin - labels, margin]);

    svg
      .select(".xAxis")
      .call(xAxis)
      .attr("transform", "translate(0," + (height - margin - labels) + ")");

    svg.select(".yAxis").call(yAxis);

    tickCount();
    xTextupdate();
    yTextupdate();
    get_radius();

    d3
      .selectAll("circle")
      .attr("cy", function(d) {
        return yScale(d[y]);
      })
      .attr("cx", function(d) {
        return xScale(d[x]);
      })
      .attr("r", function() {
        return radius;
      });

    d3
      .selectAll(".stateText")
      .attr("dy", function(d) {
        return yScale(d[y]) + radius / 3;
      })
      .attr("dx", function(d) {
        return xScale(d[x]);
      })
      .attr("r", radius / 3);
  }
}
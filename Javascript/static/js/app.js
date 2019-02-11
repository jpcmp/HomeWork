// from data.js
var tableData = data;
var tbody = d3.select("tbody");


function createTable(tbd){
    tbd.forEach(function(ufo) {
        var row = tbody.append("tr");
        Object.entries(ufo).forEach(function([key, value]) {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });    
}

d3.select("#filter-btn").on("click", filterData);

function filterData(){
    input = d3.select("#datetime");
    datef = input.property("value");
    var filteredData = tableData.filter(dateSelection => dateSelection.datetime == datef);
    //createTable(filteredData)
};

createTable(tableData);
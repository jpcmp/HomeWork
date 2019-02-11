// from data.js
var tableData = data;
var tbody = d3.select("tbody");


function createTable(tbd, body){
    body.innerHTML = '';
    tbd.forEach(function(ufo) {
        var row = body.append("tr");
        Object.entries(ufo).forEach(function([key, value]) {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });    
}

d3.select("#filter-btn").on("click", function (){
    input = d3.select("#datetime");
    datef = input.property("value");
    var filteredData = tableData.filter(dateSelection => dateSelection.datetime == datef);
//    var new_tbody = document.createElement('tbody');
    createTable(filteredData, tbody);
//    tbody.parentNode.replaceChild(new_tbody, tbody)
});

createTable(tableData, tbody);
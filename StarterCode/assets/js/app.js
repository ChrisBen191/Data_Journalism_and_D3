/////////////////     All listed columns     ////////////////////////
// id, state, abbr, poverty, povertyMoe, age, ageMoe,
// income, incomeMoe, healthcare, healthcareLow, healthcareHigh,
// obesity, obesityLow, obesityHigh, smokes, smokesLow, smokesHigh,
// -0.385218228
// MOE = margin of error

//////// Chart Params //////////
var svgWidth = 600;
var svgHeight = 400;
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//////// SVG Container //////////
var svg = d3.select("#scatter").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

////////// Shift over by the margins //////////
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

////////// Load data from data.csv //////////
d3.csv("/StarterCode/assets/data/data.csv").then(function (healthData) {
    healthData.forEach(function (d) {
        // d.age = +d.age;
        // d.ageMoe = +d.ageMoe;
        d.healthcare = +d.healthcare;
        // d.healthcareHigh = +d.healthcareHigh;
        // d.healthcareLow = +d.healthcareLow;
        // d.income = +d.income;
        // d.incomeMoe = +d.incomeMoe;
        // d.obesity = +d.obesity;
        // d.obesityHigh = +d.obesityHigh;
        // d.obesityLow = +d.obesityLow;
        d.poverty = +d.poverty;
        // d.povertyMoe = +d.povertyMoe;
        // d.smokes = +d.smokes;
        // d.smokesHigh = d.smokesHigh;
        // d.smokesLow = +d.smokesLow;
    });

    ////////// Scales (x & y to chart width & height) //////////
    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(healthData, d => d.healthcare)])
        .range([height, 0]);

    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(healthData, d => d.poverty)])
        .range([0, width]);

    ////////// Create Axes from Scales //////////
    var yAxis = d3.axisLeft(yLinearScale);
    var xAxis = d3.axisBottom(xLinearScale);

    ////////// Append the Axes to the Chart //////////
    chartGroup.append("g")
        .call(yAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    ////////// Append Circles //////////
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "12")
        .classed("stateCircle", true)
        .attr("stroke-width", "1");

    ////////// Append Circle Text //////////
    var textGroup = chartGroup.selectAll('circle.text')
        .data(healthData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy", 5)
        .classed("stateText", true)
        .attr("font-size", "10px")
        .text(function (d) {
            return d.abbr;
        });



    ////////// Append a Tooltip div //////////
    var toolTip = d3.select("div.row")
        .append("div")
        .classed("d3-tip", true);


    ////////// Create a Mouse Over/Out Event  //////////
    circlesGroup.on("mouseover", function (d) {
            toolTip.style("display", "block")
                .html(`<strong>${d.state}<strong><br>Poverty: ${d.poverty}% <br>Healthcare Rate: ${d.healthcareLow}% - ${d.healthcareHigh}%`)
                // .style("left", d + "px")
                // .style("top", d + "px")
                .style("left", d3.select(this).attr("cx") + "px")     
                .style("top", d3.select(this).attr("cy") + "px");
        })

        .on("mouseout", function () {
            toolTip.style("display", "none");
        });



// Currently can pull the poverty stats, but it shows up in the footer

// circlesGroup is going into the body, then appending the div at the very bottom
// which is where it currently is located

// need to move it into the section where the svg is located (at the top of the page)




});

// Note: You'll need to use python -m http.server to run the visualization. 
// This will host the page at localhost:8000 in your web browser.
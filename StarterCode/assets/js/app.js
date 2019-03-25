/////////////////     All listed columns     ////////////////////////
// id, state, abbr, poverty, povertyMoe, age, ageMoe,
// income, incomeMoe, healthcare, healthcareLow, healthcareHigh,
// obesity, obesityLow, obesityHigh, smokes, smokesLow, smokesHigh,
// -0.385218228
// MOE = margin of error

//////// Chart Params //////////

var svgWidth = 500;
var svgHeight = 500;
var margin = {top: 20, right: 20, bottom: 20, left: 20};
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
d3.csv("/StarterCode/assets/data/data.csv").then(function(healthData) {
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

    console.log()

    ////////// Scales (x & y to chart width & height) //////////
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare)])
    .range([height, 0]);

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.poverty)])
    .range([0, width])

    ////////// Create Axes from Scales //////////
    var yAxis = d3.axisLeft(yLinearScale);
    var xAxis = d3.axisBottom(xLinearScale);

    ////////// Append the Axes to the Chart //////////
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

// Poverty Min & Max: 9.2 and 21.5
// Healthcare Min & Max: 4.6 and 24.9





});

// Note: You'll need to use python -m http.server to run the visualization. 
// This will host the page at localhost:8000 in your web browser.
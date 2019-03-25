/////////////////     All listed columns     ////////////////////////
// id, state, abbr, poverty, povertyMoe, age, ageMoe,
// income, incomeMoe, healthcare, healthcareLow, healthcareHigh,
// obesity, obesityLow, obesityHigh, smokes, smokesLow, smokesHigh,
// -0.385218228
// MOE = margin of error

//////// Chart Params //////////

var svgWidth = 500;
var svgHeight = 400;
var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//////// SVG Wrapper //////////

var svg = d3.select("#scatter").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#262626");



// path to the dataset -  "/StarterCode/assets/data/data.csv"

// Note: You'll need to use python -m http.server to run the visualization. 
// This will host the page at localhost:8000 in your web browser.
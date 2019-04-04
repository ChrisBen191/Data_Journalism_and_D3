////////////////// Chart Parameters ////////////////////
var svgWidth = 700;
var svgHeight = 700;
var margin = { top: 100, right: 50, bottom: 100, left: 100 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

////////////////// SVG Container ////////////////////
var svg = d3.select("#scatter").append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

////////// Shift over by the margins ////////////////////
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

////////// Load data from data.csv ////////////////////
d3.csv("/StarterCode/assets/data/data.csv").then(function (healthData) {
  healthData.forEach(function (d) {
    d.age = +d.age;
    d.ageMoe = +d.ageMoe;
    d.healthcare = +d.healthcare;
    d.healthcareHigh = +d.healthcareHigh;
    d.healthcareLow = +d.healthcareLow;
    d.income = +d.income;
    d.incomeMoe = +d.incomeMoe;
    d.obesity = +d.obesity;
    d.obesityLow = +d.obesityLow;
    d.obesityHigh = +d.obesityHigh;
    d.poverty = +d.poverty;
    d.povertyMoe = +d.povertyMoe;
    d.smokes = +d.smokes;
    d.smokesLow = +d.smokesLow;
    d.smokesHigh = +d.smokesHigh;
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
  
  ////////// Created the X Axis Labels //////////
  chartGroup.append("text")
    .attr("class", "poverty-label")
    .attr("class", "labelText")
    .attr("x", width/2)
    .attr("y", height + 40)
    .text("Percentage in Poverty (%)")
    .on("click", function(d, i){
      alert("You Clicked!")
    });
    
  chartGroup.append("text")
    .attr("class", "age-label")
    .attr("class", "labelText")
    .attr("x", width/2)
    .attr("y", height + 60)
    .text("Age (Median)");
    
  chartGroup.append("text")
    .attr("class", "income-label")
    .attr("class", "labelText")
    .attr("x", width/2)
    .attr("y", height + 80)
    .text("Household Income (Median)");

   ////////// Created the Y Axis Labels //////////
  chartGroup.append("text")
    .attr("class", "healthcare-label")
    .attr("class", "labelText")
    .attr("x",0 - (height/2))
    .attr("y", 0 - 35)
    .attr("transform", "rotate(-90)")
    .text("Percentage without Healthcare (%)");
    
  chartGroup.append("text")
    .attr("class", "smokes-label")
    .attr("class", "labelText")
    .attr("x",0 - (height/2))
    .attr("y", 0 - 55)
    .attr("transform", "rotate(-90)")
    .text("Smokes (%)");
    
  chartGroup.append("text")
    .attr("class", "obese-label")
    .attr("class", "labelText")
    .attr("x",0 - (height/2))
    .attr("y", 0 - 75)
    .attr("transform", "rotate(-90)")
    .text("Obese (%)");
  
  ////////// Append the Axes to the Chart //////////
  chartGroup.append("g")
    .call(yAxis);
  
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  
  ////////// Create Tooltips for each dot //////////
  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-10, 0])
    .html(function(healthData) { return "<p>" + healthData.state + "<br><br> Poverty: " + healthData.poverty + "%<br> Obesity: " +  healthData.obesity  + "%</p>" });
  svg.call(tool_tip);
  
  ////////// Append Circles //////////
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "12")
    .classed("stateCircle", true)
    .attr("stroke-width", "1")
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);
  
  ////////// Append Circle Text //////////
  chartGroup.selectAll('circle.text')
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy", 5)
    .attr("class", "stateText")

    .text(function (d) {
      return d.abbr;
    });
});  // This is the closing tag for the "d3.csv" function

// Note: You'll need to use python -m http.server to run the visualization. 
// This will host the page at localhost:8000 in your web browser.
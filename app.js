import init, { get_top } from './pkg/word_embeddings_wasm.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
async function loadJsonFile(url) {
    console.log(`Attempting to load JSON from ${url}`);
    const response = await fetch(url);
    const json = await response.json();
    console.log('JSON loaded successfully:', json);
    return json;
}

async function main() {
    console.log('Main function started');
    try {
        await init();
        console.log('WebAssembly module initialized');

        const jsonData = await loadJsonFile('data.json');
        const jsonStr = JSON.stringify(jsonData);
        console.log('JSON string prepared:', jsonStr);

        const key1 = "hot";
        const key2 = "cold";
        const numResults = 15;

        console.log(`Calling get_top with keys: ${key1}, ${key2}, numResults: ${numResults}`);
        const result = get_top(jsonStr, key1, key2, numResults);
        console.log('Result from get_top:', result);

        const topWords = JSON.parse(result);
        console.log('Parsed top words:', topWords);

        const data = [];

        const resultsDiv = document.getElementById("results");
        topWords.forEach((item, index) => {
            data[index] = {x: item.dot_v1, y: item.dot_v2, label: item.word};
        });
        console.log('Results added to DOM');


        // Set up dimensions
        const width = 600;
        const height = 400;
        const margin = {top: 20, right: 20, bottom: 40, left: 40};
	console.log(d3);

	console.log(d3.version);  // This should print the D3 version number
	console.log(typeof d3.select);  // This should print "function"

        // Create SVG
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
            .range([height - margin.bottom, margin.top]);

        // Create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);

        // Create tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

	svg.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", width)
	    .attr("y", height - 6)
	    .text(key1);

	svg.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 6)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .text(key2);
        // Create scatter plot points
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .attr("fill", "steelblue")
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.label)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main().catch(console.error);


function hello(input1, input2) {
  console.log("Input 1:", input1);
  console.log("Input 2:", input2);
  // Your code here
  return false; // Prevent form submission
}
const button1 = document.getElementById("button1");

// button1 click event listener to apply function
button1.addEventListener("click", async function() {
    let key1 = document.getElementById("myInput1").value;
    console.log("Input 1:", key1);
    let key2 = document.getElementById("myInput2").value;
    console.log("Input 2:", key2);

    d3.selectAll("svg").remove();

        const jsonData = await loadJsonFile('data.json');
        const jsonStr = JSON.stringify(jsonData);
        console.log('JSON string prepared:', jsonStr);

        const numResults = 15;

        console.log(`Calling get_top with keys: ${key1}, ${key2}, numResults: ${numResults}`);
        const result = get_top(jsonStr, key1, key2, numResults);
        console.log('Result from get_top:', result);

        const topWords = JSON.parse(result);
        console.log('Parsed top words:', topWords);

        const data = [];

        const resultsDiv = document.getElementById("results");
        topWords.forEach((item, index) => {
            data[index] = {x: item.dot_v1, y: item.dot_v2, label: item.word};
        });
        console.log('Results added to DOM');


        // Set up dimensions
        const width = 600;
        const height = 400;
        const margin = {top: 20, right: 20, bottom: 40, left: 40};
	console.log(d3);

	console.log(d3.version);  // This should print the D3 version number
	console.log(typeof d3.select);  // This should print "function"

        // Create SVG
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
            .range([height - margin.bottom, margin.top]);

        // Create axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);

        // Create tooltip
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .text(key1);

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(key2);

        // Create scatter plot points
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("r", 5)
            .attr("fill", "steelblue")
            .on("mouseover", (event, d) => {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.label)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

});

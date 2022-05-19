import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

function App() {
  const [data, setData] = useState([20,50,10,70,20,80,45,90,35]);
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([50, 75, 100])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")

      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value));
  }, [data]);

  return (
    <React.Fragment>
      <br/>
      <br/>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button onClick={() => {
        let temp = Math.round((Math.random()*3)+1)
        // console.log(temp)
        setData(data.map(value => Math.round(value+temp)))
        // setData(data.filter(e=>{e%temp==0}))
      }}>
        Update data
      </button>
      {/* <button onClick={() => setData(data.filter(value => value < 35))}>
        Filter data
      </button> */}
    </React.Fragment>
  );
}

export default App; 
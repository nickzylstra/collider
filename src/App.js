import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const D3Container = ({ data }) => {
  const d3Container = useRef(null);
  const width = 60;
  const height = 50;

  useEffect(() => {
    const svg = d3.select(d3Container.current);
    const trans = svg.transition().duration(1200);


    svg.selectAll("text")
      .data(data, (d) => d)
      .join(
        (enter) => enter.append("text")
            .attr('fill', 'blue')
            .attr('x', -width)
            .attr('y', (d, i) => i * height + height)
            .style('font-size', height)
            .text((d) => d)
          .call((enter) => enter.transition(trans)
            .attr('x', 0)),
        (update) => update
            .attr('fill', 'black')
          .call((update) => update.transition(trans)
            .attr('y', (d, i) => i * height + height)),
        (exit) => exit
            .attr('fill', 'red')
          .call((exit) => exit.transition(trans)
            .attr('x', width)
            .remove())
      );
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={width}
      height={height * 20}
      ref={d3Container}
    />
  );
};

function App() {
  const numberCount = 20;
  const genNumbers = () => {
    const numbers = Array(numberCount).fill().map((e, i) => i);
    const shuffledNumbers = d3.shuffle(numbers).slice(0, Math.floor(Math.random() * numberCount)).sort((a,b) => a - b);
    return shuffledNumbers;
  } 
  const [data, setData] = useState(genNumbers);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setData(genNumbers())
    }, 2500);

    return () => {
      clearInterval(refreshInterval);
    };
  })

  return (
    <div className="App">
      <D3Container data={data}/>
    </div>
  );
}

export default App;

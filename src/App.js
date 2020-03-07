import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const D3Container = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    const svg = d3.select(d3Container.current);
    svg.selectAll("text")
      .data(data)
      .join(
        (enter) => enter.append("text")
          .attr('x', 25)
          .attr('y', (d, i) => i * 30)
          .style('font-size', 18)
          .text((d) => d),
        (update) => update
          .text((d) => d)
      );
  }, [data]);

  return (
    <svg
      className="d3-component"
      width={40}
      height={400}
      ref={d3Container}
    />
  );
};

function App() {
  const pointCount = 10;
  const genData = () => Array(pointCount).fill().map(() => Math.floor(Math.random() * pointCount));
  const [data, setData] = useState(genData);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setData(genData())
    }, 2000);

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

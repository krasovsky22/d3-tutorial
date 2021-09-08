import { max, scaleBand, scaleLinear } from "d3";
import { useMemo } from "react";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import { useData } from "./hooks/use-data";
import Marks from "./Marks";
import "./styles.css";

const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const CountryPopulateScale = ({ width, height }) => {
  const data = useData();

  const { innerHeight, yValue, xValue, yScale, xScale } = useMemo(() => {
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = (d) => d.Country;
    const xValue = (d) => d.Population;

    return {
      xValue,
      yValue,
      innerHeight,
      xScale: scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]),
      yScale: scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.2),
    };
  }, [width, height, data]);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

export default CountryPopulateScale;

import { format, max, scaleBand, scaleLinear } from "d3";
import { useMemo } from "react";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import { useData } from "./hooks/use-data";
import Marks from "./Marks";
import "./styles.css";

const margin = { top: 20, right: 20, bottom: 80, left: 200 };
const yAxisLabelOffset = 50;

const CountryPopulateScale = ({ width, height }) => {
  const data = useData();

  const {
    innerHeight,
    innerWidth,
    yValue,
    xValue,
    yScale,
    xScale,
    xAxisTickFormat,
    tooltipFormat,
  } = useMemo(() => {
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = (d) => d.Country;
    const xValue = (d) => d.Population;

    return {
      xValue,
      yValue,
      innerHeight,
      innerWidth,
      xScale: scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]),
      yScale: scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .paddingInner(0.2),
      tooltipFormat: (n) => format(".2s")(n).replace("M", "B"),
      xAxisTickFormat: (n) => format(".2s")(n).replace("M", "B"),
    };
  }, [width, height, data]);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + yAxisLabelOffset}
        >
          Population
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={tooltipFormat}
        />
      </g>
    </svg>
  );
};

export default CountryPopulateScale;

import { format, extent, scaleLinear } from "d3";
import { useMemo } from "react";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import { useData } from "./hooks/use-data";
import Marks from "./Marks";
import "./styles.css";

const margin = { top: 20, right: 20, bottom: 80, left: 100 };
const yAxisLabelOffset = 40;
const xAxisLabelOffset = 50;

const FlowersScale = ({ width, height }) => {
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
    yAxisLabel,
    xAxisLabel,
  } = useMemo(() => {
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = (d) => d.sepal_width;
    const yAxisLabel = "Sepal Width";
    const xValue = (d) => d.petal_length;
    const xAxisLabel = "Sepal Length";

    console.log(innerHeight);

    return {
      xValue,
      yValue,
      innerHeight,
      innerWidth,
      yAxisLabel,
      xAxisLabel,
      xScale: scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice(),
      yScale: scaleLinear()
        .domain(extent(data, yValue))
        .range([0, innerHeight]),
      tooltipFormat: (n) => format(".2s")(n).replace("G", "B"),
      xAxisTickFormat: (n) => format(".2s")(n).replace("G", "B"),
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
        <text
          className="axis-label"
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
        >
          {xAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90) `}
        >
          {yAxisLabel}
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

export default FlowersScale;

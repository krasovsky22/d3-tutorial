const AxisLeft = ({ innerWidth, yScale }) =>
  yScale.ticks().map((tickValue) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(0,${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text key={tickValue} style={{ textAnchor: "end" }} x={-5} dy=".32em">
        {tickValue}
      </text>
    </g>
  ));

export default AxisLeft;
